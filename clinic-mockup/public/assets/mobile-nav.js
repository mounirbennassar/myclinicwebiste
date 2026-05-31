(function () {
  // Inline icons
  var ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 6l12 12M18 6 6 18"/></svg>';

  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function init() {
    var nav = document.querySelector('nav.nav');
    if (!nav || nav.dataset.mcMobileInit === '1') return;
    // Skip if the page already has its own (non-shared) mobile menu implementation
    if (nav.querySelector('.menu-toggle') || document.getElementById('mobileMenu')) return;
    nav.dataset.mcMobileInit = '1';
    document.documentElement.classList.add('mc-mobile-nav-active');

    var wrap = nav.querySelector(':scope > .wrap') || nav.querySelector('.wrap');
    if (!wrap) return;

    var linksContainer = wrap.querySelector('.nav-links');
    var navRight = wrap.querySelector('.nav-right');

    // Resolve the primary CTA (Book) from the desktop nav-right
    var ctaHref = '/find-a-doctor.html';
    var ctaLabel = 'Book Now';
    if (navRight) {
      var ctaBtn = navRight.querySelector('a.btn.primary, a.btn');
      if (ctaBtn) {
        ctaHref = ctaBtn.getAttribute('href') || ctaHref;
        ctaLabel = (ctaBtn.textContent || '').trim() || ctaLabel;
      }
    }

    // ── Nav-bar actions: Book pill + circular burger ──
    var actions = document.createElement('div');
    actions.className = 'mc-nav-actions';

    var bookPill = document.createElement('a');
    bookPill.className = 'mc-nav-book';
    bookPill.setAttribute('href', ctaHref);
    bookPill.innerHTML = '<span>Book</span>' + ICON_ARROW;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mc-menu-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'mcMobileMenu');
    btn.setAttribute('aria-label', 'Open menu');
    btn.innerHTML = '<span></span><span></span><span></span>';

    actions.appendChild(bookPill);
    actions.appendChild(btn);
    wrap.appendChild(actions);

    // ── Clone nav links (numbered) ──
    var links = linksContainer ? Array.prototype.slice.call(linksContainer.querySelectorAll('a')) : [];
    var linksHtml = links.map(function (a, i) {
      var num = String(i + 1).padStart(2, '0');
      var label = (a.textContent || '').trim();
      var active = a.classList.contains('active') ? ' class="active"' : '';
      return '<a href="' + esc(a.getAttribute('href')) + '"' + active + '>' +
        esc(label) + '<span class="mc-num">' + num + '</span></a>';
    }).join('');

    var isAr = document.body.classList.contains('lang-ar');

    // ── Full-screen navy overlay ──
    var menu = document.createElement('div');
    menu.id = 'mcMobileMenu';
    menu.className = 'mc-mobile-menu';
    menu.setAttribute('aria-hidden', 'true');
    menu.innerHTML =
      '<div class="mc-mobile-menu-header">' +
        '<div class="mc-mobile-brand"><span class="en">My Clinic</span><span class="ar">عيـــادتــي</span></div>' +
        '<button type="button" class="mc-menu-close" aria-label="Close menu">' + ICON_CLOSE + '</button>' +
      '</div>' +
      '<nav class="mc-mobile-links">' + linksHtml + '</nav>' +
      '<div class="mc-mobile-actions">' +
        '<div class="mc-btn-row">' +
          '<a class="mc-cta" href="' + esc(ctaHref) + '">' + esc(ctaLabel) + '</a>' +
          '<a class="mc-call" href="tel:920022811">Call us</a>' +
        '</div>' +
        '<div class="mc-mobile-meta">' +
          '<div class="mc-ph"><span>Toll-free · 24/7</span><b>920 022 811</b></div>' +
          '<div class="mc-ph"><span>Language</span>' +
            '<span class="mc-lang" role="group" aria-label="Language switcher">' +
              '<button type="button" class="' + (isAr ? '' : 'active') + '" data-lang="en" aria-pressed="' + (isAr ? 'false' : 'true') + '">EN</button>' +
              '<button type="button" class="' + (isAr ? 'active' : '') + '" data-lang="ar" aria-pressed="' + (isAr ? 'true' : 'false') + '">العربية</button>' +
            '</span>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(menu);

    function setOpen(open) {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('mc-no-scroll', open);
    }

    btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
    menu.querySelector('.mc-menu-close').addEventListener('click', function () { setOpen(false); });

    // Close after navigating
    menu.querySelectorAll('.mc-mobile-links a, .mc-btn-row a')
      .forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });

    // Wire language buttons to the existing desktop .lang-pill (language-switcher.js owns the logic)
    menu.querySelectorAll('.mc-lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        var target = b.getAttribute('data-lang');
        document.querySelectorAll('.lang-pill button').forEach(function (lb) {
          if ((lb.textContent || '').trim().toLowerCase() === target) lb.click();
        });
        menu.querySelectorAll('.mc-lang button').forEach(function (x) {
          var on = x === b;
          x.classList.toggle('active', on);
          x.setAttribute('aria-pressed', String(on));
        });
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    // Close if resized up to desktop
    var mq = window.matchMedia('(min-width: 901px)');
    if (mq.addEventListener) mq.addEventListener('change', function (e) { if (e.matches) setOpen(false); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
