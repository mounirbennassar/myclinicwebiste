(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    /* ── DESKTOP: services tabs ── */
    var items = document.querySelectorAll('.td .svc-item');
    var panels = document.querySelectorAll('.td .svc-panel');
    items.forEach(function (it, i) {
      function activate() {
        items.forEach(function (x) { x.classList.remove('active'); });
        panels.forEach(function (x) { x.classList.remove('active'); });
        it.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      }
      it.addEventListener('click', activate);
      it.addEventListener('mouseenter', activate);
    });

    /* ── FAQ accordions (both layouts) ── */
    function wireFaq(scope) {
      var list = document.querySelector(scope);
      if (!list) return;
      list.querySelectorAll('.qa-q').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var qa = btn.parentElement;
          var open = qa.classList.contains('open');
          list.querySelectorAll('.qa').forEach(function (o) {
            o.classList.remove('open');
            var a = o.querySelector('.qa-a'); if (a) a.style.maxHeight = null;
          });
          if (!open) {
            qa.classList.add('open');
            var a = qa.querySelector('.qa-a');
            if (a) a.style.maxHeight = a.scrollHeight + 'px';
          }
        });
      });
      var first = list.querySelector('.qa.open .qa-a');
      if (first) first.style.maxHeight = first.scrollHeight + 'px';
    }
    wireFaq('.td .faq-list');
    wireFaq('.tm .faq');

    /* ── DESKTOP: fade-in ── */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      document.querySelectorAll('.td .fade').forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll('.td .fade').forEach(function (el) { el.classList.add('in'); });
    }

    /* ── MOBILE: reveal on scroll ── */
    var revs = Array.prototype.slice.call(document.querySelectorAll('.tm .rev'));
    function reveal() {
      var vh = window.innerHeight;
      revs.forEach(function (el) {
        if (!el.classList.contains('in') && el.getBoundingClientRect().top < vh * 0.92) el.classList.add('in');
      });
    }

    /* ── Sticky bars on scroll ── */
    var tdSticky = document.getElementById('tdSticky');
    var tmSticky = document.getElementById('tmSticky');
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (tdSticky) tdSticky.classList.toggle('show', y > 700);
      if (tmSticky) tmSticky.classList.toggle('show', y > 600);
      reveal();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { reveal(); });

    /* ── Smooth jumps to the booking block (works inside horizontal scrollers) ── */
    document.querySelectorAll('[data-bookjump]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var t = document.getElementById(a.getAttribute('data-bookjump') || 'tmBooking');
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
      });
    });

    /* ── Doctor finder widget: redirect to directory with URL filters ── */
    function wireFinder(specId, cityId, goId) {
      var go = document.getElementById(goId);
      if (!go) return;
      go.addEventListener('click', function (e) {
        e.preventDefault();
        var spec = document.getElementById(specId),
            city = document.getElementById(cityId),
            params = [];
        if (spec && spec.value) params.push('specialty=' + encodeURIComponent(spec.value));
        if (city && city.value) params.push('branch=' + encodeURIComponent(city.value));
        window.location.href = '/find-a-doctor.html' + (params.length ? ('?' + params.join('&')) : '');
      });
    }
    wireFinder('teleSpecialty', 'teleCity', 'teleGo');
    wireFinder('mTeleSpecialty', 'mTeleCity', 'mTeleGo');

    onScroll();
  });
})();
