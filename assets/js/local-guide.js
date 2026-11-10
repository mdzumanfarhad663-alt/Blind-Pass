(function () {
  'use strict';

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Jump nav: active pill follows the section in view ---------- */
  var nav = document.getElementById('jump-nav');
  var scroller = document.getElementById('jump-scroller');
  var ink = document.getElementById('jump-ink');
  var pills = Array.prototype.slice.call(scroller.querySelectorAll('.jump-pill'));
  var sections = pills.map(function (p) { return document.querySelector(p.getAttribute('href')); });
  var visible = new Set();
  var active = null;

  function moveInk(pill) {
    ink.style.width = pill.offsetWidth + 'px';
    ink.style.transform = 'translateX(' + pill.offsetLeft + 'px)';
    ink.style.opacity = '1';
  }

  function activate(pill) {
    if (pill === active) return;
    if (active) active.removeAttribute('aria-current');
    active = pill;
    if (!pill) {
      ink.style.opacity = '0';
      return;
    }
    pill.setAttribute('aria-current', 'true');
    moveInk(pill);
    scroller.scrollTo({
      left: pill.offsetLeft - (scroller.clientWidth - pill.offsetWidth) / 2,
      behavior: reduced ? 'auto' : 'smooth'
    });
  }

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    });
    var current = sections.filter(function (s) { return visible.has(s); }).pop();
    if (current) activate(pills[sections.indexOf(current)]);
  }, { rootMargin: '-96px 0px -55% 0px' });
  sections.forEach(function (s) { spy.observe(s); });

  window.addEventListener('resize', function () { if (active) moveInk(active); });

  new IntersectionObserver(function (entries) {
    var e = entries[0];
    nav.classList.toggle('is-stuck', !e.isIntersecting && e.boundingClientRect.top < 0);
    if (e.isIntersecting && e.boundingClientRect.top > 0) activate(null);
  }).observe(document.getElementById('jump-sentinel'));

  /* ---------- Timeline line draws down with scroll ---------- */
  var timeline = document.getElementById('timeline');
  var line = document.getElementById('timeline-line');
  var ticking = false;

  function drawLine() {
    var r = timeline.getBoundingClientRect();
    var p = Math.max(0, Math.min(1, (window.innerHeight * 0.75 - r.top) / r.height));
    line.style.transform = 'scaleY(' + p.toFixed(3) + ')';
    ticking = false;
  }

  if (!reduced) {
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(drawLine); }
    }, { passive: true });
    drawLine();
  }

  /* ---------- Map: first tap restores color on touch screens ---------- */
  var unlock = document.getElementById('map-unlock');
  unlock.addEventListener('click', function () {
    document.getElementById('map-wrap').classList.add('is-active');
    unlock.remove();
  });
})();
