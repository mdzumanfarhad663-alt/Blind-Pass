(function () {
  'use strict';

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;

  if (reduced) return;

  /* ---------- Gift card tilt: follows the cursor, 8deg max ---------- */
  var MAX_TILT = 8;
  var stage = document.getElementById('gift-stage');
  var card = document.getElementById('gift-card');

  function clamp(n) { return Math.max(-1, Math.min(1, n)); }

  if (desktop) {
    stage.addEventListener('pointermove', function (e) {
      var r = stage.getBoundingClientRect();
      var x = clamp((e.clientX - r.left - r.width / 2) / (r.width / 2));
      var y = clamp((e.clientY - r.top - r.height / 2) / (r.height / 2));
      card.classList.add('is-tilting');
      card.style.setProperty('--ry', (x * MAX_TILT).toFixed(2) + 'deg');
      card.style.setProperty('--rx', (-y * MAX_TILT).toFixed(2) + 'deg');
      card.style.setProperty('--gx', ((x + 1) * 50).toFixed(1) + '%');
      card.style.setProperty('--gy', ((y + 1) * 50).toFixed(1) + '%');
    });

    stage.addEventListener('pointerleave', function () {
      card.classList.remove('is-tilting');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  }

  /* ---------- Step numerals: count up from 0 by sliding a digit strip ---------- */
  if (!('IntersectionObserver' in window)) return;

  var numerals = Array.prototype.slice.call(document.querySelectorAll('.step__num'));

  numerals.forEach(function (el) {
    var target = +el.textContent;
    var strip = document.createElement('span');
    strip.className = 'step__strip';
    strip.style.setProperty('--n', target);
    for (var i = 0; i <= target; i++) {
      var digit = document.createElement('span');
      digit.textContent = i;
      strip.appendChild(digit);
    }
    el.textContent = '';
    el.appendChild(strip);
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-counted');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  numerals.forEach(function (el) { observer.observe(el); });
})();
