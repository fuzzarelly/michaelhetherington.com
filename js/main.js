/* =============================================================
   Michael Hetherington: main.js
   ============================================================= */

(function () {
  'use strict';

  /* ── Mobile nav toggle ──────────────────────────────────────── */
  const hamburger = document.getElementById('nav-hamburger');
  const navMenu   = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close on nav link click (mobile UX)
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
        hamburger.focus();
      }
    });
  }

  /* ── Sticky nav shadow on scroll ───────────────────────────── */
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    function updateNavShadow() {
      siteNav.classList.toggle('scrolled', window.scrollY > 16);
    }
    window.addEventListener('scroll', updateNavShadow, { passive: true });
    updateNavShadow();
  }

  /* ── Active nav link ────────────────────────────────────────── */
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = (link.getAttribute('href') || '').replace(/\/$/, '');
    if (href && href !== '' && currentPath.startsWith(href)) {
      link.classList.add('is-active');
    }
  });

  /* ── YouTube thumbnails: maxres, then sd, then hq ──────────── */
  var THUMBS = ['maxresdefault', 'sddefault', 'hqdefault'];
  function nextThumb(img) {
    var i = Number(img.getAttribute('data-yt-try') || 0) + 1;
    if (i >= THUMBS.length) return;
    img.setAttribute('data-yt-try', i);
    img.src = 'https://i.ytimg.com/vi/' + img.getAttribute('data-yt-thumb') + '/' + THUMBS[i] + '.jpg';
  }
  function checkThumb(img) {
    // YouTube serves a 120px placeholder when a size does not exist
    if (img.complete && img.naturalWidth > 0 && img.naturalWidth < 200) nextThumb(img);
  }
  document.querySelectorAll('img[data-yt-thumb]').forEach(function (img) {
    img.addEventListener('error', function () { nextThumb(img); });
    img.addEventListener('load', function () { checkThumb(img); });
    checkThumb(img);
  });

  /* ── YouTube click-to-load (youtube-nocookie) ───────────────── */
  function playVideo(box, id, title) {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    iframe.title = title || 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    box.innerHTML = '';
    box.appendChild(iframe);
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-yt-play]');
    if (btn) {
      e.preventDefault();
      playVideo(btn.closest('.yt-embed'), btn.getAttribute('data-yt-play'), btn.getAttribute('data-yt-title'));
      return;
    }
    // a link with data-yt-target loads its video into that player instead of leaving the page
    var swap = e.target.closest('[data-yt-target]');
    if (swap) {
      var box = document.getElementById(swap.getAttribute('data-yt-target'));
      if (box) {
        e.preventDefault();
        playVideo(box, swap.getAttribute('data-yt-id'), swap.getAttribute('data-yt-title'));
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  /* ── Opt-in click tracking (GA4 via GTM-PN7X8BW) ───────────
     Pushes optin_click to the dataLayer. In GTM: Custom Event trigger "optin_click"
     -> GA4 Event tag with link_location and page_path from Data Layer Variables. */
  document.addEventListener('click', function (e) {
    try {
      var link = e.target.closest('[data-optin-location]');
      if (!link) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'optin_click', link_location: link.getAttribute('data-optin-location'), page_path: location.pathname });
    } catch (err) { /* never block the click */ }
  }, true);

  /* ── Dynamic footer year ────────────────────────────────────── */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── Smooth scroll for on-page anchors ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var navH = siteNav ? siteNav.offsetHeight : 0;
        var top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
