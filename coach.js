/* ═══════════════════════════════════════════════════════════════
   coach.js — Guided "10-Minute Win" for slow / reluctant learners
   Low friction, tiny steps, warm encouragement. Launched from the
   Home mission card and the command palette. Zero dependencies.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };

  var STEPS = [
    { ico: '🪄', title: 'Warm up · 2 min', desc: 'Open your due review. Just two items — an easy win to start.', cta: 'Open review', run: function () { if (typeof startPractice === 'function') startPractice('due'); else navigate('review'); } },
    { ico: '🎯', title: 'One brave question · 3 min', desc: 'A single weak-area question. No pressure, just one.', cta: 'Get one question', run: function () { if (typeof startPractice === 'function') startPractice('weakness'); else navigate('practice'); } },
    { ico: '🎧', title: 'Listen & lock it in · 5 min', desc: 'Play one Audio Academy episode. Answer out loud at the pauses.', cta: 'Open Audio Academy', run: function () { navigate('podcast'); } }
  ];

  function inject() {
    if ($('#coach-style')) return;
    var s = document.createElement('style'); s.id = 'coach-style';
    s.textContent = [
      '.coach-overlay{position:fixed;inset:0;z-index:9300;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(2,4,9,.74);backdrop-filter:blur(10px)}',
      '.coach-card{width:min(540px,100%);max-height:92vh;overflow:auto;padding:1.5rem;border-radius:22px;',
      'background:radial-gradient(120% 100% at 12% 0%,rgba(233,169,47,.14),transparent 58%),linear-gradient(160deg,rgba(15,23,40,.98),rgba(6,10,18,.99));',
      'border:1px solid rgba(233,169,47,.26);box-shadow:0 40px 90px -30px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,255,255,.06);animation:coachIn .22s cubic-bezier(.2,.8,.2,1)}',
      '@keyframes coachIn{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}',
      '.coach-eyebrow{font-size:.54rem;text-transform:uppercase;letter-spacing:.16em;font-weight:900;color:var(--gold2,#f0c877);margin-bottom:.35rem}',
      '.coach-title{font-size:1.3rem;font-weight:900;letter-spacing:-.03em;line-height:1.2;margin-bottom:.3rem}',
      '.coach-sub{font-size:.82rem;color:var(--muted,rgba(226,232,240,.56));line-height:1.6;margin-bottom:1rem}',
      '.coach-step{display:flex;gap:.8rem;align-items:flex-start;padding:.8rem .9rem;border-radius:14px;margin-bottom:.6rem;',
      'background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}',
      '.coach-step-ico{font-size:1.4rem;line-height:1;flex-shrink:0}',
      '.coach-step-main{flex:1;min-width:0}',
      '.coach-step-title{font-size:.9rem;font-weight:900;letter-spacing:-.015em}',
      '.coach-step-desc{font-size:.74rem;color:var(--muted);line-height:1.5;margin:.15rem 0 .5rem}',
      '.coach-step-btn{cursor:pointer;font:inherit;font-size:.72rem;font-weight:800;color:#1a1204;background:linear-gradient(180deg,#f3cb78,#d9a441 50%,#b9832a);border:none;border-radius:9px;padding:.34rem .7rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 8px 18px -12px rgba(217,164,65,.8)}',
      '.coach-foot{display:flex;justify-content:space-between;align-items:center;gap:.6rem;margin-top:.6rem}',
      '.coach-kind{font-size:.72rem;color:var(--muted2);cursor:pointer;background:none;border:none;font:inherit}',
      '.coach-kind:hover{color:var(--text)}',
      '@media(max-width:520px){.coach-card{padding:1.1rem}.coach-title{font-size:1.15rem}}'
    ].join('');
    document.head.appendChild(s);
  }

  function close() { var o = $('#coach-overlay'); if (o) o.remove(); }

  window.openCoach = function () {
    inject();
    close();
    var el = document.createElement('div');
    el.className = 'coach-overlay'; el.id = 'coach-overlay';
    var steps = STEPS.map(function (st, i) {
      return '<div class="coach-step"><span class="coach-step-ico">' + st.ico + '</span>' +
        '<div class="coach-step-main"><div class="coach-step-title">' + st.title + '</div>' +
        '<div class="coach-step-desc">' + st.desc + '</div>' +
        '<button class="coach-step-btn" data-step="' + i + '">' + st.cta + ' →</button></div></div>';
    }).join('');
    el.innerHTML = '<div class="coach-card" role="dialog" aria-label="10-minute win">' +
      '<button class="coach-kind" id="coach-x" style="float:right">✕</button>' +
      '<div class="coach-eyebrow">⚡ The 10-Minute Win</div>' +
      '<div class="coach-title">You don\'t need a perfect day. Just 10 minutes.</div>' +
      '<div class="coach-sub">Three tiny steps. Do them in order, or just the first. Showing up is the whole trick — that\'s how 90% is built.</div>' +
      steps +
      '<div class="coach-foot"><button class="coach-kind" id="coach-overwhelmed">I\'m overwhelmed — start even smaller</button>' +
      '<button class="coach-kind" id="coach-done">✓ I did my 10 minutes</button></div></div>';
    document.body.appendChild(el);
    el.addEventListener('click', function (e) { if (e.target === el) close(); });
    $('#coach-x', el).addEventListener('click', close);
    Array.prototype.forEach.call(el.querySelectorAll('.coach-step-btn'), function (b) {
      b.addEventListener('click', function () {
        var st = STEPS[+b.dataset.step];
        close();
        setTimeout(function () { try { st.run(); } catch (e) { } }, 60);
      });
    });
    $('#coach-overwhelmed', el).addEventListener('click', function () {
      close();
      setTimeout(function () { try { if (typeof startPractice === 'function') startPractice('due'); else navigate('review'); toast('Just two items. You\'ve got this 💛'); } catch (e) { } }, 60);
    });
    $('#coach-done', el).addEventListener('click', function () {
      close();
      try { if (typeof addXP === 'function') addXP(20); } catch (e) { }
      try { if (typeof confettiBurst === 'function') confettiBurst(window.innerWidth / 2, 160); } catch (e) { }
      try { toast('You showed up. That\'s how 90% happens 🎉', 'success'); } catch (e) { }
    });
  };
})();