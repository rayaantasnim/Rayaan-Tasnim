/* ========================================================================== */
/* PRODUCTION-READY SCRIPTING: LENIS, GSAP, CURSOR & OVERLAY ENGINES          */
/* ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Custom Cursor Tracking Engine
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function renderCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        if (cursor) {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        }
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // 3. Brand Anchor 3D Tilt Hover Effect
    const brandAnchor = document.getElementById('brand-anchor');
    if (brandAnchor) {
        brandAnchor.addEventListener('mousemove', (e) => {
            const rect = brandAnchor.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            brandAnchor.style.transform = `perspective(500px) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg) scale(1.05)`;
        });
        brandAnchor.addEventListener('mouseleave', () => {
            brandAnchor.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    // 4. Codex Overlay System (Vertical Normal Scrolling Support)
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const codexOverlay = document.getElementById('codex-overlay');
    const mainContent = document.getElementById('main-content');

    function openMenu() {
        codexOverlay.classList.remove('opacity-0', 'pointer-events-none');
        codexOverlay.classList.add('opacity-100', 'pointer-events-auto');
        mainContent.classList.add('opacity-20', 'blur-md', 'scale-95');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        codexOverlay.classList.remove('opacity-100', 'pointer-events-auto');
        codexOverlay.classList.add('opacity-0', 'pointer-events-none');
        mainContent.classList.remove('opacity-20', 'blur-md', 'scale-95');
        document.body.style.overflow = '';
    }

    if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // 5. GSAP ScrollTrigger Animations & Timeline Staggers
    gsap.from(".hero-banner-container > div", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 6. Proclamation Section Mouse-Tracking Radial Gradient Backlight
    const proclamationSection = document.getElementById('proclamation-section');
    const radialGlare = document.getElementById('radial-glare');

    if (proclamationSection && radialGlare) {
        proclamationSection.addEventListener('mousemove', (e) => {
            const rect = proclamationSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            radialGlare.style.left = `${x}px`;
            radialGlare.style.top = `${y}px`;
        });
    }

    // 7. Footer Dynamic Color Transition Tracking Cursor Coordinates
    const footerLines = [
        document.getElementById('footer-line-1'),
        document.getElementById('footer-line-2'),
        document.getElementById('footer-line-3'),
        document.getElementById('footer-line-4')
    ];

    window.addEventListener('mousemove', (e) => {
        const xRatio = e.clientX / window.innerWidth;
        const colors = [
            '#06b6d4', // Cyan
            '#10b981', // Emerald
            '#8b5cf6', // Purple
            '#38bdf8'  // Sky
        ];
        
        footerLines.forEach((line, idx) => {
            if (line) {
                const colorIndex = Math.floor((xRatio + idx * 0.2) * colors.length) % colors.length;
                line.style.textShadow = `0 0 15px ${colors[colorIndex]}44`;
            }
        });
    });
});