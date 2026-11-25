/**
 * Global Glassmorphism Sliding Grid Menu System
 * Rayaan Tasnim's Command Dashboard
 * Compatible with GitHub Pages (100% Static, Vanilla JS, Zero Bundlers)
 */

(function () {
  'use strict';

  // Determine relative root path based on document URL structure
  function getRelativeRoot() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/Parts/') || path.includes('/parts/')) {
      return '../../';
    }
    return './';
  }

  // Detect which node corresponds to the current page
  function getActiveNodeId() {
    const path = (window.location.pathname + window.location.hash).toLowerCase();
    const href = window.location.href.toLowerCase();

    // Node 03 (Creations) - covers index.html, more.html, more2.html
    if (
      path.includes('/creations') ||
      href.includes('/creations') ||
      path.includes('more.html') ||
      path.includes('more2.html')
    ) {
      return 'node-03';
    }
    // Node 02 (The Kernel / Tech-stacks)
    if (path.includes('/tech-stacks') || href.includes('/tech-stacks') || path.includes('stack.html')) {
      return 'node-02';
    }
    // Node 04 (Brilliances)
    if (path.includes('/brilliance') || href.includes('/brilliance')) {
      return 'node-04';
    }
    // Node 05 (Passions)
    if (path.includes('/passions') || href.includes('/passions') || path.includes('hobby.html')) {
      return 'node-05';
    }
    // Node 06 (FAQ - Oracle)
    if (path.includes('/faq') || href.includes('/faq')) {
      return 'node-06';
    }
    // Node 07 (Mentors & Idols)
    if (path.includes('/mentors-and-idols') || href.includes('/mentors-and-idols')) {
      return 'node-07';
    }
    // Node 08 (Ideology / Philosophies)
    if (path.includes('/philosophies') || href.includes('/philosophies')) {
      return 'node-08';
    }
    // Default: Node 01 (Core Index)
    return 'node-01';
  }

  const root = getRelativeRoot();
  const activeNodeId = getActiveNodeId();

  // 9 Core Nodes definition (Forming symmetrical 3x3 Desktop / 2x2 Tablet / 1 Col Mobile)
  const CODEX_NODES = [
    {
      id: 'node-01',
      number: 'NODE 01',
      title: 'Core Index',
      tag: 'COMMAND MATRIX & CV',
      desc: 'Central operational hub, identity dossiers, STEM achievements, and high-velocity systems architecture.',
      icon: 'fa-solid fa-satellite-dish',
      url: root + 'index.html',
    },
    {
      id: 'node-02',
      number: 'NODE 02',
      title: 'The Kernel',
      tag: '70+ TECH STACKS',
      desc: 'Architectural blueprint cataloging low-level C++20, Next.js App Router, Docker pipelines, and ML inference.',
      icon: 'fa-solid fa-microchip',
      url: root + 'Parts/Tech-stacks/index.html',
    },
    {
      id: 'node-03',
      number: 'NODE 03',
      title: 'Creations',
      tag: 'OPEN-SOURCE SHOWROOM',
      desc: 'Production-ready software ecosystems, Prime Factor Arena, GitForge IDE, and distributed microservices.',
      icon: 'fa-solid fa-cubes',
      url: root + 'Parts/Creations/index.html',
    },
    {
      id: 'node-04',
      number: 'NODE 04',
      title: 'Brilliances',
      tag: 'ALGORITHMIC ARENA',
      desc: 'Codeforces 1655 ELO rating, NHSPC National Finalist (141st), Cadet College 57th merit, and graph theory.',
      icon: 'fa-solid fa-trophy',
      url: root + 'Parts/Brilliance/index.html',
    },
    {
      id: 'node-05',
      number: 'NODE 05',
      title: 'The Outlier',
      tag: 'PARALLEL HORIZONS',
      desc: 'Astrophysics telemetry, luxury automotive engineering, Karate kinematics, and MIT/JPL trajectory.',
      icon: 'fa-solid fa-shuttle-space',
      url: root + 'Parts/Passions/index.html',
    },
    {
      id: 'node-06',
      number: 'NODE 06',
      title: 'Oracle (FAQ)',
      tag: 'INTELLIGENT TERMINAL',
      desc: 'High-velocity interrogation engine with 52 deep technical diagnostics on software engineering and life logic.',
      icon: 'fa-solid fa-terminal',
      url: root + 'Parts/FAQ/index.html',
    },
    {
      id: 'node-07',
      number: 'NODE 07',
      title: 'Mentors & Idols',
      tag: 'TITANS OF INFORMATICS',
      desc: 'Registry of guiding vectors: Gennady Korotkevich (Tourist), Jiangly, Benjamin Qi, and Deboti Das Soumya.',
      icon: 'fa-solid fa-user-shield',
      url: root + 'Parts/Mentors-and-Idols/index.html',
    },
    {
      id: 'node-08',
      number: 'NODE 08',
      title: 'Ideology Hub',
      tag: 'THE UNYIELDING LAW',
      desc: 'Zen-mode philosophies, temporal legacy roadmaps, and creator sovereignty to architect your own empire.',
      icon: 'fa-solid fa-scroll',
      url: root + 'Parts/Philosophies/index.html',
    },
    {
      id: 'node-09',
      number: 'NODE 09',
      title: 'IDAI Universe',
      tag: 'SOVEREIGN MOTHERSHIP',
      desc: 'Flagship sovereign global software ecosystem, distributed edge routing framework, and planetary compute initiative.',
      icon: 'fa-solid fa-globe',
      url: 'https://rayaantasnim.github.io/IDAI/',
      isExternal: true,
    },
  ];

  // Inject required global styles for smooth scrolling, glassmorphism, and custom scrollbars
  function injectStyles() {
    if (document.getElementById('nexus-nav-styles')) return;
    const style = document.createElement('style');
    style.id = 'nexus-nav-styles';
    style.textContent = `
      html {
        scroll-behavior: smooth !important;
      }
      /* Suppress older inline non-sliding overlays across pages */
      #codex-overlay, #menu-overlay, #megaMenuOverlay, #foldedNavOverlay, #foldedNavDrawer {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      .nexus-custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .nexus-custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(3, 7, 18, 0.7);
      }
      .nexus-custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(6, 182, 212, 0.35);
        border-radius: 9999px;
      }
      .nexus-custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(6, 182, 212, 0.75);
      }
      /* Disabled / You Are Here Active Node styling */
      .nexus-active-card-container {
        cursor: not-allowed !important;
      }
      .nexus-active-card {
        opacity: 0.35 !important;
        pointer-events: none !important;
        cursor: not-allowed !important;
        filter: grayscale(15%);
        transform: none !important;
        box-shadow: none !important;
        border-color: rgba(6, 182, 212, 0.25) !important;
      }
      .nexus-active-card * {
        pointer-events: none !important;
      }
      .nexus-glass-trigger {
        backdrop-filter: blur(16px) saturate(180%);
        -webkit-backdrop-filter: blur(16px) saturate(180%);
      }
      .nexus-drawer-glass {
        backdrop-filter: blur(28px) saturate(200%);
        -webkit-backdrop-filter: blur(28px) saturate(200%);
      }
      #nexus-sliding-drawer {
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        -webkit-overflow-scrolling: touch;
      }
    `;
    document.head.appendChild(style);
  }

  // Build the sliding navigation panel DOM
  function createSlidingNavigation() {
    if (document.getElementById('nexus-sliding-overlay')) return;

    // 1. Build Grid Cards HTML
    const cardsHtml = CODEX_NODES.map((node) => {
      const isActive = node.id === activeNodeId;

      if (isActive) {
        return `
          <div class="nexus-active-card-container">
            <div class="nexus-active-card relative p-5 rounded-xl border border-cyan-500/25 bg-gradient-to-br from-cyan-950/30 via-[#050b16] to-[#02050c] flex flex-col justify-between select-none h-full" aria-current="page">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="font-mono text-[11px] font-bold text-cyan-400 tracking-wider bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded">${node.number}</span>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-mono text-[10px] tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,243,255,0.4)] font-bold">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>[ ACTIVE NODE ]
                  </span>
                </div>
                <h3 class="font-bold text-xl text-white tracking-wide uppercase font-sans mb-1">${node.title}</h3>
                <div class="font-mono text-[11px] text-cyan-400/70 tracking-wider mb-2 font-semibold">${node.tag}</div>
                <p class="font-sans text-xs text-slate-300 leading-relaxed text-justify opacity-90">${node.desc}</p>
              </div>
              <div class="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between font-mono text-[11px] text-cyan-400 font-semibold">
                <span class="flex items-center gap-1.5"><i class="fa-solid fa-location-crosshairs text-cyan-400 animate-pulse"></i> CURRENT TERMINAL</span>
                <i class="fa-solid fa-lock text-cyan-500/60"></i>
              </div>
            </div>
          </div>
        `;
      }

      const externalAttr = node.isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
      return `
        <a href="${node.url}" ${externalAttr} class="nexus-card-link group relative p-5 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 via-[#070e1e]/80 to-[#030611] backdrop-blur-md hover:border-cyan-400/80 hover:bg-cyan-950/40 hover:shadow-[0_0_30px_rgba(0,243,255,0.22)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer h-full">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="font-mono text-[11px] font-bold text-cyan-400 tracking-wider bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">${node.number}</span>
              <div class="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400/80 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all">
                <i class="${node.icon} text-sm"></i>
              </div>
            </div>
            <h3 class="font-bold text-xl text-white group-hover:text-cyan-300 transition-colors tracking-wide uppercase font-sans mb-1">${node.title}</h3>
            <div class="font-mono text-[11px] text-cyan-400/80 tracking-wider mb-2 font-semibold">${node.tag}</div>
            <p class="font-sans text-xs text-slate-300 leading-relaxed text-justify line-clamp-3">${node.desc}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-cyan-500/15 flex items-center justify-between font-mono font-bold text-xs uppercase tracking-wider text-cyan-400 group-hover:text-cyan-300 transition-colors">
            <span>INITIALIZE LINK</span>
            <i class="fa-solid fa-arrow-right group-hover:translate-x-1.5 transition-transform text-xs"></i>
          </div>
        </a>
      `;
    }).join('');

    // 2. Build Overlay and Sliding Drawer Container
    const overlay = document.createElement('div');
    overlay.id = 'nexus-sliding-overlay';
    overlay.className = 'fixed inset-0 z-[10000] pointer-events-none transition-all duration-300';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <!-- Frosted Backdrop with Click-Outside -->
      <div id="nexus-menu-backdrop" class="absolute inset-0 bg-black/75 backdrop-blur-md opacity-0 transition-opacity duration-300 ease-in-out cursor-pointer"></div>

      <!-- Sliding Right-Side Panel -->
      <aside id="nexus-sliding-drawer" class="absolute top-0 right-0 h-full w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl bg-[#030712]/92 nexus-drawer-glass border-l border-cyan-500/30 shadow-[-25px_0_70px_rgba(0,0,0,0.85)] flex flex-col translate-x-full transition-transform duration-400 ease-out z-10 overflow-hidden">
        
        <!-- Panel Header -->
        <div class="px-6 py-5 border-b border-cyan-500/20 bg-black/50 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <div>
              <h2 class="text-base sm:text-lg font-bold tracking-wider text-white uppercase font-sans flex items-center gap-2">
                <span>Rayaan's Nexus</span>
                <span class="text-cyan-400 font-mono text-xs font-normal hidden sm:inline">// SYSTEM CODEX DIRECTORY</span>
              </h2>
              <p class="text-[11px] font-mono text-slate-400 tracking-wider">3×3 RESPONSIVE MULTI-GRID ROUTING MATRIX</p>
            </div>
          </div>

          <!-- Close Action Button -->
          <button id="nexus-menu-close-btn" class="group px-4 py-2 rounded-lg border border-red-500/40 bg-red-950/25 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all font-mono text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-sm">
            <span>CLOSE [ESC]</span>
            <i class="fa-solid fa-xmark text-sm group-hover:rotate-90 transition-transform duration-300"></i>
          </button>
        </div>

        <!-- Scrollable Grid Body (Desktop: 3x3 | Tablet: 2x2 | Mobile: 1 Col) -->
        <div class="flex-1 overflow-y-auto px-6 py-8 nexus-custom-scrollbar">
          <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${cardsHtml}
          </div>
        </div>

        <!-- Panel Footer Telemetry -->
        <div class="px-6 py-3.5 border-t border-cyan-500/20 bg-black/60 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
          <div class="flex items-center gap-3">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-slate-300 font-bold">ALL 9 NODES VERIFIED</span>
            <span class="text-slate-600">|</span>
            <span class="hidden sm:inline">SWIPE RIGHT OR PRESS ESC TO DISMISS</span>
          </div>
          <div class="text-cyan-400/80">
            SOVEREIGN MATRIX • RAYAAN TASNIM
          </div>
        </div>

      </aside>
    `;
    document.body.appendChild(overlay);

    // 3. Inject Minimalist Glassmorphic Fixed Trigger Icon (Top-Right corner)
    if (!document.getElementById('global-glass-menu-trigger')) {
      const trigger = document.createElement('button');
      trigger.id = 'global-glass-menu-trigger';
      trigger.setAttribute('aria-label', 'Open Global Nexus Menu');
      trigger.className = 'nexus-glass-trigger group fixed top-4 right-4 sm:top-5 sm:right-6 z-[999] px-4 py-2 rounded-full bg-[#030712]/80 border border-cyan-500/50 text-cyan-300 shadow-[0_0_20px_rgba(0,243,255,0.25)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:bg-cyan-950/50 transition-all duration-300 flex items-center gap-2.5 cursor-pointer';
      trigger.innerHTML = `
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span class="font-bold tracking-widest text-xs uppercase text-cyan-300 font-mono">MENU</span>
        <i class="fa-solid fa-bars text-cyan-400 text-xs group-hover:scale-110 transition-transform"></i>
      `;
      document.body.appendChild(trigger);
    }

    // Attach listeners
    attachEventListeners();
  }

  let isMenuOpen = false;

  function openSlidingMenu() {
    const overlay = document.getElementById('nexus-sliding-overlay');
    const backdrop = document.getElementById('nexus-menu-backdrop');
    const drawer = document.getElementById('nexus-sliding-drawer');

    if (!overlay || !drawer) return;

    overlay.classList.remove('pointer-events-none');
    overlay.classList.add('pointer-events-auto');
    overlay.setAttribute('aria-hidden', 'false');

    if (backdrop) {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
    }

    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');

    document.body.style.overflow = 'hidden';
    isMenuOpen = true;
  }

  function closeSlidingMenu() {
    const overlay = document.getElementById('nexus-sliding-overlay');
    const backdrop = document.getElementById('nexus-menu-backdrop');
    const drawer = document.getElementById('nexus-sliding-drawer');

    if (!overlay || !drawer) return;

    if (backdrop) {
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0');
    }

    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');

    setTimeout(() => {
      overlay.classList.remove('pointer-events-auto');
      overlay.classList.add('pointer-events-none');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      isMenuOpen = false;
    }, 300);
  }

  function attachEventListeners() {
    // 1. Trigger button click
    const trigger = document.getElementById('global-glass-menu-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openSlidingMenu();
      });
    }

    // 2. Close button click
    const closeBtn = document.getElementById('nexus-menu-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeSlidingMenu();
      });
    }

    // 3. Click outside (Backdrop click)
    const backdrop = document.getElementById('nexus-menu-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        e.preventDefault();
        closeSlidingMenu();
      });
    }

    // 4. Keyboard ESC exit
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeSlidingMenu();
      }
    });

    // 5. Touch swipe right to dismiss on mobile
    const drawer = document.getElementById('nexus-sliding-drawer');
    if (drawer) {
      let touchStartX = 0;
      let touchStartY = 0;

      drawer.addEventListener(
        'touchstart',
        (e) => {
          if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
          }
        },
        { passive: true }
      );

      drawer.addEventListener(
        'touchend',
        (e) => {
          if (e.changedTouches.length === 1) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Swipe right by more than 50px with predominantly horizontal movement
            if (deltaX > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
              closeSlidingMenu();
            }
          }
        },
        { passive: true }
      );
    }

    // 6. Automatically intercept and hook all existing menu buttons on any page
    const existingButtons = document.querySelectorAll(
      '#menu-toggle-btn, #megaMenuToggleBtn, #menu-btn, #navTogglerBtn, #menuDropdownBtn, #mobileDashboardBtn, [data-open-menu]'
    );
    existingButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        openSlidingMenu();
      });
    });
  }

  // Initialization lifecycle
  function init() {
    injectStyles();
    createSlidingNavigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global API
  window.NexusNav = {
    open: openSlidingMenu,
    close: closeSlidingMenu,
    getActiveNodeId: () => activeNodeId,
    getRootPath: () => root,
  };
})();
