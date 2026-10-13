/* CREATIONS.JS - Production-Ready Interaction Engine */

document.addEventListener("DOMContentLoaded", function() {
    /* Initialize Lenis Smooth Scroll */
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* GSAP ScrollTrigger Setup */
    gsap.registerPlugin(ScrollTrigger);

    /* Animate sections on scroll */
    gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.04,
            ease: "power2.out"
        });
    });

    /* 7-Node Menu Overlay Logic */
    const menuToggleBtn = document.getElementById("menu-toggle-btn");
    const menuCloseBtn = document.getElementById("menu-close-btn");
    const codexOverlay = document.getElementById("codex-overlay");

    menuToggleBtn.addEventListener("click", () => {
        codexOverlay.classList.remove("opacity-0", "pointer-events-none");
        codexOverlay.classList.add("opacity-100", "pointer-events-auto");
        document.body.style.overflow = "hidden";
    });

    menuCloseBtn.addEventListener("click", () => {
        codexOverlay.classList.remove("opacity-100", "pointer-events-auto");
        codexOverlay.classList.add("opacity-0", "pointer-events-none");
        document.body.style.overflow = "auto";
    });

    /* Brand Anchor 3D Hover Effect */
    const brandAnchor = document.getElementById("brand-anchor");
    brandAnchor.addEventListener("mousemove", (e) => {
        const rect = brandAnchor.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(brandAnchor, {
            rotationY: x * 0.15,
            rotationX: -y * 0.15,
            transformPerspective: 500,
            duration: 0.3,
            ease: "power1.out"
        });
    });

    brandAnchor.addEventListener("mouseleave", () => {
        gsap.to(brandAnchor, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });

    /* Footer Background Cursor Coordinate Color Shift */
    const footer = document.getElementById("system-footer");
    window.addEventListener("mousemove", (e) => {
        const xRatio = e.clientX / window.innerWidth;
        const yRatio = e.clientY / window.innerHeight;
        const r = Math.floor(xRatio * 20);
        const g = Math.floor(yRatio * 50);
        const b = Math.floor((1 - xRatio) * 60);
        footer.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });
});