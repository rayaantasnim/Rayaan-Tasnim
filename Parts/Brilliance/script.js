document.addEventListener("DOMContentLoaded", () => {
    // 1. Lenis Smooth Scroll Initialization
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

    // 2. GSAP & ScrollTrigger Setup
    gsap.registerPlugin(ScrollTrigger);

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 3. 7-Node Menu Overlay Interaction Mechanics
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const menuOverlay = document.getElementById('menu-overlay');

    function openMenu() {
        menuOverlay.classList.remove('pointer-events-none');
        gsap.to(menuOverlay, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });
        // Scale down & blur main content
        gsap.to("#smooth-content", {
            scale: 0.96,
            filter: "blur(8px)",
            opacity: 0.2,
            duration: 0.4,
            ease: "power2.out"
        });
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        gsap.to(menuOverlay, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                menuOverlay.classList.add('pointer-events-none');
            }
        });
        gsap.to("#smooth-content", {
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });
        document.body.style.overflow = '';
    }

    menuToggleBtn.addEventListener('click', openMenu);
    menuCloseBtn.addEventListener('click', closeMenu);

    // Close menu when clicking any overlay node link
    const overlayLinks = menuOverlay.querySelectorAll('a');
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // 4. Brand Anchor 3D Hover Tilt Effect
    const brandAnchor = document.getElementById('brand-anchor');
    brandAnchor.addEventListener('mousemove', (e) => {
        const rect = brandAnchor.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(brandAnchor, {
            rotationY: x * 0.15,
            rotationX: -y * 0.15,
            transformPerspective: 500,
            ease: "power1.out",
            duration: 0.3
        });
    });

    brandAnchor.addEventListener('mouseleave', () => {
        gsap.to(brandAnchor, {
            rotationY: 0,
            rotationX: 0,
            ease: "power2.out",
            duration: 0.5
        });
    });

    // 5. Scroll-Driven Fade-In-Up Animations with Stagger
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => {
        gsap.fromTo(el, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 6. Ultra-Simple Footer Cursor Color Transition Script
    const footerLines = document.querySelectorAll('.footer-line');
    window.addEventListener('mousemove', (e) => {
        const mouseXRatio = e.clientX / window.innerWidth;
        footerLines.forEach((line, index) => {
            const shift = (mouseXRatio + index * 0.15) % 1;
            if (shift < 0.33) {
                line.style.color = '#06b6d4'; // Cyan Blue
            } else if (shift < 0.66) {
                line.style.color = '#10b981'; // Matrix Emerald Green
            } else {
                line.style.color = '#8b5cf6'; // Cosmic Purple
            }
        });
    });
});