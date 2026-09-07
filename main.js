/* Axomyq portal — deliberately small. External file so the CSP can be
   script-src 'self' with no inline exception. Everything on the page
   works without this script; it only adds polish. */
(function () {
  'use strict';

  /* Logo: if logo.jpeg fails, hide the broken image so the wordmark stands alone. */
  function wireLogo() {
    var img = document.querySelector('.mark img');
    if (!img) return;
    var hide = function () { img.style.display = 'none'; };
    img.addEventListener('error', hide);
    if (img.complete && img.naturalWidth === 0) hide();
  }

  /* Mark the current page in the bottom tab bar when the server did not. */
  function markCurrent() {
    var path = location.pathname.replace(/\/index\.html$/, '/');
    document.querySelectorAll('.tabbar a, .nav a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path && !a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'page');
    });
  }

  /* FAQ: open the item matching the URL hash so deep links work. */
  function openHashDetails() {
    if (!location.hash) return;
    var el = document.querySelector(location.hash);
    if (el && el.tagName === 'DETAILS') el.open = true;
  }

  function init() { wireLogo(); markCurrent(); openHashDetails(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
