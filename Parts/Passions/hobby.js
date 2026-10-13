/* ==========================================================================
   PRODUCTION-READY SCRIPTING ENGINE: LENIS, GSAP & INTERACTIVE OVERLAY
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis Smooth Scroll with instant response / no delay
    const lenis = new Lenis({
        duration: 0.1,
        easing: (t) => t,
        direction: 'vertical',
        smooth: true,
        mouseMultiplier: 1.2,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 2. Initialize GSAP & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Smooth entry animations for sections
    const sections = document.querySelectorAll("main > section");
    sections.forEach((section) => {
        gsap.fromTo(section, 
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 88%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 3. 7-Node Menu Overlay Logic & Dynamic Descriptions
    const menuBtn = document.getElementById("menu-btn");
    const closeMenu = document.getElementById("close-menu");
    const menuOverlay = document.getElementById("menu-overlay");
    const mainWrapper = document.getElementById("smooth-wrapper");

    function toggleMenu(open) {
        if (open) {
            menuOverlay.classList.add("active");
            gsap.to(mainWrapper, { scale: 0.96, filter: "blur(10px)", opacity: 0.15, duration: 0.45, ease: "power2.out" });
            gsap.fromTo(".node-card", 
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out", delay: 0.1 }
            );
            lenis.stop();
        } else {
            menuOverlay.classList.remove("active");
            gsap.to(mainWrapper, { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.45, ease: "power2.out" });
            lenis.start();
        }
    }

    menuBtn.addEventListener("click", () => toggleMenu(true));
    closeMenu.addEventListener("click", () => toggleMenu(false));

    // Close menu on ESC key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menuOverlay.classList.contains("active")) {
            toggleMenu(false);
        }
    });

    // 4. Brand Anchor 3D Tilt Effect
    const brandAnchor = document.getElementById("brand-anchor");
    brandAnchor.addEventListener("mousemove", (e) => {
        const rect = brandAnchor.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(brandAnchor, {
            rotationY: x * 0.18,
            rotationX: -y * 0.18,
            transformPerspective: 600,
            ease: "power1.out",
            duration: 0.3
        });
    });

    brandAnchor.addEventListener("mouseleave", () => {
        gsap.to(brandAnchor, {
            rotationY: 0,
            rotationX: 0,
            ease: "power2.out",
            duration: 0.6
        });
    });

    // 5. Dynamic Footer Glow Tracking
    const footer = document.querySelector("footer");
    window.addEventListener("mousemove", (e) => {
        const xPercent = (e.clientX / window.innerWidth) * 100;
        const yPercent = (e.clientY / window.innerHeight) * 100;
        footer.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(6, 182, 212, 0.12) 0%, rgba(2, 4, 8, 1) 75%)`;
    });
});