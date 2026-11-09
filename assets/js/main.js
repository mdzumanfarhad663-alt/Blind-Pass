(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
  var EASE_MS = 950;

  /* ---------- Header and mobile book bar ---------- */
  var header = $('#site-header');
  var bookBar = $('#book-bar');
  var hero = $('.hero');

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-solid', y > 80);
    bookBar.classList.toggle('is-visible', y > hero.offsetHeight * 0.7);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu: focus trap, Esc closes, focus returns ---------- */
  var menu = $('#mobile-menu');
  var openBtn = $('#menu-open');
  var closeBtn = $('#menu-close');

  function openMenu() {
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
    openBtn.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  }

  function closeMenu(returnFocus) {
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    openBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) openBtn.focus();
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', function () { closeMenu(true); });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a[href]')) closeMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') { closeMenu(true); return; }
    if (e.key === 'Tab') {
      var items = $$('a[href], button', menu);
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  matchMedia('(min-width: 960px)').addEventListener('change', function (e) {
    if (e.matches) closeMenu(false);
  });

  /* ---------- Reveals: masked lines, clip-path images, fade-up, scale-in ---------- */
  function splitLines(el) {
    var text = el.textContent.trim();
    el.dataset.text = text;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    var words = text.split(/\s+/).map(function (word, i) {
      var span = document.createElement('span');
      span.textContent = word;
      if (i) el.appendChild(document.createTextNode(' '));
      el.appendChild(span);
      return span;
    });

    var lines = [];
    var top = null;
    words.forEach(function (span) {
      if (span.offsetTop !== top) { lines.push([]); top = span.offsetTop; }
      lines[lines.length - 1].push(span.textContent);
    });

    el.textContent = '';
    lines.forEach(function (line, i) {
      var outer = document.createElement('span');
      var inner = document.createElement('span');
      outer.className = 'ln';
      outer.setAttribute('aria-hidden', 'true');
      inner.className = 'ln__in';
      inner.style.transitionDelay = i * 90 + 'ms';
      inner.textContent = line.join(' ');
      outer.appendChild(inner);
      el.appendChild(outer);
      el.appendChild(document.createTextNode(' '));
    });
  }

  var GRIDS = '.bento, .tiers, .pills';

  function finish(el) {
    if (el.dataset.text) {
      el.textContent = el.dataset.text;
      el.removeAttribute('aria-label');
      delete el.dataset.text;
    }
    el.classList.remove('reveal', 'scale-in', 'clip', 'split', 'is-in');
    el.style.transitionDelay = '';
  }

  function countUp(el) {
    var target = +el.dataset.count;
    var start = performance.now();
    (function tick(now) {
      var t = Math.min((now - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + '%';
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  function initReveals() {
    var counts = $$('[data-count]');

    if (reduced || !('IntersectionObserver' in window)) {
      $$('.reveal, .scale-in, .clip, .split').forEach(finish);
      return;
    }

    $$('.split').forEach(splitLines);

    var observer = new IntersectionObserver(function (entries) {
      var batch = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = 0;
        if (el.parentElement.matches(GRIDS)) {
          delay = batch * 80;
          batch += 1;
        }
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('is-in');
        observer.unobserve(el);
        setTimeout(function () { finish(el); }, delay + EASE_MS + 250);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal, .scale-in, .clip, .split').forEach(function (el) { observer.observe(el); });

    counts.forEach(function (el) { el.textContent = '0%'; });
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counts.forEach(function (el) { countObserver.observe(el); });
  }

  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(initReveals);

  /* ---------- Parallax on feature photos (desktop only, 40px max) ---------- */
  var parallax = desktop && !reduced ? $$('[data-parallax]') : [];
  var ticking = false;

  function drawParallax() {
    var vh = window.innerHeight;
    parallax.forEach(function (img) {
      var r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      img.style.transform = 'translate3d(0,' + (Math.max(-1, Math.min(1, p)) * 40).toFixed(1) + 'px,0)';
    });
    ticking = false;
  }

  if (parallax.length) {
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(drawParallax); }
    }, { passive: true });
    drawParallax();
  }

  /* ---------- Rooms carousel: snap, arrows, keys, mouse drag, progress ---------- */
  var track = $('#rooms-carousel');
  var prev = $('#rooms-prev');
  var next = $('#rooms-next');
  var bar = $('#rooms-progress');
  var scrollMode = reduced ? 'auto' : 'smooth';

  function stepSize() {
    var cards = $$('.room', track);
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }

  function move(direction) {
    track.scrollBy({ left: direction * stepSize(), behavior: scrollMode });
  }

  function updateCarousel() {
    var max = track.scrollWidth - track.clientWidth;
    var share = track.clientWidth / track.scrollWidth;
    var done = max > 0 ? track.scrollLeft / max : 1;
    bar.style.transform = 'scaleX(' + (share + (1 - share) * done).toFixed(4) + ')';
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
  }

  prev.addEventListener('click', function () { move(-1); });
  next.addEventListener('click', function () { move(1); });
  track.addEventListener('scroll', updateCarousel, { passive: true });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();

  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
  });

  var drag = null;
  var dragged = false;

  track.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = { x: e.clientX, left: track.scrollLeft, id: e.pointerId };
    dragged = false;
  });

  track.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    if (!dragged && Math.abs(dx) > 5) {
      dragged = true;
      track.classList.add('is-dragging');
      track.setPointerCapture(drag.id);
    }
    if (dragged) track.scrollLeft = drag.left - dx;
  });

  function endDrag() {
    if (!drag) return;
    drag = null;
    if (!dragged) return;
    var step = stepSize();
    track.scrollTo({ left: Math.round(track.scrollLeft / step) * step, behavior: scrollMode });
    setTimeout(function () { track.classList.remove('is-dragging'); }, 400);
  }
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  track.addEventListener('click', function (e) {
    if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
  }, true);

  /* ---------- Magnetic buttons (desktop only, 6px max) ---------- */
  if (desktop && !reduced) {
    $$('.btn').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.translate = (x * 6).toFixed(1) + 'px ' + (y * 6).toFixed(1) + 'px';
      });
      btn.addEventListener('pointerleave', function () { btn.style.translate = ''; });
    });
  }

  /* ---------- Lenis smooth scrolling (desktop only) ---------- */
  if (desktop && !reduced) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lenis@1.3.11/dist/lenis.min.js';
    script.onload = function () {
      var lenis = new window.Lenis({ lerp: 0.1 });
      window.__lenis = lenis;
      (function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      })(performance.now());

      document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href^="#"], a[href^="/#"]');
        if (!link || link.classList.contains('skip-link')) return;
        var target = $(link.getAttribute('href').replace('/', ''));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target === hero ? 0 : target, { offset: target === hero ? 0 : -header.offsetHeight });
      });
    };
    document.head.appendChild(script);
  }

  /* ---------- Rewards form: front-end only, confetti on success ---------- */
  function confetti(x, y) {
    var c = document.createElement('canvas');
    var g = c.getContext('2d');
    var colors = ['#F08E80', '#FDF0E6', '#B87333', '#C0C0C0', '#D4AF37'];
    var bits = [];
    var frame = 0;
    c.className = 'confetti';
    c.width = innerWidth;
    c.height = innerHeight;
    document.body.appendChild(c);
    for (var i = 0; i < 70; i++) {
      bits.push({ x: x, y: y, vx: (Math.random() - 0.5) * 13, vy: -Math.random() * 12 - 4, s: 5 + Math.random() * 5, r: Math.random() * 6, c: colors[i % 5] });
    }
    (function draw() {
      g.clearRect(0, 0, c.width, c.height);
      bits.forEach(function (b) {
        b.vy += 0.35;
        b.x += b.vx;
        b.y += b.vy;
        b.r += 0.2;
        g.save();
        g.translate(b.x, b.y);
        g.rotate(b.r);
        g.fillStyle = b.c;
        g.fillRect(-b.s / 2, -b.s / 2, b.s, b.s * 0.6);
        g.restore();
      });
      if (++frame < 90) requestAnimationFrame(draw); else c.remove();
    })();
  }

  var form = $('#rewards-form');
  var success = $('#rewards-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.reset();
    success.hidden = false;
    success.focus({ preventScroll: true });
    if (!reduced) {
      var r = form.querySelector('button').getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top);
    }
  });
})();
