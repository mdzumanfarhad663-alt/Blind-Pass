(function () {
  'use strict';

  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Copy buttons and toast ---------- */
  var toast = document.getElementById('toast');
  var toastTimer;

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-shown');
      toast.textContent = '';
    }, 1800);
  }

  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    area.remove();
    return ok;
  }

  function copied(btn) {
    btn.classList.add('is-copied');
    setTimeout(function () { btn.classList.remove('is-copied'); }, 1800);
    showToast('Copied');
  }

  $$('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.dataset.copy;
      function fallback() {
        if (fallbackCopy(text)) copied(btn); else showToast('Copy failed');
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { copied(btn); }, fallback);
      } else {
        fallback();
      }
    });
  });

  /* ---------- Tabs: arrow keys, sliding indicator, content crossfade ---------- */
  var tablist = document.getElementById('form-tablist');
  var tabs = $$('[role="tab"]', tablist);
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
  var wrap = document.getElementById('form-panels');
  var active = 0;
  var endTransition = null;

  panels[1].hidden = true;

  function select(index, moveFocus) {
    if (moveFocus) tabs[index].focus();
    if (index === active) return;
    if (endTransition) endTransition();

    var from = panels[active];
    var to = panels[index];
    active = index;

    tabs.forEach(function (t, i) {
      t.setAttribute('aria-selected', i === index ? 'true' : 'false');
      t.tabIndex = i === index ? 0 : -1;
    });
    tablist.style.setProperty('--active', index);

    if (reduced || !wrap.animate) {
      from.hidden = true;
      to.hidden = false;
      return;
    }

    var startHeight = wrap.offsetHeight;
    wrap.style.overflow = 'hidden';
    from.style.position = 'absolute';
    from.style.inset = '4px 4px auto';
    to.hidden = false;
    var endHeight = wrap.offsetHeight;

    var running = [
      wrap.animate([{ height: startHeight + 'px' }, { height: endHeight + 'px' }], { duration: 380, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }),
      from.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: 'ease-out', fill: 'both' }),
      to.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, delay: 90, easing: 'ease-out', fill: 'backwards' })
    ];

    endTransition = function () {
      endTransition = null;
      running.forEach(function (a) { a.cancel(); });
      from.hidden = true;
      from.style.position = '';
      from.style.inset = '';
      wrap.style.overflow = '';
    };
    running[0].onfinish = function () { if (endTransition) endTransition(); };
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(i, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      select(next, true);
    });
  });

  /* ---------- Forms: front-end only, nothing is sent ---------- */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var MAX_ROOMS = 25;
  var REQUIRED = {
    full_name: 'Please enter your full name.',
    email: 'Please enter your email address.',
    phone: 'Please enter your phone number.',
    message: 'Please enter a message.',
    arrival_date: 'Please choose an arrival date.',
    departure_date: 'Please choose a departure date.',
    rooms: 'Please enter the number of rooms.',
    guests: 'Please enter the number of guests.'
  };

  function today() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function isCount(v) { return /^\d+$/.test(v) && +v >= 1; }

  function errorFor(el) {
    var v = el.value.trim();
    if (!v) return el.required ? REQUIRED[el.name] : '';
    if (el.name === 'email' && !EMAIL.test(v)) return 'Please enter a valid email address.';
    if (el.name === 'phone' && v.replace(/\D/g, '').length < 10) return 'Please enter a valid phone number.';
    if (el.name === 'arrival_date' && v < today()) return 'Arrival date cannot be in the past.';
    if (el.name === 'departure_date') {
      var arrival = el.form.elements.arrival_date.value;
      if (arrival && v <= arrival) return 'Departure date must be after the arrival date.';
    }
    if (el.name === 'rooms' && (!isCount(v) || +v > MAX_ROOMS)) return 'Please enter a number from 1 to ' + MAX_ROOMS + '.';
    if (el.name === 'guests' && !isCount(v)) return 'Please enter at least 1 guest.';
    return '';
  }

  function validate(el) {
    var message = errorFor(el);
    var field = el.closest('.ff');
    var error = field.querySelector('.ff__error');
    field.classList.toggle('is-invalid', !!message);
    if (message) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
    if (error) {
      error.textContent = message;
      error.hidden = !message;
    }
    return !message;
  }

  function showSuccess(form) {
    var card = form.parentElement.querySelector('.success');
    form.hidden = true;
    card.hidden = false;
    card.focus({ preventScroll: true });
    var top = card.getBoundingClientRect().top;
    if (top < 0 || top > innerHeight - 200) {
      if (window.__lenis) window.__lenis.scrollTo(card, { offset: -160 });
      else card.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
    }
  }

  $$('.contact-form').forEach(function (form) {
    var fields = $$('.ff input, .ff textarea', form);
    var button = form.querySelector('button[type="submit"]');

    form.noValidate = true;

    fields.forEach(function (el) {
      el.addEventListener('blur', function () {
        if (el.value.trim() || el.dataset.touched) validate(el);
        el.dataset.touched = '1';
      });
      el.addEventListener('input', function () {
        if (el.getAttribute('aria-invalid')) validate(el);
      });
    });

    if (form.elements.arrival_date) {
      var arrival = form.elements.arrival_date;
      var departure = form.elements.departure_date;
      arrival.min = today();
      departure.min = today();
      arrival.addEventListener('change', function () {
        departure.min = arrival.value || today();
        if (departure.value) validate(departure);
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (button.disabled) return;

      /* Honeypot filled: act as if it worked and do nothing else. */
      if (form.elements.website.value) {
        showSuccess(form);
        return;
      }

      var invalid = fields.filter(function (el) { return !validate(el); });
      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      button.disabled = true;
      button.classList.add('is-loading');
      button.setAttribute('aria-busy', 'true');
      setTimeout(function () { showSuccess(form); }, 1100);
    });
  });

  /* ---------- Map: first tap restores color on touch screens ---------- */
  var unlock = document.getElementById('map-unlock');
  unlock.addEventListener('click', function () {
    document.getElementById('map-wrap').classList.add('is-active');
    unlock.remove();
  });
})();
