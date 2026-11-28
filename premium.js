/* ═══════════════════════════════════════════════════════════════
   premium.js — Mission Control layer for AWS Study Hub
   Loads AFTER index.html's main script. Zero dependencies.
   Adds: mission timeline, command palette, focus mode,
         cram sheet, live mission clock, scroll reveals.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function dayDomainFor(day) {
    const map = ['Cloud Concepts', 'Security and Compliance', 'Security and Compliance', 'Security and Compliance',
      'Cloud Technology and Services', 'Cloud Technology and Services', 'Billing, Pricing and Support', 'Cloud Technology and Services'];
    return map[Math.min(day - 1, map.length - 1)] || 'Cloud Concepts';
  }

  /* ─────────────────────────────────────────────
     1. MISSION TIMELINE (home dashboard)
  ───────────────────────────────────────────── */
  function renderMissionTimeline() {
    try {
      if (!window.STUDY_PLAN || typeof planView !== 'function') return '';
      const v = planView();
      if (!v) return '';
      const todayPlan = v.days.find(d => d.date === v.today);
      const examMs = new Date(v.exam + 'T07:00:00').getTime();
      const startMs = new Date(v.start + 'T12:00:00').getTime();
      const total = Math.max(1, Math.round((examMs - startMs) / 86400000));
      const elapsed = Math.max(0, Math.min(total, Math.round((new Date(v.today + 'T12:00:00').getTime() - startMs) / 86400000)));
      const pct = Math.round(elapsed / total * 100);
      const dl = typeof daysLeft === 'function' ? daysLeft() : 0;

      const nodes = v.days.map(d => {
        const done = v.today > d.date;
        const isToday = v.today === d.date;
        return `<div class="mt-node${done ? ' done' : ''}${isToday ? ' today' : ''}" onclick="missionGo(${d.day})" title="${esc(d.label)} — ${esc(d.theme)}">
          <div class="mt-dot">${done ? '✓' : isToday ? '●' : ''}</div>
          <div class="mt-day">D${d.day}</div>
          <div class="mt-theme">${esc(d.theme)}</div>
        </div>`;
      }).join('');

      const weakest = (() => {
        try {
          const scored = DOMAINS.map(d => ({ d, a: domainAccuracy(d) })).filter(x => x.a !== null);
          if (!scored.length) return null;
          return scored.sort((a, b) => a.a - b.a)[0];
        } catch (e) { return null; }
      })();

      let todayBlock;
      if (todayPlan) {
        todayBlock = `<div class="mt-today">
          <div class="mt-today-focus">
            <div class="mt-today-tag">Today · ${esc(todayPlan.label.split('—')[1] || '')}</div>
            <div class="mt-today-title">${todayPlan.emoji} ${esc(todayPlan.theme)}</div>
            <div class="mt-today-desc">${esc(todayPlan.focus)}</div>
            <div style="margin-top:.5rem;font-size:.68rem;font-weight:800;color:var(--gold)">🎯 ${esc(todayPlan.target)}</div>
          </div>
          <div class="mt-blocks">
            ${[todayPlan.morning, todayPlan.afternoon, todayPlan.evening].map((s, i) => `
              <div class="mt-block"><span class="mt-block-ico">${['🌅', '☀️', '🌙'][i]}</span><span><b>${esc(s.title)}</b> · ${esc(s.duration)}</span></div>
            `).join('')}
          </div>
        </div>`;
      } else if (v.today > v.exam) {
        todayBlock = `<div class="mt-today-focus"><div class="mt-today-tag">Mission complete</div><div class="mt-today-title">🎉 Exam day has passed</div><div class="mt-today-desc">Update your exam date in Settings to start a new countdown.</div></div>`;
      } else if (v.today < v.start) {
        todayBlock = `<div class="mt-today-focus"><div class="mt-today-tag">Pre-flight</div><div class="mt-today-title">🚀 Intensive plan starts ${new Date(v.start + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div><div class="mt-today-desc">Use today to clear your due-review queue and take a diagnostic. You are ${dl} days out.</div></div>`;
      } else {
        todayBlock = `<div class="mt-today-focus"><div class="mt-today-tag">Rest & consolidate</div><div class="mt-today-title">🌙 No scheduled block today</div><div class="mt-today-desc">Review due flashcards, re-read your cheat sheet, and sleep early. Consolidation is part of the plan.</div></div>`;
      }

      return `<div class="mt-card animate-in">
        <div class="mt-head">
          <div>
            <div class="mt-eyebrow">Mission Timeline · ${pct}% elapsed</div>
            <div class="mt-title">${todayPlan ? 'Today: <em>' + esc(todayPlan.theme) + '</em>' : 'Your path to <em>CLF-C02</em>'}</div>
            <div class="mt-sub">${dl > 0 ? dl + ' days to exam' : 'Exam day'} · ${esc(examDateLabel(true))} · ${total}-day operation</div>
          </div>
          <span class="mt-link" onclick="navigate('roadmap')">Full roadmap →</span>
        </div>
        <div class="mt-track">${nodes}</div>
        ${todayBlock}
        <div class="mt-actions">
          ${todayPlan ? `<button class="mt-btn mt-btn-primary" onclick="missionGo(${todayPlan.day})">▶ Open today's plan</button>` : ''}
          <button class="mt-btn mt-btn-primary" onclick="openCoach()">⚡ 10-min win</button>
          <button class="mt-btn mt-btn-ghost" onclick="openFocusMode(25)">🎧 Focus 25 min</button>
          ${weakest ? `<button class="mt-btn mt-btn-ghost" onclick="startPractice('domain','${weakest.d}',10)">🎯 Drill ${esc(weakest.d.split(' ')[0])} (${weakest.a}%)</button>` : `<button class="mt-btn mt-btn-ghost" onclick="startPractice('due')">📌 Review queue</button>`}
        </div>
      </div>`;
    } catch (e) {
      console.warn('Mission timeline failed', e);
      return '';
    }
  }
  window.__missionTimeline = renderMissionTimeline;

  window.missionGo = function (day) {
    navigate('roadmap');
    setTimeout(() => {
      const el = document.getElementById('roadmap-day-' + day);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 260);
  };

  /* ─────────────────────────────────────────────
     2. LIVE MISSION CLOCK
  ───────────────────────────────────────────── */
  function updateMissionClock() {
    try {
      const dlEl = document.getElementById('mc-days');
      if (!dlEl) return;
      const dl = typeof daysLeft === 'function' ? daysLeft() : 0;
      dlEl.textContent = dl > 0 ? dl : '0';
      const sub = document.getElementById('mc-sub');
      if (sub) sub.textContent = dl > 0 ? 'days to CLF-C02' : 'EXAM DAY';
      const dateEl = document.getElementById('mc-date');
      if (dateEl) dateEl.textContent = typeof examDateLabel === 'function' ? examDateLabel(true) : '';
      const phase = typeof getCurrentPhase === 'function' ? getCurrentPhase() : null;
      const phaseEl = document.getElementById('mc-phase');
      if (phaseEl) phaseEl.textContent = phase ? phase.label.split('—')[1].trim() : (dl > 0 ? 'Final sprint' : 'Go time');
      let pct = 0;
      try {
        const v = planView();
        if (v) {
          const startMs = new Date(v.start + 'T12:00:00').getTime();
          const examMs = new Date(v.exam + 'T07:00:00').getTime();
          const total = Math.max(1, examMs - startMs);
          pct = Math.max(0, Math.min(100, Math.round((Date.now() - startMs) / total * 100)));
        }
      } catch (e) { }
      const bar = document.getElementById('mc-bar');
      if (bar) bar.style.width = pct + '%';
      const tm = document.getElementById('topbar-mission-text');
      if (tm) tm.textContent = dl > 0 ? `T-${dl} · ${phase ? phase.label.split('—')[1].trim() : 'Mission Control'}` : 'EXAM DAY · You trained for this';
    } catch (e) { }
  }
  window.updateMissionClock = updateMissionClock;

  /* ─────────────────────────────────────────────
     3. COMMAND PALETTE  (Ctrl/⌘ + K)
  ───────────────────────────────────────────── */
  let cmdItems = [], cmdSel = 0, cmdFiltered = [];

  function buildCmdItems() {
    const weakest = (() => {
      try {
        const s = DOMAINS.map(d => ({ d, a: domainAccuracy(d) })).filter(x => x.a !== null);
        return s.length ? s.sort((a, b) => a.a - b.a)[0] : null;
      } catch (e) { return null; }
    })();
    cmdItems = [
      { g: 'Plan', ico: '🗺️', label: 'Study Roadmap', hint: 'Plan', run: () => navigate('roadmap') },
      { g: 'Plan', ico: '🧭', label: '90-Day Mastery Path', hint: '2h/day', run: () => navigate('mastery') },
      { g: 'Plan', ico: '🏠', label: 'Home dashboard', run: () => navigate('home') },
      { g: 'Study', ico: '📚', label: 'Learn hub', run: () => navigate('learn') },
      { g: 'Study', ico: '🧾', label: 'Cram Sheet — one-page revision', run: () => navigate('cram') },
      { g: 'Study', ico: '🃏', label: 'Week Flashcards', run: () => navigate('weekly-flashcards') },
      { g: 'Study', ico: '🧠', label: 'Terminology Gym', run: () => navigate('terminology') },
      { g: 'Study', ico: '🌌', label: 'Architecture Lab', run: () => navigate('universe') },
      { g: 'Study', ico: '🎙️', label: 'Audio Academy — podcast stories & analogies', hint: 'NEW', run: () => navigate('podcast') },
      { g: 'Practise', ico: '🎯', label: 'Practice', run: () => navigate('practice') },
      { g: 'Practise', ico: '🔁', label: 'Review Queue', hint: 'Due', run: () => navigate('review') },
      { g: 'Practise', ico: '⏱️', label: 'Exam Mode', run: () => navigate('mock') },
      { g: 'Practise', ico: '🩺', label: 'Diagnostic Scan', run: () => navigate('diagnostic') },
      { g: 'Practise', ico: '🎮', label: 'Games Arena', run: () => navigate('games') },
      { g: 'Track', ico: '📊', label: 'Progress', run: () => navigate('progress') },
      { g: 'Track', ico: '🏆', label: 'Achievements', run: () => navigate('achievements') },
      { g: 'Track', ico: '🎓', label: 'Study Method', run: () => navigate('recommendation') },
      { g: 'System', ico: '⚙️', label: 'Settings', run: () => navigate('settings') },
      { g: 'Actions', ico: '🎧', label: 'Start 25-minute focus block', run: () => openFocusMode(25) },
      { g: 'Actions', ico: '⚡', label: 'Start the 10-minute win (guided)', run: () => openCoach() },
      { g: 'Actions', ico: '⏱️', label: 'Start 50-minute deep work block', run: () => openFocusMode(50) },
      { g: 'Actions', ico: '📌', label: 'Review due items', run: () => startPractice('due') },
      { g: 'Actions', ico: '⏱️', label: 'Start full mock exam (65 Qs)', run: () => startMockExam() },
      { g: 'Actions', ico: '⚡', label: 'Quick practice — 10 questions', run: () => startPractice('domain', DOMAINS[Math.floor(Math.random() * DOMAINS.length)], 10) },
      { g: 'Actions', ico: '🔁', label: 'Weakness drill', run: () => startPractice('weakness') },
    ];
    if (weakest) cmdItems.push({ g: 'Actions', ico: '🎯', label: `Drill weakest domain — ${weakest.d} (${weakest.a}%)`, run: () => startPractice('domain', weakest.d, 15) });
  }

  function ensurePalette() {
    if (document.getElementById('cmd-overlay')) return;
    const el = document.createElement('div');
    el.className = 'cmd-overlay';
    el.id = 'cmd-overlay';
    el.innerHTML = `<div class="cmd-panel" role="dialog" aria-label="Command palette">
      <div class="cmd-search-row">
        <span class="cmd-search-ico">⌘</span>
        <input class="cmd-input" id="cmd-input" type="text" placeholder="Search pages, drills, actions…" autocomplete="off" spellcheck="false">
        <span class="cmd-kbd">ESC</span>
      </div>
      <div class="cmd-list" id="cmd-list"></div>
      <div class="cmd-foot"><span><b>↑↓</b> navigate</span><span><b>↵</b> open</span><span><b>ESC</b> close</span></div>
    </div>`;
    document.body.appendChild(el);
    el.addEventListener('click', e => { if (e.target === el) closeCommandPalette(); });
    const input = el.querySelector('#cmd-input');
    input.addEventListener('input', () => renderCmdList(input.value));
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); cmdSel = Math.min(cmdSel + 1, cmdFiltered.length - 1); paintCmdSel(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); cmdSel = Math.max(cmdSel - 1, 0); paintCmdSel(); }
      else if (e.key === 'Enter') { e.preventDefault(); runCmdSel(); }
      else if (e.key === 'Escape') { e.preventDefault(); closeCommandPalette(); }
    });
  }

  function renderCmdList(q) {
    const list = document.getElementById('cmd-list');
    if (!list) return;
    q = (q || '').toLowerCase().trim();
    cmdFiltered = cmdItems.filter(it => !q || (it.label + ' ' + it.g + ' ' + (it.hint || '')).toLowerCase().includes(q));
    if (!cmdFiltered.length) { list.innerHTML = `<div class="cmd-empty">No matches for “${esc(q)}”. Try “mock”, “focus”, “roadmap”.</div>`; cmdSel = 0; return; }
    cmdSel = Math.min(cmdSel, cmdFiltered.length - 1);
    let html = '', last = '';
    cmdFiltered.forEach((it, i) => {
      if (it.g !== last) { html += `<div class="cmd-group">${esc(it.g)}</div>`; last = it.g; }
      html += `<div class="cmd-item${i === cmdSel ? ' sel' : ''}" data-i="${i}">
        <span class="cmd-item-ico">${it.ico}</span><span>${esc(it.label)}</span>
        ${it.hint ? `<span class="cmd-item-hint">${esc(it.hint)}</span>` : ''}
      </div>`;
    });
    list.innerHTML = html;
    list.querySelectorAll('.cmd-item').forEach(node => {
      node.addEventListener('mouseenter', () => { cmdSel = +node.dataset.i; paintCmdSel(); });
      node.addEventListener('click', () => { cmdSel = +node.dataset.i; runCmdSel(); });
    });
  }

  function paintCmdSel() {
    $$('#cmd-list .cmd-item').forEach(n => n.classList.toggle('sel', +n.dataset.i === cmdSel));
    const sel = $('#cmd-list .cmd-item.sel');
    if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'nearest' });
  }

  function runCmdSel() {
    const it = cmdFiltered[cmdSel];
    if (!it) return;
    closeCommandPalette();
    setTimeout(() => { try { it.run(); } catch (e) { console.warn(e); } }, 60);
  }

  window.openCommandPalette = function () {
    ensurePalette();
    buildCmdItems();
    const ov = document.getElementById('cmd-overlay');
    ov.classList.add('open');
    const input = document.getElementById('cmd-input');
    input.value = ''; cmdSel = 0;
    renderCmdList('');
    setTimeout(() => input.focus(), 30);
  };
  window.closeCommandPalette = function () {
    const ov = document.getElementById('cmd-overlay');
    if (ov) ov.classList.remove('open');
  };

  /* ─────────────────────────────────────────────
     4. FOCUS MODE (Pomodoro HUD)
  ───────────────────────────────────────────── */
  let focusTicker = null;
  const FOCUS_R = 80, FOCUS_C = 2 * Math.PI * FOCUS_R;

  function focusLoad() { return (typeof load === 'function') ? load('clf_focus', null) : null; }
  function focusSave(v) { if (typeof save === 'function') save('clf_focus', v); }

  function ensureFocus() {
    if (document.getElementById('focus-overlay')) return;
    const el = document.createElement('div');
    el.className = 'focus-overlay';
    el.id = 'focus-overlay';
    el.innerHTML = `<div class="focus-card">
      <button class="focus-close" onclick="closeFocusMode()" aria-label="Close">✕</button>
      <div class="focus-eyebrow">Deep Work · Do Not Disturb</div>
      <div class="focus-ring-wrap">
        <svg width="190" height="190" viewBox="0 0 190 190">
          <defs>
            <linearGradient id="focusGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FFD060"/><stop offset="55%" stop-color="#E9A92F"/><stop offset="100%" stop-color="#FF6B35"/>
            </linearGradient>
          </defs>
          <circle cx="95" cy="95" r="${FOCUS_R}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="9"/>
          <circle id="focus-arc" cx="95" cy="95" r="${FOCUS_R}" fill="none" stroke="url(#focusGrad)" stroke-width="9"
            stroke-linecap="round" stroke-dasharray="${FOCUS_C}" stroke-dashoffset="0"
            style="transition:stroke-dashoffset .5s linear;filter:drop-shadow(0 0 8px rgba(233,169,47,.55))"/>
        </svg>
        <div class="focus-time"><span id="focus-clock">25:00</span><small id="focus-phase">Focus</small></div>
      </div>
      <div class="focus-task" id="focus-task">Pick one task. One tab. Phone away.</div>
      <div class="focus-state" id="focus-state">Stay on one thing until the ring closes.</div>
      <div class="focus-actions">
        <button class="mt-btn mt-btn-primary" id="focus-toggle" onclick="toggleFocusMode()">⏸ Pause</button>
        <button class="mt-btn mt-btn-ghost" onclick="openFocusMode(25)">🔄 Restart 25</button>
        <button class="mt-btn mt-btn-ghost" onclick="closeFocusMode()">Done</button>
      </div>
    </div>`;
    document.body.appendChild(el);
    el.addEventListener('click', e => { if (e.target === el) closeFocusMode(); });
  }

  function fmt(ms) {
    ms = Math.max(0, ms);
    const m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function focusRender() {
    const st = focusLoad();
    if (!st) return;
    const clock = document.getElementById('focus-clock');
    const arc = document.getElementById('focus-arc');
    const phase = document.getElementById('focus-phase');
    const state = document.getElementById('focus-state');
    const toggle = document.getElementById('focus-toggle');
    if (!clock) return;
    const remaining = st.running ? Math.max(0, st.endsAt - Date.now()) : st.remaining;
    clock.textContent = fmt(remaining);
    const frac = st.total > 0 ? Math.max(0, Math.min(1, remaining / st.total)) : 0;
    if (arc) arc.style.strokeDashoffset = String(FOCUS_C * (1 - frac));
    if (phase) phase.textContent = st.running ? 'Focus' : 'Paused';
    if (toggle) toggle.textContent = st.running ? '⏸ Pause' : '▶ Resume';
    if (state && st.running) state.textContent = remaining > 0 ? 'Stay on one thing until the ring closes.' : 'Complete — take a 5-minute break.';
    if (st.running && remaining <= 0) {
      focusComplete();
    }
  }

  function focusComplete() {
    const st = focusLoad();
    focusSave({ endsAt: 0, total: st ? st.total : 0, remaining: 0, running: false, done: true });
    if (focusTicker) { clearInterval(focusTicker); focusTicker = null; }
    try { toast('Focus block complete — take a 5-minute break ☕', 'success'); } catch (e) { }
    try { confettiBurst(window.innerWidth / 2, 160); } catch (e) { }
    try { addXP(15); } catch (e) { }
    focusRender();
  }

  window.openFocusMode = function (mins) {
    ensureFocus();
    mins = mins || 25;
    const st = focusLoad();
    let total = mins * 60000, endsAt = Date.now() + total, remaining = total;
    if (st && st.running && st.endsAt > Date.now() && !st.done) {
      total = st.total; endsAt = st.endsAt; remaining = st.endsAt - Date.now();
    }
    focusSave({ endsAt, total, remaining, running: true, done: false });
    document.getElementById('focus-overlay').classList.add('open');
    const task = document.getElementById('focus-task');
    if (task) {
      let t = 'Pick one task. One tab. Phone away.';
      try {
        const tp = typeof getTodayPlan === 'function' ? getTodayPlan() : null;
        if (tp && tp.morning) t = `Today: ${tp.morning.title} · ${tp.focus}`;
      } catch (e) { }
      task.textContent = t;
    }
    if (focusTicker) clearInterval(focusTicker);
    focusTicker = setInterval(focusRender, 500);
    focusRender();
  };

  window.closeFocusMode = function () {
    const st = focusLoad();
    if (st && st.running) {
      st.remaining = Math.max(0, st.endsAt - Date.now());
      st.running = false;
      focusSave(st);
    }
    const ov = document.getElementById('focus-overlay');
    if (ov) ov.classList.remove('open');
    if (focusTicker) { clearInterval(focusTicker); focusTicker = null; }
  };

  window.toggleFocusMode = function () {
    const st = focusLoad();
    if (!st) { openFocusMode(25); return; }
    if (st.running) {
      st.remaining = Math.max(0, st.endsAt - Date.now());
      st.running = false;
    } else {
      if (!st.remaining || st.remaining <= 0) st.remaining = st.total || 25 * 60000;
      st.endsAt = Date.now() + st.remaining;
      st.running = true;
      st.done = false;
      if (!focusTicker) focusTicker = setInterval(focusRender, 500);
    }
    focusSave(st);
    focusRender();
  };

  /* ─────────────────────────────────────────────
     5. CRAM SHEET
  ───────────────────────────────────────────── */
  const TRIGGERS = [
    ['"Who did what?" · API audit', 'CloudTrail'],
    ['CPU / metric / alarm / dashboard', 'CloudWatch'],
    ['Config changes over time · compliance', 'AWS Config'],
    ['Cost + security recommendations', 'Trusted Advisor'],
    ['DDoS attack', 'Shield'],
    ['SQL injection · XSS · Layer 7', 'WAF'],
    ['PII / sensitive data in S3', 'Macie'],
    ['Vulnerability scan on EC2', 'Inspector'],
    ['Malicious activity · threat detection', 'GuardDuty'],
    ['Central view of all findings', 'Security Hub'],
    ['Encryption keys (managed)', 'KMS'],
    ['Dedicated single-tenant HSM', 'CloudHSM'],
    ['Auto-rotate DB passwords', 'Secrets Manager'],
    ['Free SSL/TLS certificate', 'ACM'],
    ['Decouple components · queue', 'SQS'],
    ['Fan-out · pub/sub', 'SNS'],
    ['Containers, no server management', 'Fargate'],
    ['Serverless code · max 15 min', 'Lambda'],
    ['Object storage · unlimited', 'S3'],
    ['Block storage · one AZ', 'EBS'],
    ['Shared NFS across instances', 'EFS'],
    ['Managed relational database', 'RDS / Aurora'],
    ['NoSQL · single-digit ms', 'DynamoDB'],
    ['Data warehouse · OLAP', 'Redshift'],
    ['Serverless SQL on S3', 'Athena'],
    ['CDN · cache at the edge', 'CloudFront'],
    ['Dedicated private link to AWS', 'Direct Connect'],
    ['DNS · domain routing', 'Route 53'],
    ['Infrastructure as code', 'CloudFormation'],
    ['Multi-account guardrails', 'Organizations + SCP'],
    ['Landing zone · governance', 'Control Tower'],
    ['Database migration', 'DMS'],
    ['Petabyte offline transfer', 'Snowball / Snowmobile'],
    ['Hybrid on-prem file access', 'Storage Gateway'],
  ];

  const NUMBERS = [
    ['65', 'questions on CLF-C02'],
    ['90 min', 'exam duration'],
    ['~83 sec', 'average per question'],
    ['700/1000', 'approx passing scaled score'],
    ['6', 'Well-Architected pillars (incl. Sustainability)'],
    ['3', 'AZs minimum for high availability'],
    ['11 nines', 'S3 durability (99.999999999%)'],
    ['15 min', 'Lambda maximum execution time'],
    ['1 or 3 yr', 'Reserved Instance terms'],
    ['up to 72%', 'Reserved Instance discount'],
    ['up to 90%', 'Spot discount'],
    ['90 days', 'CloudTrail Event history retention'],
    ['$0', 'Shield Standard cost'],
    ['24%', 'Cloud Concepts exam weight'],
    ['30%', 'Security & Compliance weight (biggest)'],
    ['34%', 'Cloud Technology & Services weight (biggest)'],
    ['12%', 'Billing, Pricing & Support weight'],
  ];

  const TRAPS = [
    ['Security Group vs NACL', 'SG = stateful, instance-level, allow rules only. NACL = stateless, subnet-level, allow AND deny.'],
    ['CloudTrail vs CloudWatch', 'Trail = WHO did what (audit). Watch = HOW it is performing (metrics/alarms).'],
    ['Multi-AZ vs Read Replica', 'Multi-AZ = failover/HA, not for reads. Read Replica = scale read performance.'],
    ['S3 vs EBS vs EFS', 'S3 object/HTTP · EBS block/1 EC2/1 AZ · EFS file/many EC2.'],
    ['SQS vs SNS', 'SQS queue → one consumer. SNS pub/sub → many subscribers.'],
    ['Shield vs WAF', 'Shield = DDoS (L3/4). WAF = web exploits (L7).'],
    ['KMS vs CloudHSM', 'KMS multi-tenant managed. CloudHSM single-tenant dedicated hardware.'],
    ['IAM Role vs User', 'Role = temporary credentials for services/federation. User = long-term identity.'],
    ['Reserved vs Savings Plans', 'RI = instance-family commitment. SP = $/hour spend commitment, more flexible.'],
    ['Spot vs On-Demand', 'Spot = spare capacity, interruptible, up to 90% off. On-Demand = no commitment.'],
  ];

  const DOMAIN_CARDS = [
    { d: 'Cloud Concepts', c: '#3BA8FF', e: '☁️', pts: ['6 advantages: agility, elasticity, cost, global reach, speed, stop guessing capacity', 'CapEx → OpEx', 'IaaS / PaaS / SaaS', 'Public / Private / Hybrid', 'Well-Architected = 6 pillars', 'Shared Responsibility split'] },
    { d: 'Security & Compliance', c: '#FFB020', e: '🛡️', pts: ['IAM: users, groups, roles, policies, least privilege', 'CloudTrail (audit) vs Config (state) vs CloudWatch (metrics)', 'GuardDuty · Inspector · Macie · Security Hub', 'Shield (DDoS) vs WAF (L7)', 'KMS · CloudHSM · Secrets Manager · ACM', 'Artifact = compliance reports'] },
    { d: 'Cloud Technology & Services', c: '#22C55E', e: '⚙️', pts: ['EC2 pricing: On-Demand, Reserved, Spot, Savings Plans', 'Lambda serverless · 15 min · event-driven', 'ECS/EKS/Fargate containers', 'S3 vs EBS vs EFS vs Instance Store', 'RDS/Aurora vs DynamoDB vs Redshift', 'VPC · SG vs NACL · CloudFront · Route 53'] },
    { d: 'Billing, Pricing & Support', c: '#FF9900', e: '💰', pts: ['4 support plans: Basic, Developer, Business, Enterprise', 'Cost Explorer vs Budgets vs Pricing Calculator', 'Consolidated Billing + volume discounts', 'Reserved vs Savings Plans vs Spot', 'Free Tier categories', 'Trusted Advisor cost checks'] },
  ];

  function renderCramSheet() {
    const chip = (label, active) => `<button class="cram-tab${active ? ' active' : ''}" onclick="cramFilter('${label}',this)">${label}</button>`;
    return `<div class="cram-hero animate-in">
      <div style="position:relative">
        <div class="mt-eyebrow">Emergency Revision · ${daysLeft()} days out</div>
        <h1>One Page. <em>Every Trap.</em></h1>
        <p>Read this in 10 minutes before a practice set, and again the night before the exam. If a trigger word appears, your answer is already here.</p>
        <div class="cram-pills">
          <span class="cram-pill gold">📅 ${examDateLabel()}</span>
          <span class="cram-pill">🎯 Pass ≈ 700/1000</span>
          <span class="cram-pill">⏱ 90 min · 65 Qs</span>
          <span class="cram-pill">🧠 Trigger → Answer</span>
        </div>
      </div>
    </div>
    <div class="cram-tabs">
      ${chip('All', true)}${chip('Triggers')}${chip('Numbers')}${chip('Traps')}${chip('Domains')}
    </div>
    <div id="cram-body">
      <div class="cram-grid" data-cat="Triggers">
        <div class="cram-card">
          <div class="cram-card-title"><span class="ico">🎯</span>Keyword → Service (the exam's cheat code)</div>
          ${TRIGGERS.map(([k, v]) => `<div class="cram-line"><span class="arrow">→</span><span><b>${esc(v)}</b> &nbsp;·&nbsp; ${esc(k)}</span></div>`).join('')}
        </div>
      </div>
      <div class="cram-grid" data-cat="Numbers">
        <div class="cram-card">
          <div class="cram-card-title"><span class="ico">🔢</span>Numbers they expect you to know</div>
          ${NUMBERS.map(([n, t]) => `<div class="cram-num"><b>${esc(n)}</b><span>${esc(t)}</span></div>`).join('')}
        </div>
      </div>
      <div class="cram-grid" data-cat="Traps">
        <div class="cram-card cram-warn">
          <div class="cram-card-title"><span class="ico">⚠️</span>Classic trap pairs</div>
          ${TRAPS.map(([a, b]) => `<div class="cram-line" style="flex-direction:column;gap:.1rem"><b>${esc(a)}</b><span style="color:var(--muted)">${esc(b)}</span></div>`).join('')}
        </div>
      </div>
      <div class="cram-grid" data-cat="Domains">
        ${DOMAIN_CARDS.map(dc => `<div class="cram-card" style="border-color:${dc.c}33">
          <div class="cram-card-title" style="color:${dc.c}"><span class="ico">${dc.e}</span>${esc(dc.d)}</div>
          ${dc.pts.map(p => `<div class="cram-line"><span class="arrow" style="color:${dc.c}">•</span><span>${esc(p)}</span></div>`).join('')}
        </div>`).join('')}
      </div>
      <div class="glass-card gold-card" style="margin-top:.2rem">
        <div class="cram-card-title"><span class="ico">🚨</span>Last 60 seconds before you click “Start Exam”</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:.45rem;font-size:.76rem;color:var(--muted);line-height:1.55">
          <div>✅ Read every question twice.</div>
          <div>✅ Eliminate 2 options first, then choose.</div>
          <div>✅ "MOST cost-effective" → Spot / Reserved / Savings Plans.</div>
          <div>✅ "LEAST operational effort" → managed / serverless.</div>
          <div>✅ Flag and move on — never burn 5 minutes on one question.</div>
          <div>✅ Trust your preparation. You have done the reps.</div>
        </div>
      </div>
    </div>`;
  }
  window.renderCramSheet = renderCramSheet;

  window.cramFilter = function (cat, btn) {
    $$('.cram-tab').forEach(b => b.classList.toggle('active', b === btn));
    $$('#cram-body [data-cat]').forEach(el => {
      el.style.display = (cat === 'All' || el.dataset.cat === cat) ? '' : 'none';
    });
  };

  /* ─────────────────────────────────────────────
     6. SCROLL REVEAL
  ───────────────────────────────────────────── */
  let revealObserver = null;
  function observeReveals() {
    if (!('IntersectionObserver' in window)) return;
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('revealed'); revealObserver.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
    }
    const main = document.getElementById('main-content');
    if (!main) return;
    Array.from(main.children).forEach(el => {
      if (el.classList.contains('animate-in') || el.classList.contains('mt-card')) return;
      if (el.classList.contains('reveal-on-scroll')) return;
      if (el.offsetHeight > 40) { el.classList.add('reveal-on-scroll'); revealObserver.observe(el); }
    });
  }

  /* ─────────────────────────────────────────────
     7. INIT
  ───────────────────────────────────────────── */
  function init() {
    updateMissionClock();
    setInterval(updateMissionClock, 30000);

    // Resume a focus session if one was running when the tab closed
    try {
      const st = focusLoad();
      if (st && st.running && st.endsAt > Date.now()) {
        // keep it running silently; HUD appears when opened
        if (!focusTicker) focusTicker = setInterval(focusRender, 1000);
      }
    } catch (e) { }

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || (e.target && e.target.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCommandPalette();
      } else if (e.key === 'Escape') {
        closeCommandPalette();
        const fo = document.getElementById('focus-overlay');
        if (fo && fo.classList.contains('open')) closeFocusMode();
      } else if (!typing && e.key === '/') {
        e.preventDefault(); openCommandPalette();
      } else if (!typing && e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // quick focus shortcut
        openFocusMode(25);
      }
    });

    // Re-observe content after each navigation
    if (typeof window.navigate === 'function') {
      const origNav = window.navigate;
      window.navigate = function (tab) {
        const r = origNav.apply(this, arguments);
        setTimeout(() => { updateMissionClock(); observeReveals(); }, 220);
        return r;
      };
    }
    observeReveals();

    // The first home render happens before this file loads; upgrade it in place.
    try {
      if (typeof currentTab !== 'undefined' && currentTab === 'home') {
        const main = document.getElementById('main-content');
        if (main && !main.querySelector('.mt-card') && typeof renderHome === 'function') {
          main.innerHTML = renderHome();
          observeReveals();
        }
      }
    } catch (e) { }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
