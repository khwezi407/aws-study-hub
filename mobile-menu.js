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
    var h = document.getElementById('mobile-sheet-handle');
    if (h) {
      var startY = 0, dragging = false;
      h.addEventListener('touchstart', function (e) { startY = e.touches[0].clientY; dragging = true; }, { passive: true });
      h.addEventListener('touchmove', function (e) {
        if (!dragging) return;
        var dy = e.touches[0].clientY - startY;
        if (dy > 0) sheet.style.transform = 'translateY(' + dy + 'px)';
      }, { passive: true });
      h.addEventListener('touchend', function () {
        dragging = false;
        sheet.style.transform = '';
        var dy = (window.event && window.event.changedTouches) ? window.event.changedTouches[0].clientY - startY : 0;
        if (dy > 80) close();
      });
      h.addEventListener('click', close);
    }
    sheet.addEventListener('click', function (e) {
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
      '.mobile-sheet-backdrop{position:fixed;inset:0;z-index:9400;background:rgba(2,4,9,.55);opacity:0;pointer-events:none;transition:opacity .3s ease}',
      '.mobile-sheet-backdrop.open{opacity:1;pointer-events:auto}',
      '.mobile-sheet{position:fixed;left:0;right:0;bottom:0;z-index:9500;max-height:84vh;overflow-y:auto;',
      'background:linear-gradient(180deg,rgba(16,22,38,.98),rgba(7,11,20,.99));border-top:1px solid rgba(255,255,255,.12);',
      'border-radius:24px 24px 0 0;box-shadow:0 -20px 60px -20px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.08);',
      'transform:translateY(100%);transition:transform .36s cubic-bezier(.22,1,.36,1);padding:.4rem .6rem calc(1rem + env(safe-area-inset-bottom))}',
      '.mobile-sheet.open{transform:translateY(0)}',
      '.mobile-sheet-handle{display:flex;justify-content:center;padding:.5rem 0 .3rem;cursor:grab}',
      '.mobile-sheet-handle span{width:44px;height:5px;border-radius:99px;background:rgba(255,255,255,.22)}',
      '.mobile-sheet-label{font-size:.54rem;text-transform:uppercase;letter-spacing:.16em;color:rgba(226,232,240,.34);padding:.8rem .7rem .25rem;font-weight:800}',
      '.mobile-sheet-item{display:flex;align-items:center;gap:.7rem;width:100%;padding:.6rem .7rem;border-radius:12px;',
      'color:var(--text,#eef2fb);font:inherit;font-size:.86rem;font-weight:600;cursor:pointer;background:none;border:none;text-align:left}',
      '.mobile-sheet-item img,.mobile-sheet-item .nav-icon{width:22px;height:22px;flex-shrink:0}',
      '.mobile-sheet-item:active,.mobile-sheet-item.active{background:linear-gradient(90deg,rgba(233,169,47,.16),rgba(233,169,47,.03) 72%,transparent)}',
      '.mobile-sheet-open{overflow:hidden}',
      '@media(max-width:860px){.mobile-menu-btn{display:inline-flex}}',
      '@media(prefers-reduced-motion:reduce){.mobile-sheet,.mobile-sheet-backdrop{transition:none!important}}'
    ].join('');
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();