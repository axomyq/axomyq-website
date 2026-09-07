/* Axomyq — external so the CSP stays script-src 'self'.
   Everything works without this file; it only adds menu, reveal and header shadow. */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function menu() {
    var btn = document.getElementById('burger'), panel = document.getElementById('menu');
    if (!btn || !panel) return;
    function set(open) {
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.documentElement.style.overflow = open ? 'hidden' : '';
      if (open) { var a = panel.querySelector('a'); if (a) a.focus(); }
    }
    btn.addEventListener('click', function () { set(panel.hidden); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) { set(false); btn.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 940 && !panel.hidden) set(false);
    });
  }

  function headShadow() {
    var head = document.getElementById('head');
    if (!head) return;
    var on = false;
    function check() {
      var should = window.pageYOffset > 8;
      if (should !== on) { on = should; head.classList.toggle('scrolled', on); }
    }
    check();
    window.addEventListener('scroll', check, { passive: true });
  }

  function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  function logo() {
    Array.prototype.forEach.call(document.querySelectorAll('.mark img, .foot-brand img'), function (img) {
      var hide = function () { img.style.display = 'none'; };
      img.addEventListener('error', hide);
      if (img.complete && img.naturalWidth === 0) hide();
    });
  }

  function openHash() {
    if (!location.hash) return;
    var el = document.querySelector(location.hash);
    if (el && el.tagName === 'DETAILS') el.open = true;
  }

  function init() { menu(); headShadow(); reveal(); logo(); openHash(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
