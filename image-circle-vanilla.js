/**
 * LDC Image Circle Animation — Vanilla JS
 * Recreates the React/Framer Motion IntroAnimation component
 * Phases: scatter → line → circle → bottom-arc (scroll-driven morph)
 * Features: spring physics, virtual scroll, mouse parallax, touch, 3D flip
 *
 * USAGE: Call ldcImageCircle.init(containerEl, images) where images is an array of
 *        { src, alt, label, desc, href } objects. Easy to swap images by editing the array.
 */
(function () {
  "use strict";

  // ======== CONFIGURATION — EDIT IMAGES HERE ========
  var DEFAULT_IMAGES = [
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/41f4dc09-2ac5-447f-aa62-f2ba64d0a621/Squoosh+DSC01011.jpg", alt: "Our Practice",      label: "About Us",          desc: "16+ years of exceptional dental care", href: "/about-us" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/21cace94-e8c1-4af5-aa27-171c4ceb3586/ChatGPT+Image+Apr+14%2C+2025%2C+10_59_49+AM.jpg", alt: "Invisalign", label: "Invisalign",        desc: "Straighten teeth with clear aligners", href: "/treatment/invisalign" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/965a4832-b792-45db-ae88-868ffbc82c8b/31.png+from+Squoosh.webp", alt: "Dr Grei Muskaj",   label: "Meet the Team",     desc: "Experienced, friendly dentists",       href: "/about-us" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/1721923595490-S0GC96LO7JAFN4OBIC3H/unsplash-image-s5TU52ZjaFA.jpg", alt: "Veneers smile", label: "Porcelain Veneers", desc: "Transform your smile with veneers",     href: "/porcelain-veneers" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/aeaf68ca-84e7-477e-a100-deb13e3eed21/37.png+from+Squoosh.webp", alt: "Composite bonding", label: "Composite Bonding", desc: "Fix chips, gaps, or uneven teeth",     href: "/cosmetic-bonding" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/eec00740-cc9f-4ebd-bee1-6efdca032614/Untitled+Design+from+Canva+%282%29.jpg", alt: "Teeth whitening", label: "Teeth Whitening",  desc: "Brighten your smile safely",           href: "/treatment/teeth-whitening" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/41f4dc09-2ac5-447f-aa62-f2ba64d0a621/Squoosh+DSC01011.jpg", alt: "Dental implants",    label: "Dental Implants",   desc: "Permanent tooth replacement",          href: "/treatment/implants" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/21cace94-e8c1-4af5-aa27-171c4ceb3586/ChatGPT+Image+Apr+14%2C+2025%2C+10_59_49+AM.jpg", alt: "Hygiene clean", label: "Hygiene & Polish",  desc: "Professional dental cleaning",         href: "/hygiene" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/965a4832-b792-45db-ae88-868ffbc82c8b/31.png+from+Squoosh.webp", alt: "Emergency dentist", label: "Emergency Care",    desc: "Same-day urgent appointments",         href: "/emergency-dentist" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/1721923595490-S0GC96LO7JAFN4OBIC3H/unsplash-image-s5TU52ZjaFA.jpg", alt: "General dentistry", label: "General Dentistry", desc: "Comprehensive dental check-ups",       href: "/general-dentistry" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/aeaf68ca-84e7-477e-a100-deb13e3eed21/37.png+from+Squoosh.webp", alt: "Smile makeover",   label: "Smile Makeover",    desc: "Complete smile transformation",        href: "/smile-gallery" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/eec00740-cc9f-4ebd-bee1-6efdca032614/Untitled+Design+from+Canva+%282%29.jpg", alt: "Cosmetic dentistry", label: "Cosmetic Dentistry", desc: "Look and feel your best",            href: "/cosmetic-dentist" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/41f4dc09-2ac5-447f-aa62-f2ba64d0a621/Squoosh+DSC01011.jpg", alt: "Root canal",          label: "Root Canal",        desc: "Pain-free endodontic treatment",       href: "/root-canal" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/21cace94-e8c1-4af5-aa27-171c4ceb3586/ChatGPT+Image+Apr+14%2C+2025%2C+10_59_49+AM.jpg", alt: "Crowns and bridges", label: "Crowns & Bridges", desc: "Restore damaged teeth beautifully",    href: "/crowns-bridges" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/965a4832-b792-45db-ae88-868ffbc82c8b/31.png+from+Squoosh.webp", alt: "Children dentist",  label: "Children's Dentist", desc: "Gentle care for little smiles",        href: "/childrens-dentist" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/1721923595490-S0GC96LO7JAFN4OBIC3H/unsplash-image-s5TU52ZjaFA.jpg", alt: "Orthodontics", label: "Orthodontics",      desc: "Braces and alignment solutions",       href: "/orthodontics" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/aeaf68ca-84e7-477e-a100-deb13e3eed21/37.png+from+Squoosh.webp", alt: "Dental finance",    label: "0% Finance",        desc: "Spread the cost interest-free",        href: "/dental-membersip" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/eec00740-cc9f-4ebd-bee1-6efdca032614/Untitled+Design+from+Canva+%282%29.jpg", alt: "Dental anxiety", label: "Nervous Patients",  desc: "Relaxed, judgement-free dentistry",    href: "/nervous-patients" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/41f4dc09-2ac5-447f-aa62-f2ba64d0a621/Squoosh+DSC01011.jpg", alt: "Night guards",         label: "Night Guards",      desc: "Protect your teeth while you sleep",   href: "/night-guards" },
    { src: "https://images.squarespace-cdn.com/content/v1/5d7bafb2d4f5e4735f21b5cc/21cace94-e8c1-4af5-aa27-171c4ceb3586/ChatGPT+Image+Apr+14%2C+2025%2C+10_59_49+AM.jpg", alt: "Facial aesthetics", label: "Facial Aesthetics", desc: "Non-surgical rejuvenation",           href: "/facial-aesthetics" }
  ];

  // ======== CONSTANTS ========
  var IMG_WIDTH = 60;
  var IMG_HEIGHT = 85;
  var MAX_SCROLL = 3000;
  var TOTAL_IMAGES = 20;

  // ======== SPRING PHYSICS ========
  function createSpring(stiffness, damping) {
    var value = 0;
    var velocity = 0;
    var target = 0;
    return {
      set: function (t) { target = t; },
      get: function () { return value; },
      getTarget: function () { return target; },
      tick: function (dt) {
        // Clamped dt to avoid instability
        dt = Math.min(dt, 0.064);
        var force = -stiffness * (value - target);
        var dampForce = -damping * velocity;
        velocity += (force + dampForce) * dt;
        value += velocity * dt;
        return Math.abs(value - target) > 0.001 || Math.abs(velocity) > 0.01;
      },
      reset: function (v) { value = v; velocity = 0; target = v; }
    };
  }

  // ======== LERP ========
  function lerp(a, b, t) { return a * (1 - t) + b * t; }

  // ======== CARD SPRING (per-card x/y/rotation/scale/opacity) ========
  function createCardSpring(stiffness, damping) {
    return {
      x: createSpring(stiffness, damping),
      y: createSpring(stiffness, damping),
      rotation: createSpring(stiffness, damping),
      scale: createSpring(stiffness, damping),
      opacity: createSpring(stiffness, damping)
    };
  }

  // ======== DOM CREATION ========
  function createCardElement(img, index) {
    var card = document.createElement("div");
    card.className = "ldc-ic-card";
    card.style.cssText =
      "position:absolute;width:" + IMG_WIDTH + "px;height:" + IMG_HEIGHT +
      "px;transform-style:preserve-3d;perspective:1000px;cursor:pointer;will-change:transform,opacity;";

    var inner = document.createElement("div");
    inner.className = "ldc-ic-card-inner";
    inner.style.cssText =
      "position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 0.6s cubic-bezier(.19,1,.22,1);";

    // Front
    var front = document.createElement("div");
    front.className = "ldc-ic-card-front";
    front.style.cssText =
      "position:absolute;inset:0;overflow:hidden;border-radius:12px;backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 4px 20px rgba(26,60,52,0.15);";
    var imgEl = document.createElement("img");
    imgEl.src = img.src;
    imgEl.alt = img.alt || "card-" + index;
    imgEl.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
    imgEl.loading = "lazy";
    var overlay = document.createElement("div");
    overlay.style.cssText =
      "position:absolute;inset:0;background:rgba(0,0,0,0.1);transition:background .3s ease;";
    front.appendChild(imgEl);
    front.appendChild(overlay);

    // Back
    var back = document.createElement("div");
    back.className = "ldc-ic-card-back";
    back.style.cssText =
      "position:absolute;inset:0;overflow:hidden;border-radius:12px;backface-visibility:hidden;-webkit-backface-visibility:hidden;" +
      "transform:rotateY(180deg);background:var(--dark,#1a3c34);display:flex;flex-direction:column;align-items:center;justify-content:center;" +
      "padding:0.5rem;text-align:center;box-shadow:0 4px 20px rgba(26,60,52,0.2);border:2px solid var(--accent,#0fbcb0);";
    var backLabel = document.createElement("p");
    backLabel.style.cssText = "font-size:7px;font-weight:700;color:var(--accent,#0fbcb0);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:2px;font-family:var(--font,sans-serif);";
    backLabel.textContent = img.label || "View";
    var backDesc = document.createElement("p");
    backDesc.style.cssText = "font-size:8px;font-weight:500;color:#fff;line-height:1.3;margin-bottom:4px;font-family:var(--font,sans-serif);";
    backDesc.textContent = img.desc || "Details";
    back.appendChild(backLabel);
    back.appendChild(backDesc);

    if (img.href) {
      var backLink = document.createElement("a");
      backLink.href = img.href;
      backLink.style.cssText = "font-size:7px;color:var(--accent,#0fbcb0);text-decoration:none;font-weight:600;font-family:var(--font,sans-serif);";
      backLink.textContent = "Learn More →";
      back.appendChild(backLink);
    }

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    // Hover flip
    card.addEventListener("mouseenter", function () {
      inner.style.transform = "rotateY(180deg)";
      overlay.style.background = "transparent";
    });
    card.addEventListener("mouseleave", function () {
      inner.style.transform = "rotateY(0deg)";
      overlay.style.background = "rgba(0,0,0,0.1)";
    });

    return card;
  }

  // ======== INTRO TEXT ELEMENTS ========
  function createIntroText(container) {
    var wrap = document.createElement("div");
    wrap.style.cssText =
      "position:absolute;z-index:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;" +
      "pointer-events:none;top:50%;left:50%;transform:translate(-50%,-50%);transition:opacity 0.8s ease,filter 0.8s ease;";
    var h1 = document.createElement("h1");
    h1.style.cssText =
      "font-size:clamp(1.5rem,4vw,2.5rem);font-weight:500;letter-spacing:-0.02em;color:var(--text-1,#1a3c34);opacity:0;filter:blur(10px);transition:opacity 1s ease,filter 1s ease,transform 1s ease;transform:translateY(20px);font-family:var(--font,sans-serif);";
    h1.textContent = "Decades of Happy, Healthy Smiles";
    var p = document.createElement("p");
    p.style.cssText =
      "margin-top:1rem;font-size:clamp(0.6rem,1vw,0.75rem);font-weight:700;letter-spacing:0.2em;color:var(--text-3,rgba(26,60,52,0.6));opacity:0;transition:opacity 1s ease 0.2s;text-transform:uppercase;font-family:var(--font,sans-serif);";
    p.textContent = "SCROLL TO EXPLORE";
    wrap.appendChild(h1);
    wrap.appendChild(p);
    container.appendChild(wrap);

    return {
      wrap: wrap,
      h1: h1,
      p: p,
      show: function () {
        h1.style.opacity = "1";
        h1.style.filter = "blur(0px)";
        h1.style.transform = "translateY(0)";
        p.style.opacity = "0.5";
      },
      fadeByMorph: function (m) {
        if (m < 0.5) {
          var o = 1 - m * 2;
          h1.style.opacity = String(Math.max(0, o));
          p.style.opacity = String(Math.max(0, 0.5 - m));
        } else {
          h1.style.opacity = "0";
          h1.style.filter = "blur(10px)";
          p.style.opacity = "0";
        }
      }
    };
  }

  function createArcContent(container) {
    var wrap = document.createElement("div");
    wrap.style.cssText =
      "position:absolute;top:10%;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;" +
      "pointer-events:none;left:50%;transform:translateX(-50%);padding:0 1rem;opacity:0;transition:opacity 0.6s ease,transform 0.6s ease;transform:translateX(-50%) translateY(20px);";
    var h2 = document.createElement("h2");
    h2.style.cssText =
      "font-size:clamp(1.5rem,4vw,3rem);font-weight:600;color:var(--text-1,#1a3c34);letter-spacing:-0.025em;margin-bottom:1rem;font-family:var(--font,sans-serif);";
    h2.textContent = "Explore Our Treatments";
    var p = document.createElement("p");
    p.style.cssText =
      "font-size:clamp(0.8rem,1.2vw,1rem);color:var(--text-3,rgba(26,60,52,0.6));max-width:500px;line-height:1.6;font-family:var(--font,sans-serif);";
    p.textContent = "Discover a world of dental care — flip a card to learn more about each treatment.";
    wrap.appendChild(h2);
    wrap.appendChild(p);
    container.appendChild(wrap);

    return {
      wrap: wrap,
      showByMorph: function (m) {
        if (m > 0.8) {
          var o = (m - 0.8) / 0.2;
          wrap.style.opacity = String(o);
          wrap.style.transform = "translateX(-50%) translateY(" + lerp(20, 0, o) + "px)";
        } else {
          wrap.style.opacity = "0";
        }
      }
    };
  }

  // ======== SCATTER POSITIONS ========
  function generateScatter(count) {
    var positions = [];
    for (var i = 0; i < count; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1000,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0
      });
    }
    return positions;
  }

  // ======== MAIN INIT ========
  function init(containerEl, images) {
    images = images || DEFAULT_IMAGES;
    var total = Math.min(images.length, TOTAL_IMAGES);

    // Container setup
    containerEl.style.cssText +=
      ";position:relative;width:100%;height:80vh;min-height:500px;overflow:hidden;background:var(--off-white,#fafcfb);";

    // Cards container (centred)
    var cardsWrap = document.createElement("div");
    cardsWrap.style.cssText =
      "position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%;";
    containerEl.appendChild(cardsWrap);

    // Intro + arc text
    var introText = createIntroText(containerEl);
    var arcContent = createArcContent(containerEl);

    // Create card DOM + springs
    var cards = [];
    var scatterPositions = generateScatter(total);

    for (var i = 0; i < total; i++) {
      var el = createCardElement(images[i] || images[i % images.length], i);
      cardsWrap.appendChild(el);
      var spring = createCardSpring(40, 15);
      // Init at scatter position
      spring.x.reset(scatterPositions[i].x);
      spring.y.reset(scatterPositions[i].y);
      spring.rotation.reset(scatterPositions[i].rotation);
      spring.scale.reset(0.6);
      spring.opacity.reset(0);
      cards.push({ el: el, spring: spring });
    }

    // State
    var phase = "scatter"; // scatter | line | circle
    var containerWidth = containerEl.offsetWidth;
    var containerHeight = containerEl.offsetHeight;
    var virtualScrollVal = 0;
    var mouseXVal = 0;
    var running = true;

    // Morph and rotate springs (global)
    var morphSpring = createSpring(40, 20);
    var rotateSpring = createSpring(40, 20);
    var parallaxSpring = createSpring(30, 20);

    morphSpring.reset(0);
    rotateSpring.reset(0);
    parallaxSpring.reset(0);

    // ---- Resize Observer ----
    var ro = new ResizeObserver(function (entries) {
      for (var e = 0; e < entries.length; e++) {
        containerWidth = entries[e].contentRect.width;
        containerHeight = entries[e].contentRect.height;
      }
    });
    ro.observe(containerEl);

    // ---- Virtual Scroll ----
    function handleWheel(e) {
      e.preventDefault();
      virtualScrollVal = Math.min(Math.max(virtualScrollVal + e.deltaY, 0), MAX_SCROLL);
    }

    var touchStartY = 0;
    function handleTouchStart(e) { touchStartY = e.touches[0].clientY; }
    function handleTouchMove(e) {
      var y = e.touches[0].clientY;
      var dy = touchStartY - y;
      touchStartY = y;
      virtualScrollVal = Math.min(Math.max(virtualScrollVal + dy, 0), MAX_SCROLL);
    }

    containerEl.addEventListener("wheel", handleWheel, { passive: false });
    containerEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    containerEl.addEventListener("touchmove", handleTouchMove, { passive: true });

    // ---- Mouse Parallax ----
    function handleMouseMove(e) {
      var rect = containerEl.getBoundingClientRect();
      var relX = e.clientX - rect.left;
      var normalizedX = (relX / rect.width) * 2 - 1;
      mouseXVal = normalizedX * 100;
    }
    containerEl.addEventListener("mousemove", handleMouseMove);

    // ---- Intro sequence ----
    setTimeout(function () { phase = "line"; }, 500);
    setTimeout(function () {
      phase = "circle";
      introText.show();
    }, 2500);

    // ---- Compute targets per phase ----
    function computeTargets() {
      // Map virtual scroll to morph/rotate
      var morphTarget = Math.min(Math.max(virtualScrollVal / 600, 0), 1);
      morphSpring.set(morphTarget);

      var rotTarget = virtualScrollVal > 600
        ? Math.min((virtualScrollVal - 600) / (MAX_SCROLL - 600), 1) * 360
        : 0;
      rotateSpring.set(rotTarget);

      parallaxSpring.set(mouseXVal);

      var morphVal = morphSpring.get();
      var rotVal = rotateSpring.get();
      var parallaxVal = parallaxSpring.get();

      // Update text overlays
      introText.fadeByMorph(morphVal);
      arcContent.showByMorph(morphVal);

      for (var i = 0; i < total; i++) {
        var target;

        if (phase === "scatter") {
          target = scatterPositions[i];
        } else if (phase === "line") {
          var lineSpacing = 70;
          var lineTotal = total * lineSpacing;
          var lineX = i * lineSpacing - lineTotal / 2;
          target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
        } else {
          // Circle phase + morph to arc
          var isMobile = containerWidth < 768;
          var minDim = Math.min(containerWidth, containerHeight);

          // A. Circle position
          var circleRadius = Math.min(minDim * 0.35, 350);
          var circleAngle = (i / total) * 360;
          var circleRad = (circleAngle * Math.PI) / 180;
          var circlePos = {
            x: Math.cos(circleRad) * circleRadius,
            y: Math.sin(circleRad) * circleRadius,
            rotation: circleAngle + 90
          };

          // B. Bottom arc position
          var baseRadius = Math.min(containerWidth, containerHeight * 1.5);
          var arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
          var arcApexY = containerHeight * (isMobile ? 0.35 : 0.25);
          var arcCenterY = arcApexY + arcRadius;
          var spreadAngle = isMobile ? 100 : 130;
          var startAngle = -90 - (spreadAngle / 2);
          var step = spreadAngle / (total - 1);

          var scrollProgress = Math.min(Math.max(rotVal / 360, 0), 1);
          var maxRotation = spreadAngle * 0.8;
          var boundedRotation = -scrollProgress * maxRotation;

          var currentArcAngle = startAngle + (i * step) + boundedRotation;
          var arcRad = (currentArcAngle * Math.PI) / 180;

          var arcPos = {
            x: Math.cos(arcRad) * arcRadius + parallaxVal,
            y: Math.sin(arcRad) * arcRadius + arcCenterY,
            rotation: currentArcAngle + 90,
            scale: isMobile ? 1.4 : 1.8
          };

          // C. Lerp circle → arc by morph
          target = {
            x: lerp(circlePos.x, arcPos.x, morphVal),
            y: lerp(circlePos.y, arcPos.y, morphVal),
            rotation: lerp(circlePos.rotation, arcPos.rotation, morphVal),
            scale: lerp(1, arcPos.scale, morphVal),
            opacity: 1
          };
        }

        // Set spring targets
        cards[i].spring.x.set(target.x);
        cards[i].spring.y.set(target.y);
        cards[i].spring.rotation.set(target.rotation);
        cards[i].spring.scale.set(target.scale);
        cards[i].spring.opacity.set(target.opacity);
      }
    }

    // ---- Animation loop ----
    var lastTime = 0;
    function loop(timestamp) {
      if (!running) return;

      var dt = lastTime ? (timestamp - lastTime) / 1000 : 0.016;
      lastTime = timestamp;

      computeTargets();

      // Tick global springs
      morphSpring.tick(dt);
      rotateSpring.tick(dt);
      parallaxSpring.tick(dt);

      // Tick card springs & apply transforms
      for (var i = 0; i < total; i++) {
        var c = cards[i];
        c.spring.x.tick(dt);
        c.spring.y.tick(dt);
        c.spring.rotation.tick(dt);
        c.spring.scale.tick(dt);
        c.spring.opacity.tick(dt);

        var x = c.spring.x.get();
        var y = c.spring.y.get();
        var r = c.spring.rotation.get();
        var s = c.spring.scale.get();
        var o = c.spring.opacity.get();

        c.el.style.transform =
          "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) rotate(" + r.toFixed(1) + "deg) scale(" + s.toFixed(3) + ")";
        c.el.style.opacity = Math.max(0, Math.min(1, o)).toFixed(3);
      }

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    // Cleanup function
    return function destroy() {
      running = false;
      ro.disconnect();
      containerEl.removeEventListener("wheel", handleWheel);
      containerEl.removeEventListener("touchstart", handleTouchStart);
      containerEl.removeEventListener("touchmove", handleTouchMove);
      containerEl.removeEventListener("mousemove", handleMouseMove);
    };
  }

  // Expose globally
  window.ldcImageCircle = { init: init, DEFAULT_IMAGES: DEFAULT_IMAGES };
})();
