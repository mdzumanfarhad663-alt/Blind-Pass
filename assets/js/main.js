(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var bookBar = document.getElementById('book-bar');
  var hero = document.querySelector('.hero');

  /* Sticky header turns solid on scroll; mobile book bar appears after the hero. */
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-solid', y > 80);
    bookBar.classList.toggle('is-visible', y > hero.offsetHeight * 0.7);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Full-screen mobile menu: focus trap, Esc closes, focus returns to the toggle. */
  var menu = document.getElementById('mobile-menu');
  var openBtn = document.getElementById('menu-open');
  var closeBtn = document.getElementById('menu-close');

  function focusables() {
    return Array.prototype.slice.call(menu.querySelectorAll('a[href], button'));
  }

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

    if (e.key === 'Escape') {
      closeMenu(true);
      return;
    }

    if (e.key === 'Tab') {
      var items = focusables();
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

  window.matchMedia('(min-width: 960px)').addEventListener('change', function (e) {
    if (e.matches) closeMenu(false);
  });

  /* Fade-up on scroll, once per element. Grid items stagger by 80ms per batch.
     Reveal classes are removed afterwards so hover transitions stay at their own speed.
     CSS disables the effect for prefers-reduced-motion. */
  var animated = document.querySelectorAll('.reveal, .scale-in');
  var GRIDS = '.highlights, .rooms, .tiles, .tiers';

  function finish(el) {
    el.classList.remove('reveal', 'scale-in', 'is-in');
    el.style.transitionDelay = '';
  }

  if ('IntersectionObserver' in window) {
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
        setTimeout(function () { finish(el); }, delay + 650);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    animated.forEach(function (el) { observer.observe(el); });
  } else {
    animated.forEach(finish);
  }

  /* Rewards form: front-end only. Native validation runs before submit fires. */
  var form = document.getElementById('rewards-form');
  var success = document.getElementById('rewards-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.reset();
    success.hidden = false;
    success.focus();
  });
})();
