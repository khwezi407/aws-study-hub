/* ═══════════════════════════════════════════════════════════════
   podcast.js — AWS Audio Academy (smooth single-track player)
   One continuous neural-voice MP3 per episode (see gen_podcast.py),
   transcript synced via window.PODCAST_TIMING. Hands-free autoplay,
   domain → sub-category sectors, "Play all in subtopic" queue,
   eyes-free mode, and built-in recall pauses.
   Episodes load from podcast-data.json (single source of truth).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var HOSTS = {
    A: { name: 'Sam', ico: '🧑‍🎓', color: '#3BA8FF' },
    B: { name: 'Coach K', ico: '🧑‍🏫', color: '#E9A92F' }
  };

  // Fallback used only if podcast-data.json can't be fetched (file:// offline).
  var FALLBACK = [
    { t: 'What Even Is the Cloud?', tag: 'Cloud Concepts', cat: 'Cloud Basics', domain: 'Cloud Concepts', ico: '☁️', color: '#3BA8FF', hook: 'Cloud = electricity for computing. CapEx to OpEx.', lines: [
      { w:'A', t:"Coach, everyone says the cloud, but what is it actually?" },
      { w:'B', t:"Picture electricity. You plug in and pay for what you use. The cloud is that, for computing." },
      { w:'B', t:"Cloud is electricity for computing. CapEx becomes OpEx." }
    ] }
  ];

  var EPISODES = FALLBACK.slice();
  var DOMAINS = ['Cloud Concepts', 'Security & Compliance', 'Cloud Technology and Services', 'Billing, Pricing and Support'];
  var RATES = [1, 1.15, 1.3, 0.9];
  var rateIdx = 0, cur = 0, curLine = 0, playing = false, autoplayNext = true, filter = 'All';
  var player = null;
  var queue = [];          // episode indices queued for "Play all in subtopic"
  var queueLabel = '';

  function $(id) { return document.getElementById(id); }
  function timing() { return (window.PODCAST_TIMING) || {}; }
  function startsFor(ep) { var t = timing()[ep]; return (t && t.length) ? t : (EPISODES[ep].lines.map(function (_, i) { return i * 4; })); }
  function getPlayer() { if (!player) { player = new Audio(); player.preload = 'auto'; } return player; }
  function state() { try { return JSON.parse(localStorage.getItem('clf_podcast') || '{}'); } catch (e) { return {}; } }
  function saveState(p) { try { var s = state(); for (var k in p) s[k] = p[k]; localStorage.setItem('clf_podcast', JSON.stringify(s)); } catch (e) { } }
  function fmtDur(ep) { var s = Math.round((startsFor(ep).pop() || 60)); return '~' + Math.max(1, Math.round(s / 60)) + ' min'; }

  function catsForDomain(dom) {
    var seen = {}, out = [];
    EPISODES.forEach(function (ep) {
      if (ep.domain !== dom) return;
      var c = ep.cat || 'General';
      if (!seen[c]) { seen[c] = true; out.push(c); }
    });
    return out;
  }

  window.renderPodcast = function () {
    var s = state();
    if (typeof s.ep === 'number' && s.ep >= 0 && s.ep < EPISODES.length) cur = s.ep;
    curLine = 0;

    var hero =
      '<div class="pod-hero animate-in">' +
      '<div class="pod-hero-eyebrow">🎙️ Audio Academy · Learn by listening</div>' +
      '<h1 class="pod-hero-title">Stories that make AWS <em>stick.</em></h1>' +
      '<p class="pod-hero-sub">Two hosts. Real analogies. Zero reading required. Press play, put your headphones on, and learn while you clean, commute, or rest. Each episode ends with a quick recall pause — answer out loud to lock it in. Use “▶ Play all” on any sub-topic to listen hands-free without touching the screen.</p>' +
      '<div class="pod-hero-pills">' +
      '<span class="pod-pill">🧠 Story + analogy</span>' +
      '<span class="pod-pill">✏️ Recall pauses</span>' +
      '<span class="pod-pill">🔊 Hands-free queue</span>' +
      '<span class="pod-pill">📴 Works offline</span>' +
      '</div></div>';

    var np =
      '<div class="pod-player" id="pod-player">' +
      '<div class="pod-np-top">' +
      '<div class="pod-np-hosts">' +
      '<span class="pod-host" style="--hc:#3BA8FF"><span class="pod-host-ico">🧑‍🎓</span>Sam</span>' +
      '<span class="pod-host" style="--hc:#E9A92F"><span class="pod-host-ico">🧑‍🏫</span>Coach K</span>' +
      '</div>' +
      '<div class="pod-np-title" id="pod-np-title"></div>' +
      '</div>' +
      '<div class="pod-np-line" id="pod-np-line"></div>' +
      '<div class="pod-np-progress"><div class="pod-np-bar" id="pod-np-bar"></div></div>' +
      '<div class="pod-np-meta"><span id="pod-np-count"></span><span id="pod-np-hook"></span></div>' +
      '<div class="pod-controls">' +
      '<button class="pod-ctl" id="pod-prev" title="Previous line">⏮</button>' +
      '<button class="pod-ctl pod-ctl-main" id="pod-play" title="Play / pause">▶ Play</button>' +
      '<button class="pod-ctl" id="pod-next" title="Next line">⏭</button>' +
      '<button class="pod-ctl" id="pod-stop" title="Stop">⏹</button>' +
      '<button class="pod-ctl pod-ctl-rate" id="pod-rate" title="Speed">1×</button>' +
      '<button class="pod-ctl pod-ctl-auto" id="pod-auto" title="Auto-play next episode">🔁 Auto</button>' +
      '<button class="pod-ctl pod-ctl-eyes" id="pod-eyes" title="Eyes-free mode">🎧 Eyes-free</button>' +
      '</div>' +
      '<div class="pod-queue" id="pod-queue" style="display:none"></div>' +
      '</div>';

    var chips = ['All'].concat(DOMAINS).map(function (d) {
      return '<button class="pod-chip' + (d === filter ? ' active' : '') + '" data-f="' + d + '">' + (d === 'All' ? 'All' : d) + '</button>';
    }).join('');

    var html =
      '<div id="pod-root">' + hero + np +
      '<div class="pod-chips">' + chips + '</div>' +
      '<div id="pod-sections">' + buildSections() + '</div>' +
      '<div class="pod-section-label" id="pod-transcript-label">📜 Transcript · tap any line to jump</div>' +
      '<div class="pod-transcript" id="pod-transcript">' + transcriptHtml() + '</div>' +
      '</div>';

    setTimeout(function () { wire(); updateUI(); renderQueue(); }, 0);
    return html;
  };

  function buildSections() {
    return DOMAINS.map(function (dom) {
      if (filter !== 'All' && filter !== dom) return '';
      var cats = catsForDomain(dom);
      if (!cats.length) return '';
      var blocks = cats.map(function (cat) {
        var eps = EPISODES.map(function (ep, i) { return { ep: ep, i: i }; }).filter(function (x) { return x.ep.domain === dom && (x.ep.cat || 'General') === cat; });
        if (!eps.length) return '';
        var cards = eps.map(function (x) {
          var ep = x.ep, i = x.i, done = (state().done || [])[i];
          return '<button class="pod-card' + (i === cur ? ' active' : '') + '" data-ep="' + i + '" style="--ec:' + ep.color + '">' +
            '<div class="pod-card-top"><span class="pod-card-ico">' + ep.ico + '</span>' + (done ? '<span class="pod-card-done">✓</span>' : '') + '</div>' +
            '<div class="pod-card-title">' + ep.t + '</div>' +
            '<div class="pod-card-foot"><span class="pod-card-dur">' + fmtDur(i) + '</span><span class="pod-card-play">▶ Play</span></div>' +
            '</button>';
        }).join('');
        var idxList = eps.map(function (x) { return x.i; }).join(',');
        return '<div class="pod-cat">' +
          '<div class="pod-cat-head"><span class="pod-cat-title">' + cat + '</span>' +
          '<button class="pod-cat-all" data-queue="' + idxList + '" data-label="' + cat + '">▶ Play all (' + eps.length + ')</button></div>' +
          '<div class="pod-grid">' + cards + '</div></div>';
      }).join('');
      return '<div class="pod-section-label">' + dom + '</div>' + blocks;
    }).join('');
  }

  function transcriptHtml() {
    return EPISODES[cur].lines.map(function (l, i) {
      if (l.w === 'pause') {
        return '<div class="pod-line pod-line-pause' + (i === curLine ? ' current' : '') + '" data-line="' + i + '">' +
          '<span class="pod-line-who" style="--hc:#ec4899">✏️ Your turn</span>' +
          '<span class="pod-line-text">' + l.prompt + ' <em>(say it out loud)</em></span></div>';
      }
      var h = HOSTS[l.w];
      return '<div class="pod-line' + (i === curLine ? ' current' : '') + '" data-line="' + i + '">' +
        '<span class="pod-line-who" style="--hc:' + h.color + '">' + h.ico + ' ' + h.name + '</span>' +
        '<span class="pod-line-text">' + l.t + '</span></div>';
    }).join('');
  }

  function renderTranscript() {
    var t = $('pod-transcript'); if (!t) return;
    t.innerHTML = transcriptHtml();
    Array.prototype.forEach.call(t.querySelectorAll('.pod-line'), function (ln) {
      ln.addEventListener('click', function () { goto(+ln.dataset.line); });
    });
  }

  function wire() {
    var play = $('pod-play'), prev = $('pod-prev'), next = $('pod-next'), stop = $('pod-stop'), rate = $('pod-rate'), auto = $('pod-auto'), eyes = $('pod-eyes');
    if (!play) return;
    play.addEventListener('click', toggle);
    prev.addEventListener('click', function () { goto(curLine - 1); });
    next.addEventListener('click', function () { goto(curLine + 1); });
    stop.addEventListener('click', function () { stopAll(); queue = []; renderQueue(); });
    rate.addEventListener('click', function () { rateIdx = (rateIdx + 1) % RATES.length; rate.textContent = RATES[rateIdx] + '×'; if (player) player.playbackRate = RATES[rateIdx]; });
    auto.addEventListener('click', function () { autoplayNext = !autoplayNext; auto.classList.toggle('on', autoplayNext); });
    auto.classList.toggle('on', autoplayNext);
    eyes.addEventListener('click', function () { var r = $('pod-root'); if (r) r.classList.toggle('pod-eyesfree'); eyes.classList.toggle('on', r && r.classList.contains('pod-eyesfree')); });

    Array.prototype.forEach.call(document.querySelectorAll('.pod-card'), function (c) {
      c.addEventListener('click', function () { queue = []; renderQueue(); loadEp(+c.dataset.ep, true); });
    });
    Array.prototype.forEach.call(document.querySelectorAll('.pod-cat-all'), function (b) {
      b.addEventListener('click', function () {
        queue = (b.dataset.queue || '').split(',').map(Number).filter(function (n) { return !isNaN(n); });
        queueLabel = b.dataset.label || 'Sub-topic';
        renderQueue();
        if (queue.length) loadEp(queue[0], true);
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll('.pod-chip'), function (c) {
      c.addEventListener('click', function () {
        filter = c.dataset.f;
        Array.prototype.forEach.call(document.querySelectorAll('.pod-chip'), function (x) { x.classList.toggle('active', x === c); });
        var wrap = $('pod-sections');
        if (wrap) {
          wrap.innerHTML = buildSections();
          Array.prototype.forEach.call(wrap.querySelectorAll('.pod-card'), function (c2) { c2.addEventListener('click', function () { queue = []; renderQueue(); loadEp(+c2.dataset.ep, true); }); });
          Array.prototype.forEach.call(wrap.querySelectorAll('.pod-cat-all'), function (b) {
            b.addEventListener('click', function () {
              queue = (b.dataset.queue || '').split(',').map(Number).filter(function (n) { return !isNaN(n); });
              queueLabel = b.dataset.label || 'Sub-topic';
              renderQueue(); if (queue.length) loadEp(queue[0], true);
            });
          });
        }
      });
    });

    var p = getPlayer();
    p.addEventListener('timeupdate', onTime);
    p.addEventListener('ended', onEnded);
    p.addEventListener('play', function () { playing = true; updateUI(); });
    p.addEventListener('pause', function () { playing = false; updateUI(); });
    p.src = 'podcast-audio/ep' + cur + '.mp3';
    p.playbackRate = RATES[rateIdx];
  }

  function renderQueue() {
    var q = $('pod-queue'); if (!q) return;
    if (!queue.length) { q.style.display = 'none'; q.innerHTML = ''; return; }
    q.style.display = '';
    var pos = queue.indexOf(cur);
    q.innerHTML = '<span class="pod-queue-ico">🎧</span>' +
      '<span class="pod-queue-text">Playing all in <b>' + queueLabel + '</b> · ' + (pos >= 0 ? (pos + 1) : 1) + ' / ' + queue.length + '</span>' +
      '<button class="pod-queue-stop" id="pod-queue-stop">✕ Stop queue</button>';
    var st = $('pod-queue-stop');
    if (st) st.addEventListener('click', function () { queue = []; renderQueue(); });
  }

  function onTime() {
    if (!player) return;
    var st = startsFor(cur), t = player.currentTime, idx = 0;
    for (var i = 0; i < st.length; i++) { if (t + 0.05 >= st[i]) idx = i; else break; }
    if (idx !== curLine) { curLine = idx; updateUI(); highlight(); }
    var bar = $('pod-np-bar');
    if (bar && player.duration) bar.style.width = (player.currentTime / player.duration * 100) + '%';
  }

  function highlight() {
    Array.prototype.forEach.call(document.querySelectorAll('.pod-line'), function (n) {
      n.classList.toggle('current', +n.dataset.line === curLine);
    });
  }

  function onEnded() {
    // If a sub-topic queue is active, advance within it first.
    if (queue.length) {
      var pos = queue.indexOf(cur);
      if (pos >= 0 && pos < queue.length - 1) { markDone(); loadEp(queue[pos + 1], true); return; }
      // queue finished
      queue = []; renderQueue();
      markDone(); playing = false; updateUI();
      try { toast('Sub-topic complete — nice work 🎧'); } catch (e) { }
      return;
    }
    if (autoplayNext && cur < EPISODES.length - 1) { loadEp(cur + 1, true); return; }
    playing = false; markDone(); updateUI();
    try { toast('Episode complete — nice work 🎧'); } catch (e) { }
  }

  function updateUI() {
    var ep = EPISODES[cur], l = ep.lines[curLine];
    var title = $('pod-np-title'), lineEl = $('pod-np-line'), count = $('pod-np-count'), hook = $('pod-np-hook'), play = $('pod-play');
    if (!title) return;
    title.textContent = ep.ico + ' ' + ep.t;
    if (l.w === 'pause') {
      lineEl.innerHTML = '<span class="pod-np-who" style="color:#ec4899">✏️ Your turn</span>' + l.prompt + ' <span class="pod-np-say">(say it out loud)</span>';
    } else {
      lineEl.innerHTML = '<span class="pod-np-who" style="color:' + HOSTS[l.w].color + '">' + HOSTS[l.w].ico + ' ' + HOSTS[l.w].name + '</span>' + l.t;
    }
    count.textContent = 'Line ' + (curLine + 1) + ' of ' + ep.lines.length;
    hook.textContent = '💡 ' + ep.hook;
    play.textContent = playing ? '⏸ Pause' : '▶ Play';
    highlight();
    renderQueue();
  }

  function toggle() {
    var p = getPlayer();
    if (!p.src) p.src = 'podcast-audio/ep' + cur + '.mp3';
    if (playing) { p.pause(); }
    else { var pr = p.play(); if (pr && pr.catch) pr.catch(function () { try { toast('Audio could not start — is podcast-audio present?'); } catch (e) { } }); }
  }
  function goto(i) {
    var ep = EPISODES[cur], st = startsFor(cur);
    if (i < 0) i = 0; if (i > ep.lines.length - 1) i = ep.lines.length - 1;
    curLine = i; var p = getPlayer();
    try { p.currentTime = st[i] || 0; } catch (e) { }
    saveState({ ep: cur, line: i }); updateUI();
    if (playing) p.play();
  }
  function stopAll() { var p = getPlayer(); p.pause(); try { p.currentTime = 0; } catch (e) { } curLine = 0; updateUI(); saveState({ ep: cur, line: 0 }); }
  function loadEp(i, autoplay) {
    if (i < 0 || i >= EPISODES.length) return;
    var p = getPlayer(); p.pause();
    cur = i; curLine = 0; saveState({ ep: cur, line: 0 });
    p.src = 'podcast-audio/ep' + cur + '.mp3'; p.playbackRate = RATES[rateIdx];
    renderTranscript(); updateUI();
    Array.prototype.forEach.call(document.querySelectorAll('.pod-card'), function (c) { c.classList.toggle('active', +c.dataset.ep === cur); });
    var pl = $('pod-player'); if (pl && pl.scrollIntoView) pl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (autoplay) p.play();
  }
  function markDone() {
    var s = state(), done = s.done || []; done[cur] = true; saveState({ done: done });
    try { addXP(10); } catch (e) { }
  }

  // Load episodes from the single source of truth, then re-render if on the page.
  function loadData() {
    if (typeof fetch !== 'function') return;
    fetch('podcast-data.json').then(function (r) { return r.json(); }).then(function (d) {
      if (d && d.length) {
        EPISODES = d;
        if ($('pod-root')) {
          cur = Math.min(cur, EPISODES.length - 1);
          var root = $('pod-root');
          root.outerHTML = window.renderPodcast();
        }
      }
    }).catch(function () { });
  }

  if (typeof window.navigate === 'function') {
    var orig = window.navigate;
    window.navigate = function () { if (player) player.pause(); return orig.apply(this, arguments); };
  }

  loadData();
})();