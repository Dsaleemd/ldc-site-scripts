// ============================================================
// LDC Homepage Animations — Lightweight scroll reveals,
// stat counters, FAQ toggles, review carousel
// ============================================================
(function () {
  'use strict';

  // Prevent double-mount
  if (window.__ldcHomepageAnimsMounted) return;
  window.__ldcHomepageAnimsMounted = true;

  // --- Scroll Reveal (IntersectionObserver) ---
  function initScrollReveal() {
    var elements = document.querySelectorAll('.ldc-hp-reveal, .ldc-hp-reveal-stagger');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Stat Counter Animation ---
  function initCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    var prefix = el.getAttribute('data-count-prefix') || '';
    var suffix = el.getAttribute('data-count-suffix') || '';
    var decimal = el.getAttribute('data-count-decimal') ? parseInt(el.getAttribute('data-count-decimal'), 10) : 0;
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic for smooth settle
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;

      if (decimal > 0) {
        el.textContent = prefix + current.toFixed(decimal) + suffix;
      } else {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // --- FAQ Accordion ---
  function initFAQ() {
    var items = document.querySelectorAll('.ldc-hp-faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector('.ldc-hp-faq-q');
      if (!btn) return;

      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all others
        items.forEach(function (other) {
          if (other !== item) other.classList.remove('open');
        });

        // Toggle current
        item.classList.toggle('open', !isOpen);
      });
    });
  }

  // --- Review Carousel Nav Dots ---
  function initReviewCarousel() {
    var scroll = document.querySelector('.ldc-hp-reviews-scroll');
    var dots = document.querySelectorAll('.ldc-hp-review-dot');
    if (!scroll || !dots.length) return;

    var cards = scroll.querySelectorAll('.ldc-hp-review-card');

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        if (cards[i]) {
          cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        }
      });
    });

    // Update active dot on scroll
    var scrollTimeout;
    scroll.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        var scrollLeft = scroll.scrollLeft;
        var cardWidth = cards[0] ? cards[0].offsetWidth + 20 : 340;
        var activeIndex = Math.round(scrollLeft / cardWidth);

        dots.forEach(function (d, j) {
          d.classList.toggle('active', j === activeIndex);
        });
      }, 50);
    }, { passive: true });
  }

  // --- Smooth Anchor Scrolling ---
  function initSmoothScroll() {
    document.querySelectorAll('.ldc-hp a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- Hero Image Preload ---
  function preloadHeroImage() {
    var heroImg = document.querySelector('.ldc-hp-hero-bg img');
    if (heroImg && heroImg.dataset.src) {
      heroImg.src = heroImg.dataset.src;
    }
  }

  // --- Initialize All ---
  function init() {
    preloadHeroImage();
    initScrollReveal();
    initCounters();
    initFAQ();
    initReviewCarousel();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
