/* ═══════════════════════════════════════════════════════════════
   notifications.js — gives the topbar bell a real purpose.
   A dropdown "Mission Intel" panel: exam countdown, study streak,
   XP/level, due spaced-repetition reviews, and quick actions.
   Reads live state from the main app (globals in index.html).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var bell, panel, open = false;

  function injectStyles() {
    if (document.getElementById('notif-style')) return;
    var s = document.createElement('style');
    s.id = 'notif-style';
    s.textContent = [
      '.topbar-bell{cursor:pointer}',
      '.notif-panel{position:fixed;top:64px;right:16px;z-index:9300;width:min(340px,calc(100vw - 24px));',
      'background:linear-gradient(180deg,rgba(18,24,40,.98),rgba(7,11,20,.99));border:1px solid rgba(255,255,255,.10);',
      'border-radius:18px;box-shadow:0 24px 60px -20px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.06);',
      'backdrop-filter:blur(18px);padding:.5rem;opacity:0;transform:translateY(-8px) scale(.98);pointer-events:none;',
      'transition:opacity .2s ease,transform .2s cubic-bezier(.22,1,.36,1);transform-origin:top right}',
      '.notif-panel.open{opacity:1;transform:none;pointer-events:auto}',
      '.notif-head{display:flex;align-items:center;justify-content:space-between;padding:.55rem .7rem .4rem}',
      '.notif-title{font-size:.7rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:var(--gold,#e9a92f)}',
      '.notif-clear{font-size:.6rem;font-weight:700;color:var(--muted,rgba(226,232,240,.55));background:none;border:none;cursor:pointer;padding:.2rem .3rem;border-radius:8px}',
      '.notif-clear:hover{color:var(--text,#eef2fb);background:rgba(255,255,255,.06)}',
      '.notif-item{display:flex;align-items:flex-start;gap:.7rem;width:100%;padding:.6rem .7rem;border-radius:12px;',
      'background:none;border:none;color:var(--text,#eef2fb);font:inherit;text-align:left;cursor:pointer}',
      '.notif-item:hover{background:rgba(255,255,255,.06)}',
      '.notif-ico{width:30px;height:30px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1rem;',
      'border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}',
      '.notif-body{flex:1;min-width:0}',
      '.notif-line{font-size:.78rem;font-weight:700;line-height:1.25}',
      '.notif-sub{font-size:.64rem;color:var(--muted,rgba(226,232,240,.55));margin-top:1px}',
      '.notif-foot{border-top:1px solid rgba(255,255,255,.08);margin-top:.35rem;padding:.45rem .7rem .25rem;',
      'font-size:.6rem;color:var(--muted,rgba(226,232,240,.4));text-align:center}',
      '@media(max-width:860px){.notif-panel{top:auto;bottom:calc(64px + env(safe-area-inset-bottom));right:12px;transform-origin:bottom right}}',
      '@media(prefers-reduced-motion:reduce){.notif-panel{transition:none!important}}'
    ].join('');
    document.head.appendChild(s);
  }

  function safe(fn, dflt) { try { var v = fn(); return (v === undefined || v === null) ? dflt : v; } catch (e) { return dflt; } }

  function buildItems() {
    var items = [];
    var days = safe(function () { return daysLeft(); }, null);
    var dateLbl = safe(function () { return examDateLabel(true); }, '');
    var streak = safe(function () { return streak.count; }, 0);
    var xp = safe(function () { return xp; }, 0);
    var level = Math.floor(xp / 200) + 1;
    var due = safe(function () { return dueItems().length; }, 0);
    var name = safe(function () { return displayName(); }, 'Cloud Dreamer');
    var missionDone = safe(function () { return (missions && missions.done) ? missions.done.length : 0; }, 0);

    if (days !== null) {
      var urgent = days <= 3;
      items.push({
        ico: urgent ? '⏰' : '📅',
        line: days > 0 ? (days + ' day' + (days === 1 ? '' : 's') + ' to the exam') : 'Exam day is here — you\'ve got this!',
        sub: dateLbl ? ('Target: ' + dateLbl) : 'Check Settings to set your date',
        tab: 'roadmap'
      });
    }
    if (due > 0) {
      items.push({ ico: '📌', line: due + ' card' + (due === 1 ? '' : 's') + ' due for review', sub: 'Spaced repetition is ready', tab: 'practice', action: 'due' });
    } else {
      items.push({ ico: '✅', line: 'You\'re all caught up on reviews', sub: 'Nice work — keep the streak alive', tab: 'practice' });
    }
    items.push({ ico: '🔥', line: streak + '-day study streak', sub: streak >= 7 ? 'On fire! Don\'t break the chain.' : streak >= 3 ? 'Building momentum' : 'Start today — consistency wins', tab: 'progress' });
    items.push({ ico: '⚡', line: 'Level ' + level + ' · ' + xp + ' XP', sub: missionDone + ' mission' + (missionDone === 1 ? '' : 's') + ' done today', tab: 'home' });
    return items;
  }

  function render() {
    var items = buildItems();
    var html = '<div class="notif-head"><span class="notif-title">Mission Intel</span>' +
      '<button class="notif-clear" id="notif-clear">Mark read</button></div>';
    items.forEach(function (it) {
      html += '<button class="notif-item" data-tab="' + (it.tab || '') + '"' + (it.action ? ' data-action="' + it.action + '"' : '') + '>' +
        '<span class="notif-ico">' + it.ico + '</span>' +
        '<span class="notif-body"><span class="notif-line">' + it.line + '</span>' +
        '<span class="notif-sub">' + it.sub + '</span></span></button>';
    });
    html += '<div class="notif-foot">' + safe(function () { return displayName(); }, 'Cloud Dreamer') + ' · synced with your progress</div>';
    panel.innerHTML = html;
    var clear = document.getElementById('notif-clear');
    if (clear) clear.addEventListener('click', function (e) { e.stopPropagation(); markRead(); close(); });
    Array.prototype.forEach.call(panel.querySelectorAll('.notif-item'), function (b) {
      b.addEventListener('click', function () {
        var tab = b.dataset.tab, action = b.dataset.action;
        close();
        if (action === 'due') { try { startPractice('due'); return; } catch (e) { } }
        if (tab) { try { navigate(tab); } catch (e) { } }
      });
    });
  }

  function markRead() {
    try { localStorage.setItem('clf_notif_read', String(Date.now())); } catch (e) { }
    var badge = bell && bell.querySelector('.topbar-bell-badge');
    if (badge) badge.style.display = 'none';
  }

  function hasUnread() {
    try {
      if (localStorage.getItem('clf_notif_read')) return false;
    } catch (e) { }
    return true;
  }

  function openPanel() {
    render();
    open = true;
    panel.classList.add('open');
  }
  function close() {
    open = false;
    if (panel) panel.classList.remove('open');
  }
  function toggle() { if (open) close(); else openPanel(); }

  function init() {
    bell = document.querySelector('.topbar-bell');
    if (!bell) return;
    injectStyles();
    panel = document.createElement('div');
    panel.className = 'notif-panel';
    panel.id = 'notif-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(panel);

    var badge = bell.querySelector('.topbar-bell-badge');
    if (badge && !hasUnread()) badge.style.display = 'none';

    bell.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    document.addEventListener('click', function (e) {
      if (open && panel && !panel.contains(e.target) && !bell.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) close(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();