/**
 * ==========================================================================
 * THE KERNEL — CORE ENGINE CONTROLLER (stack.js)
 * High-Performance Viewport Engine & State Orchestrator | Rayaan's Nexus
 * ==========================================================================
 */

(function () {
  'use strict';

  // 1. Feature Detection & Initial Check
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Lenis Smooth Scrolling Engine
  let lenisInstance = null;
  if (!isReducedMotion && typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // 3. Interactive Cyber Background Matrix Canvas
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const gridSize = 48;
    let pulseTime = 0;

    function renderMatrix() {
      ctx.clearRect(0, 0, width, height);

      // Render technical coordinate grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render localized scanner wave
      pulseTime += 0.02;
      const scanY = (Math.sin(pulseTime) * 0.5 + 0.5) * height;

      const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      grad.addColorStop(0, 'rgba(0, 243, 255, 0)');
      grad.addColorStop(0.5, 'rgba(0, 243, 255, 0.08)');
      grad.addColorStop(1, 'rgba(0, 243, 255, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 60, width, 120);

      // Render micro coordinate crosshairs near cursor
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.2)';
      const snappedX = Math.floor(mouseX / gridSize) * gridSize;
      const snappedY = Math.floor(mouseY / gridSize) * gridSize;

      ctx.beginPath();
      ctx.arc(snappedX, snappedY, 3, 0, Math.PI * 2);
      ctx.stroke();

      requestAnimationFrame(renderMatrix);
    }

    renderMatrix();
  }

  // 4. Custom Hardware Cursor Engine
  const cursorDot = document.getElementById('cursor-dot');
  const cursorFollower = document.getElementById('cursor-follower');

  if (cursorDot && cursorFollower && !isTouchDevice) {
    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let followerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      cursorDot.style.transform = `translate(${mousePos.x}px, ${mousePos.y}px)`;
    });

    function updateFollower() {
      followerPos.x += (mousePos.x - followerPos.x) * 0.16;
      followerPos.y += (mousePos.y - followerPos.y) * 0.16;

      cursorFollower.style.transform = `translate(${followerPos.x}px, ${followerPos.y}px)`;
      requestAnimationFrame(updateFollower);
    }
    updateFollower();

    // Hover detection for interactive targets
    const interactiveTargets = document.querySelectorAll(
      'a, button, .universal-hitbox, .codex-grid-tile, input, textarea'
    );

    interactiveTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('is-hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('is-hovered');
      });
    });
  }

  // 5. 3D Holographic Brand Anchor Hover Effect
  const brandAnchor = document.querySelector('.brand-anchor-3d');
  const brandText = document.querySelector('.brand-text-layer');

  if (brandAnchor && brandText && !isTouchDevice) {
    brandAnchor.addEventListener('mousemove', (e) => {
      const rect = brandAnchor.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (-y / rect.height) * 24;
      const rotateY = (x / rect.width) * 24;

      brandText.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
      brandText.style.textShadow = `${-x * 0.5}px ${-y * 0.5}px 24px rgba(0, 243, 255, 0.95), 0 0 10px rgba(0, 243, 255, 0.8)`;
    });

    brandAnchor.addEventListener('mouseleave', () => {
      brandText.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      brandText.style.textShadow = '0 0 10px rgba(0, 243, 255, 0.4)';
    });
  }

  // 6. The Codex Overlay Menu System (Command Dashboard)
  const menuBtn = document.getElementById('menu-trigger-btn');
  const closeMenuBtn = document.getElementById('menu-close-btn');
  const codexOverlay = document.getElementById('codex-overlay');
  const mainContent = document.getElementById('main-viewport-content');

  function openCodexMenu() {
    if (!codexOverlay) return;
    codexOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    if (lenisInstance) lenisInstance.stop();

    if (typeof gsap !== 'undefined') {
      gsap.to(mainContent, {
        filter: 'blur(12px)',
        scale: 0.97,
        opacity: 0.25,
        duration: 0.4,
        ease: 'power3.out',
      });

      gsap.fromTo(
        '#codex-overlay .codex-grid-tile',
        { y: 35, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.04, duration: 0.35, ease: 'power2.out', delay: 0.1 }
      );
    }
  }

  function closeCodexMenu() {
    if (!codexOverlay) return;
    document.body.style.overflow = '';

    if (lenisInstance) lenisInstance.start();

    if (typeof gsap !== 'undefined') {
      gsap.to(mainContent, {
        filter: 'blur(0px)',
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
      });
    }

    codexOverlay.classList.remove('is-active');
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCodexMenu();
    });
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeCodexMenu();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && codexOverlay && codexOverlay.classList.contains('is-active')) {
      closeCodexMenu();
    }
  });

  // Close menu on navigation link click
  const codexLinks = document.querySelectorAll('#codex-overlay a');
  codexLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeCodexMenu();
    });
  });

  // 7. Dynamic Vibe Changing Animation Tracker
  const vibeTargets = document.querySelectorAll('.dynamic-vibe-target');
  const root = document.documentElement;

  window.addEventListener('mousemove', (e) => {
    const xRatio = e.clientX / window.innerWidth;
    const yRatio = e.clientY / window.innerHeight;

    let targetHue;
    if (xRatio < 0.45) {
      targetHue = 185 - (xRatio / 0.45) * 35;
    } else {
      targetHue = 150 + ((xRatio - 0.45) / 0.55) * 130;
    }

    const glowColor = `hsl(${targetHue}, 100%, 55%)`;
    root.style.setProperty('--vibe-hue', `${targetHue}deg`);

    vibeTargets.forEach((el) => {
      el.style.textShadow = `0 0 15px ${glowColor}, 0 0 30px hsla(${targetHue}, 100%, 50%, 0.4)`;
    });
  });

  // 8. 3D Cursor Parallax for Observatory Node & Floating Elements
  const parallaxZone = document.querySelector('.observatory-parallax-zone');
  const floatingNodes = document.querySelectorAll('.observatory-floating-node');

  if (parallaxZone && floatingNodes.length > 0 && !isTouchDevice) {
    parallaxZone.addEventListener('mousemove', (e) => {
      const rect = parallaxZone.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      floatingNodes.forEach((node, idx) => {
        const factor = (idx + 1) * 18;
        node.style.transform = `translate3d(${x * factor}px, ${y * factor}px, ${factor * 2}px)`;
      });
    });

    parallaxZone.addEventListener('mouseleave', () => {
      floatingNodes.forEach((node) => {
        node.style.transform = 'translate3d(0px, 0px, 0px)';
      });
    });
  }

  // 9. GSAP ScrollTrigger Entrance Sequences (Pinning completely removed so group cards remain statically positioned)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in-up animation for category cards & capability cards with stagger
    const staggeredSections = ['.grid-stagger-trigger'];
    staggeredSections.forEach((selector) => {
      const grids = document.querySelectorAll(selector);
      grids.forEach((grid) => {
        const cards = grid.querySelectorAll('.universal-hitbox');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.04,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    });
  }

  // 10. Click Sound Effect / Haptic Micro-Feedback
  document.querySelectorAll('.universal-hitbox, .btn-neon-menu, .codex-grid-tile').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(8);
      }
    });
  });

  console.log('[Kernel Matrix] Systems synchronized. Group cards locked in static positions.');
})();
