(function () {
  'use strict';

  var BASE = 'https://hotels.cloudbeds.com/en/reservation/TorgMC?currency=usd';
  var IMG = 'assets/img/rooms/';
  var rooms = window.BP_ROOMS;
  var list = document.getElementById('room-list');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stripMode = matchMedia('(max-width: 767px)');

  function icon(name) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }

  /* ---------- Render ---------- */
  function chips(r) {
    var items = [];
    if (r.kitchenette) items.push('Kitchenette');
    if (r.pets === true) items.push('Pet friendly');
    if (r.pets === false) items.push('Not pet friendly');
    if (r.accessible) items.push('Accessible');
    if (r.jacuzzi) items.push('Jacuzzi tub');
    if (r.pullout) items.push('Pullout sofa');
    if (r.secondFloor) items.push('Second floor (no elevator)');
    return items.map(function (c) { return '<li class="chip scale-in">' + c + '</li>'; }).join('');
  }

  function gallery(r) {
    var n = r.photos.length;
    var imgs = r.photos.map(function (p, i) {
      return '<img class="gallery__img' + (i ? '' : ' is-active') + '" src="' + IMG + p.src + '" width="1500" height="1000" loading="lazy" decoding="async" draggable="false" alt="' + p.alt + '">';
    }).join('');
    var thumbs = r.photos.map(function (p, i) {
      return '<button class="gallery__thumb" type="button" data-index="' + i + '" aria-label="Show photo ' + (i + 1) + ' of ' + n + ', ' + r.name + '"' + (i ? '' : ' aria-current="true"') + '><img src="' + IMG + p.src + '" width="96" height="64" loading="lazy" decoding="async" alt=""></button>';
    }).join('');
    var dots = r.photos.map(function (p, i) {
      return '<button class="gallery__dot" type="button" data-index="' + i + '" aria-label="Show photo ' + (i + 1) + ' of ' + n + ', ' + r.name + '"' + (i ? '' : ' aria-current="true"') + '><span></span></button>';
    }).join('');
    return '<div class="gallery">' +
      '<div class="gallery__stage clip"><div class="gallery__track" tabindex="0" role="group" aria-roledescription="carousel" aria-label="Photos of ' + r.name + '. Use the left and right arrow keys.">' + imgs + '</div></div>' +
      '<div class="gallery__thumbs">' + thumbs + '</div>' +
      '<div class="gallery__dots">' + dots + '</div>' +
      '</div>';
  }

  function row(r) {
    var meta = '<li>' + icon('bed-double') + r.beds + '</li><li>' + icon('users') + 'Sleeps ' + r.sleeps + '</li>';
    if (r.bathroom) meta += '<li>' + icon('bath') + r.bathroom + '</li>';
    return '<article class="room-row" id="' + r.slug + '">' + gallery(r) +
      '<div class="room-row__body">' +
      '<p class="room-row__eyebrow reveal">' + r.location + '</p>' +
      '<h2 class="split">' + r.name + '</h2>' +
      '<ul class="room-row__meta reveal">' + meta + '</ul>' +
      '<ul class="chips" data-stagger="40">' + chips(r) + '</ul>' +
      '<p class="room-row__desc reveal" id="desc-' + r.slug + '">' + r.description + '</p>' +
      '<button class="read-more" type="button" aria-expanded="false" aria-controls="desc-' + r.slug + '" hidden>Read more</button>' +
      '<div class="room-row__actions reveal">' +
      '<a class="btn btn--primary" href="' + BASE + '#rid=' + r.rid + '" target="_blank" rel="noopener" aria-label="Book ' + r.name + ', opens in a new tab">Book This Room</a>' +
      '<a class="text-link" href="tel:+17276055352">Call or Text (727) 605-5352</a>' +
      '</div></div></article>';
  }

  list.innerHTML = rooms.map(row).join('');

  var suite = document.getElementById('queen-studio-suite');
  suite.insertBefore(document.createComment(' [CONFIRM] Queen Studio Suite pet policy. [CONFIRM PHOTOS] Only low-resolution Cloudbeds photos exist for this room. '), suite.firstChild);

  /* ---------- Galleries: thumbnails on larger screens, swipe strip on phones ---------- */
  document.querySelectorAll('.gallery').forEach(function (g) {
    var track = g.querySelector('.gallery__track');
    var imgs = Array.prototype.slice.call(g.querySelectorAll('.gallery__img'));
    var controls = Array.prototype.slice.call(g.querySelectorAll('[data-index]'));
    var index = 0;

    function show(i, moveStrip) {
      index = Math.max(0, Math.min(imgs.length - 1, i));
      imgs.forEach(function (img, n) { img.classList.toggle('is-active', n === index); });
      controls.forEach(function (c) {
        if (+c.dataset.index === index) c.setAttribute('aria-current', 'true');
        else c.removeAttribute('aria-current');
      });
      if (moveStrip && stripMode.matches) {
        track.scrollTo({ left: index * track.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
      }
    }

    controls.forEach(function (c) {
      c.addEventListener('click', function () { show(+c.dataset.index, true); });
    });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1, true); }
    });

    var settle;
    track.addEventListener('scroll', function () {
      if (!stripMode.matches) return;
      clearTimeout(settle);
      settle = setTimeout(function () { show(Math.round(track.scrollLeft / track.clientWidth), false); }, 60);
    }, { passive: true });

    stripMode.addEventListener('change', function () {
      track.scrollLeft = stripMode.matches ? index * track.clientWidth : 0;
    });
  });

  /* ---------- Phones: descriptions collapse to 3 lines with a Read more toggle ---------- */
  var descriptions = Array.prototype.slice.call(document.querySelectorAll('.room-row__desc'));

  function measureDescriptions() {
    descriptions.forEach(function (desc) {
      var button = desc.nextElementSibling;
      if (desc.offsetParent === null || button.getAttribute('aria-expanded') === 'true') return;
      desc.classList.add('is-clamped');
      button.hidden = !stripMode.matches || desc.scrollHeight <= desc.clientHeight + 1;
    });
  }

  descriptions.forEach(function (desc) {
    var button = desc.nextElementSibling;
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.textContent = open ? 'Read less' : 'Read more';
      desc.classList.toggle('is-clamped', !open);
    });
  });

  measureDescriptions();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureDescriptions);
  window.addEventListener('resize', measureDescriptions);

  /* ---------- Filter with FLIP layout animation ---------- */
  var RULES = {
    all: function () { return true; },
    kitchenette: function (r) { return r.kitchenette; },
    suites: function (r) { return r.sleeps >= 3; },
    pets: function (r) { return r.pets === true; },
    accessible: function (r) { return r.accessible; }
  };

  var rows = rooms.map(function (r) { return { data: r, el: document.getElementById(r.slug) }; });
  var pills = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var count = document.getElementById('filter-count');
  var sentinel = document.getElementById('filter-sentinel');
  var bar = document.getElementById('filter-bar');
  var current = 'all';
  var run = 0;

  function setCount(n) {
    count.textContent = 'Showing ' + n + (n === 1 ? ' room' : ' rooms');
  }

  function docTop(el) { return el.getBoundingClientRect().top + window.scrollY; }

  function jumpToList() {
    var y = docTop(sentinel);
    if (window.scrollY <= y) return;
    if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo({ top: y, behavior: 'instant' });
  }

  function applyFilter(key) {
    if (key === current) return;
    current = key;
    var id = ++run;
    var test = RULES[key];

    pills.forEach(function (p) { p.setAttribute('aria-pressed', String(p.dataset.filter === key)); });
    setCount(rows.filter(function (r) { return test(r.data); }).length);

    function commit() {
      rows.forEach(function (r) { r.el.hidden = !test(r.data); });
    }

    if (reduced || !Element.prototype.animate) {
      commit();
      jumpToList();
      return;
    }

    rows.forEach(function (r) { r.el.getAnimations().forEach(function (a) { a.cancel(); }); });
    var visible = rows.filter(function (r) { return !r.el.hidden; });
    var before = new Map(visible.map(function (r) { return [r.el, docTop(r.el)]; }));
    var leaving = visible.filter(function (r) { return !test(r.data); });

    Promise.all(leaving.map(function (r) {
      return r.el.animate(
        [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0.97)' }],
        { duration: 200, easing: 'ease-out', fill: 'forwards' }
      ).finished.catch(function () {});
    })).then(function () {
      if (id !== run) return;
      leaving.forEach(function (r) { r.el.getAnimations().forEach(function (a) { a.cancel(); }); });
      commit();
      jumpToList();

      rows.forEach(function (r) {
        if (r.el.hidden) return;
        if (before.has(r.el)) {
          var delta = before.get(r.el) - docTop(r.el);
          if (!delta) return;
          /* Long moves are capped so rows glide rather than fly in from far away. */
          var dy = Math.sign(delta) * Math.min(Math.abs(delta), 140);
          r.el.animate(
            [{ transform: 'translateY(' + dy + 'px)' }, { transform: 'none' }],
            { duration: 300, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }
          );
        } else {
          r.el.animate(
            [{ opacity: 0, transform: 'scale(0.97)' }, { opacity: 1, transform: 'scale(1)' }],
            { duration: 200, easing: 'ease-out' }
          );
        }
      });
    });
  }

  pills.forEach(function (p) {
    p.addEventListener('click', function () {
      applyFilter(p.dataset.filter);
      p.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  setCount(rows.length);

  var petButton = document.getElementById('filter-pets');
  petButton.addEventListener('click', function () {
    applyFilter('pets');
    var y = docTop(sentinel);
    if (window.__lenis) window.__lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    document.querySelector('[data-filter="pets"]').focus({ preventScroll: true });
  });

  /* ---------- Sticky filter bar shadow ---------- */
  new IntersectionObserver(function (entries) {
    bar.classList.toggle('is-stuck', !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0);
  }).observe(sentinel);
})();
