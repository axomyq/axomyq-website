/* Axomyq — site behaviour
   Kept in an external file so the CSP can use script-src 'self'
   with no 'unsafe-inline' exception. */
(function () {
  'use strict';

  /* ---- logo fallback (replaces the old inline onerror attribute) ---- */
  function wireLogo() {
    var img = document.querySelector('.mark img');
    if (!img) return;
    var showText = function () {
      img.style.display = 'none';
      var txt = img.nextElementSibling;
      if (txt) txt.style.display = 'block';
    };
    img.addEventListener('error', showText);
    // the image may already have failed before this script ran
    if (img.complete && img.naturalWidth === 0) showText();
  }

  /* ---- scroll reveal ---- */
  function wireReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduced) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(items, function (el, i) {
      el.style.transitionDelay = (Math.min(i, 4) * 70) + 'ms';
      io.observe(el);
    });
  }

  function init() { wireLogo(); wireReveal(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
