(function () {
  function init() {
    const nav = document.querySelector('nav.nav');
    if (!nav || nav.dataset.mcMobileInit === '1') return;
    // Skip if the page already has its own mobile menu implementation
    if (nav.querySelector('.menu-toggle') || document.getElementById('mobileMenu')) return;
    nav.dataset.mcMobileInit = '1';
    document.documentElement.classList.add('mc-mobile-nav-active');

    const wrap = nav.querySelector(':scope > .wrap') || nav.querySelector('.wrap');
    if (!wrap) return;

    const linksContainer = wrap.querySelector('.nav-links');
    const navRight = wrap.querySelector('.nav-right');
    const logoEl = wrap.querySelector('.logo .brand-logo') || wrap.querySelector('.brand-logo');

    // Build burger button
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mc-menu-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'mcMobileMenu');
    btn.setAttribute('aria-label', 'Open menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    wrap.appendChild(btn);

    // Build mobile menu overlay
    const menu = document.createElement('div');
    menu.id = 'mcMobileMenu';
    menu.className = 'mc-mobile-menu';
    menu.setAttribute('aria-hidden', 'true');

    const logoSrc = logoEl ? logoEl.getAttribute('src') : '/logo.svg';

    // Clone nav links
    const links = linksContainer ? Array.from(linksContainer.querySelectorAll('a')) : [];
    const linksHtml = links.map((a, i) => {
      const num = String(i + 1).padStart(2, '0');
      const label = a.textContent.trim();
      return '<a href="' + a.getAttribute('href') + '"' + (a.classList.contains('active') ? ' class="active"' : '') + '>' + label + ' <span class="mc-num">' + num + '</span></a>';
    }).join('');

    // Find primary CTA in nav-right
    let ctaHref = '/find-a-doctor.html';
    let ctaLabel = 'Book an appointment';
    if (navRight) {
      const ctaBtn = navRight.querySelector('a.btn.primary, a.btn');
      if (ctaBtn) {
        ctaHref = ctaBtn.getAttribute('href') || ctaHref;
        ctaLabel = ctaBtn.textContent.trim() || ctaLabel;
      }
    }

    // Detect existing lang state
    const isAr = document.body.classList.contains('lang-ar');

    menu.innerHTML =
      '<div class="mc-mobile-menu-header">' +
        '<a href="/index.html" class="logo"><img class="brand-logo" src="' + logoSrc + '" alt="My Clinic"></a>' +
        '<button type="button" class="mc-menu-toggle" aria-expanded="true" aria-label="Close menu"><span></span><span></span><span></span></button>' +
      '</div>' +
      '<div class="mc-mobile-menu-inner">' +
        '<div class="mc-mobile-links">' + linksHtml + '</div>' +
        '<div class="mc-mobile-actions">' +
          '<div class="mc-lang" role="group" aria-label="Language switcher">' +
            '<button type="button" class="' + (isAr ? '' : 'active') + '" data-lang="en" aria-pressed="' + (isAr ? 'false' : 'true') + '">EN</button>' +
            '<button type="button" class="' + (isAr ? 'active' : '') + '" data-lang="ar" aria-pressed="' + (isAr ? 'true' : 'false') + '">AR</button>' +
          '</div>' +
          '<a class="mc-cta" href="' + ctaHref + '">' + ctaLabel + '</a>' +
          '<a class="mc-call" href="tel:920022811">Call 920022811</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(menu);

    function setOpen(open) {
      btn.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('mc-no-scroll', open);
      const closeBtn = menu.querySelector('.mc-menu-toggle');
      if (closeBtn) closeBtn.setAttribute('aria-expanded', String(open));
    }

    btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    menu.querySelector('.mc-mobile-menu-header .mc-menu-toggle')
      .addEventListener('click', () => setOpen(false));

    menu.querySelectorAll('.mc-mobile-links a, .mc-mobile-actions .mc-cta, .mc-mobile-actions .mc-call')
      .forEach(a => a.addEventListener('click', () => setOpen(false)));

    // Wire lang switcher to the existing .lang-pill (so language-switcher.js handles it)
    menu.querySelectorAll('.mc-lang button').forEach(b => {
      b.addEventListener('click', () => {
        const target = b.getAttribute('data-lang');
        const desktopBtn = document.querySelector('.lang-pill button[aria-pressed]');
        // Find the EN or AR button by label
        const langButtons = document.querySelectorAll('.lang-pill button');
        langButtons.forEach(lb => {
          const isMatch = lb.textContent.trim().toLowerCase() === target;
          if (isMatch) lb.click();
        });
        menu.querySelectorAll('.mc-lang button').forEach(x => {
          const a = x === b;
          x.classList.toggle('active', a);
          x.setAttribute('aria-pressed', String(a));
        });
      });
    });

    // Close on escape
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

    // Close if window resized to desktop
    const mq = window.matchMedia('(min-width: 901px)');
    mq.addEventListener && mq.addEventListener('change', e => { if (e.matches) setOpen(false); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
