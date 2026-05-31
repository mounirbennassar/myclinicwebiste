(function () {
  function init() {
    var home = document.querySelector('.m-home');
    if (!home) return;
    // Only run the mobile-home behaviour when it's actually visible
    if (window.matchMedia('(min-width: 901px)').matches) {
      // still attach a resize listener so it activates if rotated/resized down
    }

    /* ── HERO SLIDER ── */
    var track = document.getElementById('mHeroTrack');
    var dotsWrap = document.getElementById('mHeroDots');
    if (track && dotsWrap) {
      var slides = Array.prototype.slice.call(track.querySelectorAll('.m-slide'));
      var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('button'));
      var current = 0;
      var timer = null;
      var paused = false;

      function setActive(i) {
        current = i;
        slides.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
        dots.forEach(function (d, n) { d.classList.toggle('active', n === i); });
      }
      function goTo(i, smooth) {
        i = (i + slides.length) % slides.length;
        track.scrollTo({ left: track.clientWidth * i, behavior: smooth === false ? 'auto' : 'smooth' });
        setActive(i);
      }
      function next() { goTo(current + 1); }
      function start() { stop(); if (slides.length > 1) timer = setInterval(function () { if (!paused) next(); }, 5200); }
      function stop() { if (timer) { clearInterval(timer); timer = null; } }

      dots.forEach(function (d, n) { d.addEventListener('click', function () { goTo(n); start(); }); });

      // Sync active state to manual swipes
      var raf = null;
      track.addEventListener('scroll', function () {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var i = Math.round(track.scrollLeft / track.clientWidth);
          if (i !== current) setActive(i);
        });
      }, { passive: true });

      track.addEventListener('touchstart', function () { paused = true; }, { passive: true });
      track.addEventListener('touchend', function () {
        paused = false;
        // snap timing restart
        start();
      }, { passive: true });

      // Pause autoplay when tab hidden
      document.addEventListener('visibilitychange', function () { paused = document.hidden; });

      setActive(0);
      start();
    }

    /* ── REVEAL ON SCROLL ── */
    var revs = Array.prototype.slice.call(home.querySelectorAll('.m-rev'));
    function reveal() {
      var vh = window.innerHeight;
      revs.forEach(function (el) {
        if (!el.classList.contains('in') && el.getBoundingClientRect().top < vh * 0.92) el.classList.add('in');
      });
    }

    /* ── STICKY BOOK BAR ── */
    var sticky = document.getElementById('mSticky');
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (sticky) sticky.classList.toggle('show', y > 560);
      reveal();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', reveal);
    onScroll();

    /* ── LOCATIONS: list + Leaflet map (mirrors desktop) ── */
    initLocations(home);
  }

  function initLocations(home) {
    var listEl = document.getElementById('mLocList');
    var mapEl = document.getElementById('mBranchMap');
    if (!listEl) return;

    var branches = [
      { id: 'mohammadiyah', name: 'Jeddah · Al Mohammadiyah', addr: 'King Abdulaziz Rd, Al Mohammadiyah District', hours: 'Open until 10 PM', specialties: 12, doctors: 38, lat: 21.6035, lng: 39.1356 },
      { id: 'safa', name: 'Jeddah · Al Safa', addr: 'Prince Saud Al Faisal St, Al Safa District', hours: 'Open until 10 PM', specialties: 14, doctors: 42, lat: 21.5810, lng: 39.1840 },
      { id: 'khalidiyyah', name: 'Jeddah · Al Khalidiyyah', addr: 'Al Khalidiyyah · Specialized dental care', hours: 'Open until 10 PM', specialties: 1, doctors: 14, lat: 21.5550, lng: 39.1432 },
      { id: 'sahafa', name: 'Riyadh · Al Sahafa', addr: 'Anas Bin Malik Rd, Al Sahafa District', hours: 'Open until 10 PM', specialties: 16, doctors: 54, lat: 24.8246, lng: 46.6516 },
      { id: 'tahlia', name: 'Jeddah · Tahlia', addr: 'Prince Mohammed Bin Abdulaziz St, Tahlia', hours: 'Open until 10 PM', specialties: 11, doctors: 32, lat: 21.5780, lng: 39.1325 }
    ];
    var isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl' || document.body.classList.contains('lang-ar');
    function localize(value) {
      var dict = window.MyClinicTranslations && window.MyClinicTranslations.ar;
      if (isArabic && dict && dict[value]) return dict[value];
      return value;
    }
    var specWord = function (b) {
      if (!isArabic) return b.specialties === 1 ? 'specialty' : 'specialties';
      return b.specialties === 1 ? 'تخصص واحد' : 'تخصصاً';
    };
    var docWord = function (b) {
      if (!isArabic) return b.id === 'khalidiyyah' ? 'dentists' : 'doctors';
      return b.id === 'khalidiyyah' ? 'طبيب أسنان' : 'طبيباً';
    };

    // Render list
    listEl.innerHTML = branches.map(function (b, i) {
      return '<button class="m-loc' + (i === 0 ? ' active' : '') + '" data-branch="' + b.id + '">' +
        '<div class="name">' + localize(b.name) + '</div>' +
        '<div class="addr">' + localize(b.addr) + '</div>' +
        '<div class="meta"><span class="open">● ' + localize(b.hours) + '</span>' +
        '<span>' + (b.specialties === 1 && isArabic ? specWord(b) : '<b>' + b.specialties + '</b> ' + specWord(b)) + '</span>' +
        '<span><b>' + b.doctors + '</b> ' + docWord(b) + '</span></div></button>';
    }).join('');

    var markers = null;
    var mapReady = false;

    function selectBranch(id, source) {
      listEl.querySelectorAll('.m-loc').forEach(function (el) { el.classList.toggle('active', el.dataset.branch === id); });
      if (source !== 'list') {
        var item = listEl.querySelector('[data-branch="' + id + '"]');
        if (item && item.scrollIntoView) item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (markers) {
        markers.forEach(function (m) {
          var el = m.marker.getElement();
          if (el) { var w = el.querySelector('.branch-marker'); if (w) w.classList.toggle('is-active', m.branch.id === id); }
        });
      }
    }

    listEl.querySelectorAll('.m-loc').forEach(function (btn, index) {
      btn.addEventListener('click', function () {
        var id = btn.dataset.branch;
        locIndex = index;
        selectBranch(id, 'list');
        if (mapReady && markers) {
          var entry = markers.find(function (m) { return m.branch.id === id; });
          if (entry) { window._mMap.panTo([entry.branch.lat, entry.branch.lng]); entry.marker.openPopup(); }
        }
      });
    });

    var locButtons = Array.prototype.slice.call(listEl.querySelectorAll('.m-loc'));
    var locIndex = 0;
    var locPaused = false;
    function startLocCarousel() {
      if (locButtons.length < 2) return;
      setInterval(function () {
        if (locPaused || window.matchMedia('(min-width: 901px)').matches) return;
        locIndex = (locIndex + 1) % locButtons.length;
        var btn = locButtons[locIndex];
        selectBranch(btn.dataset.branch, 'auto');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }, 3600);
    }
    listEl.addEventListener('touchstart', function () { locPaused = true; }, { passive: true });
    listEl.addEventListener('touchend', function () { setTimeout(function () { locPaused = false; }, 2500); }, { passive: true });
    listEl.addEventListener('pointerenter', function () { locPaused = true; });
    listEl.addEventListener('pointerleave', function () { locPaused = false; });
    startLocCarousel();

    function buildMap() {
      if (mapReady || !mapEl || typeof L === 'undefined') return;
      // Only build when the container actually has a size (i.e. mobile/visible)
      if (!mapEl.offsetWidth) return;
      mapReady = true;

      var map = L.map(mapEl, { zoomControl: true, scrollWheelZoom: false, attributionControl: true });
      window._mMap = map;
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd', maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);
      map.fitBounds(L.latLngBounds(branches.map(function (b) { return [b.lat, b.lng]; })), { padding: [36, 36], maxZoom: 11 });

      markers = branches.map(function (b, i) {
        var icon = L.divIcon({
          className: '',
          html: '<div class="branch-marker' + (i === 0 ? ' is-active' : '') + '" data-branch="' + b.id + '"><div class="pin-pulse"></div><div class="pin-dot"></div></div>',
          iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -16]
        });
        var marker = L.marker([b.lat, b.lng], { icon: icon }).addTo(map);
        marker.bindPopup('<div class="pop-name">' + localize(b.name) + '</div><div class="pop-addr">' + localize(b.addr) + '</div>' +
          '<div class="pop-meta"><span><b>' + b.specialties + '</b> ' + specWord(b) + '</span><span><b>' + b.doctors + '</b> ' + docWord(b) + '</span></div>',
          { closeButton: true, autoPan: true, offset: [0, -4] });
        marker.on('click', function () { selectBranch(b.id, 'marker'); });
        return { branch: b, marker: marker };
      });

      setTimeout(function () { map.invalidateSize(); }, 200);
    }

    // Build now if visible; otherwise wait until the map scrolls into view / viewport resizes down
    buildMap();
    if (!mapReady && 'IntersectionObserver' in window && mapEl) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { buildMap(); if (mapReady) io.disconnect(); }
      });
      io.observe(mapEl);
    }
    window.addEventListener('resize', function () { if (!mapReady) buildMap(); else if (window._mMap) window._mMap.invalidateSize(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
