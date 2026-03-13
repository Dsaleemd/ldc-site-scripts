// ============================================================
// LDC Homepage Animations
// Flecto-style scroll reveals, blob grow-in, card expand
// IIFE with mount guard to prevent duplicate init
// ============================================================
(function () {
  'use strict';

  if (window.__ldcHomepageAnimsMounted) return;
  window.__ldcHomepageAnimsMounted = true;

  // --- FOUC Prevention: reveal .ldc-hp once CSS + DOM are ready ---
  function revealPage() {
    var root = document.querySelector('.ldc-hp');
    if (root) {
      root.classList.add('ldc-hp-ready');
    }
  }

  // --- Scroll Reveal (IntersectionObserver) ---
  function initScrollReveal() {
    var selectors = [
      '.ldc-hp-reveal',
      '.ldc-hp-reveal-scale',
      '.ldc-hp-reveal-left',
      '.ldc-hp-reveal-right',
      '.ldc-hp-reveal-stagger'
    ];
    var elements = document.querySelectorAll(selectors.join(','));
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Flecto-style Blob Grow-In on Scroll ---
  function initBlobAnimations() {
    var blobs = document.querySelectorAll('.ldc-hp-blob');
    if (!blobs.length) return;

    // Hero blobs appear immediately on load
    var heroBlobs = document.querySelectorAll('.ldc-hp-blob--hero-1, .ldc-hp-blob--hero-2, .ldc-hp-blob--hero-3');
    heroBlobs.forEach(function (blob, i) {
      setTimeout(function () {
        blob.classList.add('blob-visible');
      }, 300 + (i * 200));
    });

    // Other blobs appear on scroll
    var scrollBlobs = document.querySelectorAll('.ldc-hp-blob:not([class*="hero"])');
    if (!scrollBlobs.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('blob-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '100px 0px 0px 0px'
    });

    scrollBlobs.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Flecto-style Card Grow on Scroll ---
  function initCardGrow() {
    var cards = document.querySelectorAll(
      '.ldc-hp-service-card, .ldc-hp-step, .ldc-hp-team-card, .ldc-hp-review-card, .ldc-hp-trust-item, .ldc-hp-faq-item, .ldc-hp-flipcard'
    );
    if (!cards.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger delay based on position among siblings
          var parent = entry.target.parentElement;
          var siblings = parent ? Array.prototype.slice.call(parent.children) : [];
          var index = siblings.indexOf(entry.target);
          var delay = Math.min(index * 100, 600);

          setTimeout(function () {
            entry.target.classList.add('card-grown');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Parallax Blobs on Scroll (subtle movement) ---
  function initBlobParallax() {
    var blobs = document.querySelectorAll('.ldc-hp-blob');
    if (!blobs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.pageYOffset;
          blobs.forEach(function (blob) {
            var rect = blob.getBoundingClientRect();
            var inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
              var speed = blob.classList.contains('ldc-hp-blob--hero-1') ? 0.03 :
                          blob.classList.contains('ldc-hp-blob--hero-2') ? -0.02 : 0.015;
              var y = scrollY * speed;
              blob.style.transform = blob.classList.contains('blob-visible')
                ? 'scale(1) translateY(' + y + 'px)'
                : '';
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
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
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
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

        items.forEach(function (other) {
          if (other !== item) other.classList.remove('open');
        });

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

  // --- Initialize All ---
  function init() {
    revealPage();
    initScrollReveal();
    initBlobAnimations();
    initCardGrow();
    initBlobParallax();
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
