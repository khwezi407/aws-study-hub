/* ═══════════════════════════════════════════════════════════════
   audio-learn.js — hands-free audio learning (Web Speech API)
   Zero dependencies, zero cost, works offline. Adds a floating
   "Listen" pill that reads the current page aloud (question +
   options + rationale, flashcards, cram sheet, learn notes).
   Toggle speed 0.9x / 1x / 1.15x. Auto-stops on navigation.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var synth = window.speechSynthesis;
  var supported = !!(synth && typeof window.SpeechSynthesisUtterance === 'function');
  var pill, label, rateBtn;
  var speaking = false;
  var keepAlive = null; // retain utterance (Chrome GC bug)
  var RATES = [0.9, 1, 1.15];
  var rateIdx = 1;

  try { rateIdx = Number(localStorage.getItem('clf_audio_rate') || 1); } catch (e) { }
  if (rateIdx < 0 || rateIdx > 2) rateIdx = 1;

  function injectStyles() {
    if (document.getElementById('audio-learn-style')) return;
    var s = document.createElement('style');
    s.id = 'audio-learn-style';
    s.textContent = [
      '.audio-pill{position:fixed;right:16px;bottom:16px;z-index:8000;display:inline-flex;align-items:center;gap:0;',
      'background:linear-gradient(180deg,rgba(18,24,40,.92),rgba(7,11,20,.94));border:1px solid rgba(255,255,255,.10);',
      'border-radius:999px;box-shadow:0 8px 24px -12px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.06);',
      'backdrop-filter:blur(14px);overflow:hidden;font:inherit;transition:box-shadow .18s ease,border-color .18s ease,transform .18s ease}',
      '.audio-pill:hover{transform:translateY(-1px);border-color:rgba(125,211,252,.28);box-shadow:0 12px 28px -12px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.08)}',
      '.audio-pill.speaking{border-color:rgba(233,169,47,.45);box-shadow:0 0 0 1px rgba(233,169,47,.14),0 10px 26px -12px rgba(0,0,0,.9),0 0 20px -10px rgba(233,169,47,.5)}',
      '.audio-main{display:inline-flex;align-items:center;gap:.45rem;height:34px;padding:0 .8rem;cursor:pointer;color:var(--text,#eef2fb);font-size:.74rem;font-weight:800;letter-spacing:-.01em;background:none;border:none}',
      '.audio-ico{font-size:.95rem;line-height:1}',
      '.audio-pill.speaking .audio-ico{animation:audioPulse 1s ease-in-out infinite}',
      '@keyframes audioPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.86)}}',
      '.audio-rate{height:34px;min-width:38px;padding:0 .45rem;cursor:pointer;color:var(--muted,rgba(226,232,240,.56));font-size:.62rem;font-weight:900;',
      'background:rgba(255,255,255,.04);border:none;border-left:1px solid rgba(255,255,255,.08);font-family:inherit}',
      '.audio-rate:hover{color:var(--text,#eef2fb);background:rgba(255,255,255,.08)}',
      '@media(max-width:860px){.audio-pill{right:12px;bottom:72px}}',
      '@media(prefers-reduced-motion:reduce){.audio-pill,.audio-pill.speaking .audio-ico{animation:none!important;transition:none!important}}'
    ].join('');
    document.head.appendChild(s);
  }

  function build() {
    if (!supported || document.getElementById('audio-pill')) return;
    injectStyles();
    pill = document.createElement('div');
    pill.className = 'audio-pill';
    pill.id = 'audio-pill';
    pill.innerHTML =
      '<button class="audio-main" id="audio-toggle" aria-label="Read this page aloud">' +
      '<span class="audio-ico" id="audio-ico">🔊</span><span id="audio-label">Listen</span></button>' +
      '<button class="audio-rate" id="audio-rate" title="Playback speed">' + RATES[rateIdx] + '×</button>';
    document.body.appendChild(pill);
    label = document.getElementById('audio-label');
    rateBtn = document.getElementById('audio-rate');
    document.getElementById('audio-toggle').addEventListener('click', toggle);
    rateBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      rateIdx = (rateIdx + 1) % RATES.length;
      rateBtn.textContent = RATES[rateIdx] + '×';
      try { localStorage.setItem('clf_audio_rate', String(rateIdx)); } catch (err) { }
      if (speaking) { stop(); start(); }
    });
  }

  function cleanText() {
    var main = document.getElementById('main-content');
    if (!main) return '';
    var clone = main.cloneNode(true);
    // strip non-readable chrome
    Array.prototype.forEach.call(clone.querySelectorAll('button,script,style,svg,img,.nav-btn,.cmd-overlay,.focus-overlay,.toast,.audio-pill,kbd'), function (n) {
      if (n.parentNode) n.parentNode.removeChild(n);
    });
    // textContent works on detached nodes (innerText can be empty)
    var txt = (clone.textContent || '').replace(/\u00a0/g, ' ');
    txt = txt.split('\n').map(function (l) { return l.trim(); })
      .filter(function (l) { return l && !/^[\s\W_]+$/.test(l); })
      .join('. ');
    return txt.replace(/\s+/g, ' ').trim();
  }

  function pickVoice() {
    try {
      var voices = synth.getVoices();
      if (!voices || !voices.length) return null;
      return voices.filter(function (v) { return /en[-_]/i.test(v.lang) && /Google|Samantha|Daniel|Aria|Jenny|Natural/i.test(v.name); })[0] ||
        voices.filter(function (v) { return /^en/i.test(v.lang); })[0] || voices[0];
    } catch (e) { return null; }
  }

  function start() {
    if (!supported) { try { toast('Read-aloud is not supported in this browser'); } catch (e) { } return; }
    var text = cleanText();
    if (!text) { try { toast('Nothing to read on this page yet'); } catch (e) { } return; }
    try { synth.cancel(); } catch (e) { }
    try { synth.resume(); } catch (e) { }
    var u = new SpeechSynthesisUtterance(text);
    u.rate = RATES[rateIdx];
    u.pitch = 1;
    u.volume = 1;
    var v = pickVoice();
    if (v) u.voice = v;
    keepAlive = u;            // keep a reference (Chrome GC bug)
    var started = false;
    u.onstart = function () { started = true; setSpeaking(true); };
    u.onend = function () { setSpeaking(false); keepAlive = null; };
    u.onerror = function (ev) {
      setSpeaking(false); keepAlive = null;
      var why = ev && (ev.error || ev.message) ? String(ev.error || ev.message) : '';
      if (why && why !== 'interrupted' && why !== 'canceled') {
        try { toast('Read-aloud error: ' + why); } catch (e) { }
      }
    };
    setSpeaking(true);
    // Speak SYNCHRONOUSLY inside the click handler. A setTimeout here breaks
    // the browser's user-activation chain and Chrome silently blocks audio.
    try { synth.speak(u); } catch (e) { setSpeaking(false); }
    // Watchdog: if nothing started, retry once (voices may have loaded late).
    setTimeout(function () {
      if (!started && keepAlive === u && speaking) {
        try { synth.cancel(); } catch (e) { }
        setTimeout(function () { try { synth.speak(u); } catch (e) { } }, 60);
      }
    }, 700);
    try { toast('🔊 Reading aloud…'); } catch (e) { }
  }

  function stop() {
    if (supported) synth.cancel();
    keepAlive = null;
    setSpeaking(false);
  }

  function toggle() { if (speaking) stop(); else start(); }

  function setSpeaking(on) {
    speaking = on;
    if (!pill) return;
    pill.classList.toggle('speaking', on);
    if (label) label.textContent = on ? 'Stop' : 'Listen';
    var ico = document.getElementById('audio-ico');
    if (ico) ico.textContent = on ? '⏹' : '🔊';
  }

  // Stop audio whenever the user navigates to another tab
  function hookNav() {
    if (typeof window.navigate === 'function') {
      var orig = window.navigate;
      window.navigate = function () {
        stop();
        return orig.apply(this, arguments);
      };
    }
  }

  function init() {
    build();
    hookNav();
    // warm up voices (Chrome loads them async)
    try { if (supported) synth.getVoices(); if (supported && synth.addEventListener) synth.addEventListener('voiceschanged', function () { synth.getVoices(); }); } catch (e) { }
    // Alt+L toggles listen (when not typing)
    document.addEventListener('keydown', function (e) {
      if (e.altKey && (e.key === 'l' || e.key === 'L')) {
        var t = (e.target && e.target.tagName || '').toLowerCase();
        if (t === 'input' || t === 'textarea') return;
        e.preventDefault(); toggle();
      }
    });
  }

  if (!supported) return; // silently no-op on unsupported browsers
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();