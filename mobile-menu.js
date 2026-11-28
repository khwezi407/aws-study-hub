/* ═══════════════════════════════════════════════════════════════
   mobile-menu.js — smooth bottom-sheet nav for phones
   Slides up with all sidebar options; swipe/tap down to dismiss.
   Clones the real sidebar so it always stays in sync.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var sheet, backdrop, handle, open = false, lastFocus = null;

  function inject() {
    if (document.getElementById('mobile-sheet')) return;
    injectStyles();

    backdrop = document.createElement('div');
    backdrop.className = 'mobile-sheet-backdrop';
    backdrop.id = 'mobile-sheet-backdrop';
    document.body.appendChild(backdrop);

    sheet = document.createElement('div');
    sheet.className = 'mobile-sheet';
    sheet.id = 'mobile-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-label', 'Menu');
    document.body.appendChild(sheet);

    buildContent();
    wire();
  }

  function buildContent() {
    var sidebar = document.getElementById('sidebar');
    var html = '<div class="mobile-sheet-handle" id="mobile-sheet-handle"><span></span></div>';
    if (sidebar) {
      Array.prototype.forEach.call(sidebar.children, function (ch) {
        if (ch.classList && ch.classList.contains('sidebar-section-label')) {
          html += '<div class="mobile-sheet-label">' + (ch.textContent || '').trim() + '</div>';
        } else if (ch.classList && ch.classList.contains('nav-btn') && ch.dataset && ch.dataset.tab) {
          var clone = ch.cloneNode(true);
          clone.classList.remove('active');
          clone.classList.add('mobile-sheet-item');
          html += clone.outerHTML;
        }
      });
    }
    sheet.innerHTML = html;
    // highlight current
    Array.prototype.forEach.call(sheet.querySelectorAll('.mobile-sheet-item'), function (b) {
      if (b.dataset.tab === currentTab) b.classList.add('active');
    });
  }

  function wire() {
    backdrop.addEventListener('click', close);
    // Use event delegation on the sheet so the handle keeps working even though
    // buildContent() replaces innerHTML (which destroys the handle node) on each open.
    var startY = 0, lastY = 0, dragging = false, moved = false;
    sheet.addEventListener('touchstart', function (e) {
      if (!e.target.closest || !e.target.closest('.mobile-sheet-handle')) return;
      startY = e.touches[0].clientY; lastY = startY; dragging = true; moved = false;
    }, { passive: true });
    sheet.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      var y = e.touches[0].clientY; lastY = y;
      var dy = y - startY;
      if (Math.abs(dy) > 6) moved = true;
      if (dy > 0) { e.preventDefault(); sheet.style.transform = 'translateY(' + dy + 'px)'; }
    }, { passive: false });
    sheet.addEventListener('touchend', function (e) {
      if (!dragging) return;
      dragging = false;
      var endY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : lastY;
      var dy = endY - startY;
      sheet.style.transform = '';
      if (dy > 50 || !moved) close();
    });
    sheet.addEventListener('click', function (e) {
      // handle tap/click closes
      if (e.target.closest && e.target.closest('.mobile-sheet-handle')) { e.preventDefault(); close(); return; }
      var btn = e.target.closest ? e.target.closest('.mobile-sheet-item') : null;
      if (btn && btn.dataset.tab) {
        var tab = btn.dataset.tab;
        close();
        setTimeout(function () { try { navigate(tab); } catch (err) { } }, 220);
      }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) close(); });
  }

  function openSheet() {
    inject();
    open = true;
    lastFocus = document.activeElement;
    buildContent();
    backdrop.classList.add('open');
    sheet.classList.add('open');
    document.body.classList.add('mobile-sheet-open');
  }
  function close() {
    if (!sheet) return;
    open = false;
    sheet.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('mobile-sheet-open');
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) { } }
  }

  window.toggleMobileMenu = function () { if (!sheet) inject(); if (open) close(); else openSheet(); };

  function injectStyles() {
    if (document.getElementById('mobile-menu-style')) return;
    var s = document.createElement('style'); s.id = 'mobile-menu-style';
    s.textContent = [
      '.mobile-menu-btn{display:none}',
      /* cinematic dim + blur backdrop */
      '.mobile-sheet-backdrop{position:fixed;inset:0;z-index:9400;background:radial-gradient(120% 80% at 50% 0%,rgba(59,130,246,.10),transparent 60%),rgba(2,4,9,.62);',
      'opacity:0;pointer-events:none;backdrop-filter:blur(0px);-webkit-backdrop-filter:blur(0px);',
      'transition:opacity .34s ease,backdrop-filter .34s ease,-webkit-backdrop-filter .34s ease}',
      '.mobile-sheet-backdrop.open{opacity:1;pointer-events:auto;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}',
      /* ultra-premium glass sheet with animated gradient hairline on top */
      '.mobile-sheet{position:fixed;left:0;right:0;bottom:0;z-index:9500;max-height:86vh;overflow-y:auto;overscroll-behavior:contain;',
      'background:linear-gradient(180deg,rgba(20,27,46,.86),rgba(6,10,19,.96) 60%,rgba(4,7,14,.99));',
      'border-top:1px solid rgba(255,255,255,.10);border-radius:28px 28px 0 0;',
      'box-shadow:0 -30px 80px -28px rgba(0,0,0,.95),0 -1px 0 rgba(255,255,255,.06) inset,0 1px 0 rgba(255,255,255,.10) inset;',
      'backdrop-filter:blur(26px) saturate(140%);-webkit-backdrop-filter:blur(26px) saturate(140%);',
      'transform:translateY(100%);transition:transform .42s cubic-bezier(.22,1,.36,1);',
      'padding:.5rem .7rem calc(1.1rem + env(safe-area-inset-bottom));-webkit-overflow-scrolling:touch}',
      '.mobile-sheet.open{transform:translateY(0)}',
      /* glowing animated top edge */
      '.mobile-sheet::before{content:"";position:absolute;top:0;left:8%;right:8%;height:1px;',
      'background:linear-gradient(90deg,transparent,rgba(125,211,252,.7),rgba(233,169,47,.7),transparent);',
      'background-size:200% 100%;animation:sheetEdge 4s linear infinite;opacity:.8}',
      '@keyframes sheetEdge{0%{background-position:0% 0}100%{background-position:200% 0}}',
      /* premium grabber with soft glow */
      '.mobile-sheet-handle{display:flex;justify-content:center;padding:.7rem 0 .45rem;cursor:grab;position:relative}',
      '.mobile-sheet-handle span{width:48px;height:5px;border-radius:99px;',
      'background:linear-gradient(180deg,rgba(255,255,255,.35),rgba(255,255,255,.16));',
      'box-shadow:0 0 12px -2px rgba(125,211,252,.45),inset 0 1px 0 rgba(255,255,255,.4);transition:width .2s ease}',
      '.mobile-sheet-handle:active span{width:38px}',
      /* section labels with lit accent bar */
      '.mobile-sheet-label{display:flex;align-items:center;gap:.5rem;font-size:.56rem;text-transform:uppercase;letter-spacing:.18em;',
      'color:rgba(226,232,240,.42);padding:1rem .8rem .3rem;font-weight:900;position:relative}',
      '.mobile-sheet-label::before{content:"";width:3px;height:11px;border-radius:2px;',
      'background:linear-gradient(180deg,var(--gold,#e9a92f),rgba(233,169,47,.3));box-shadow:0 0 8px -1px rgba(233,169,47,.6)}',
      /* items: glassy with sliding sheen + glow on active */
      '.mobile-sheet-item{display:flex;align-items:center;gap:.75rem;width:100%;padding:.68rem .8rem;border-radius:14px;position:relative;overflow:hidden;',
      'color:var(--text,#eef2fb);font:inherit;font-size:.88rem;font-weight:600;cursor:pointer;background:rgba(255,255,255,.02);',
      'border:1px solid transparent;text-align:left;margin:.18rem 0;',
      'transition:background .18s ease,border-color .18s ease,transform .16s ease,box-shadow .2s ease}',
      '.mobile-sheet-item::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.06) 50%,transparent 70%);',
      'transform:translateX(-120%);transition:transform .5s ease;pointer-events:none}',
      '.mobile-sheet-item:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.08)}',
      '.mobile-sheet-item:hover::after{transform:translateX(120%)}',
      '.mobile-sheet-item:active{transform:scale(.985)}',
      '.mobile-sheet-item.active{background:linear-gradient(100deg,rgba(233,169,47,.18),rgba(233,169,47,.04) 70%,transparent);',
      'border-color:rgba(233,169,47,.28);box-shadow:0 0 0 1px rgba(233,169,47,.10) inset,0 8px 22px -14px rgba(233,169,47,.5)}',
      '.mobile-sheet-item img,.mobile-sheet-item .nav-icon{width:22px;height:22px;flex-shrink:0;filter:drop-shadow(0 2px 6px rgba(0,0,0,.5));transition:transform .18s ease}',
      '.mobile-sheet-item:hover img,.mobile-sheet-item:hover .nav-icon{transform:scale(1.08)}',
      '.mobile-sheet-open{overflow:hidden}',
      '@media(max-width:860px){.mobile-menu-btn{display:inline-flex}}',
      '@media(prefers-reduced-motion:reduce){.mobile-sheet,.mobile-sheet-backdrop,.mobile-sheet-item,.mobile-sheet-handle span{transition:none!important;animation:none!important}}'
    ].join('');
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();