document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Synchronize GSAP ScrollTrigger with Lenis
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Cosmic Background Canvas Particle Engine
    const canvas = document.getElementById('cosmic-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, vx: 0, vy: 0 };

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class CosmicParticle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5 + 0.5;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 20) + 5;
            this.color = Math.random() > 0.5 ? '#00F0FF' : '#00FF66';
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = 150;
            let force = (maxDistance - distance) / maxDistance;

            if (distance < maxDistance) {
                this.x -= forceDirectionX * force * 3;
                this.y -= forceDirectionY * force * 3;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 20;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 20;
                }
            }
        }
    }

    function initParticles() {
        particles = [];
        let numberOfParticles = (width * height) / 12000;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new CosmicParticle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Mouse Tracking & Dynamic Vibe Changing Footer Color Script
    let lastMouseX = window.innerWidth / 2;
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Dynamic Vibe Color Calculation based on cursor X coordinate
        const footerAuth = document.getElementById('footer-authorized');
        const footerRights = document.getElementById('footer-rights');
        const footerOlympiad = document.getElementById('footer-olympiad');
        const footerIdai = document.getElementById('footer-idai');

        let normX = e.clientX / window.innerWidth;
        let activeColor = '#00F0FF'; // Cyan Blue
        if (normX > 0.33 && normX <= 0.66) {
            activeColor = '#00FF66'; // Matrix Emerald Green
        } else if (normX > 0.66) {
            activeColor = '#BD00FF'; // Cosmic Purple
        }

        if (footerAuth) footerAuth.style.color = activeColor;
        if (footerOlympiad) footerOlympiad.style.color = activeColor;
        if (footerIdai) footerIdai.style.color = activeColor;
    });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    });

    // 3. GSAP ScrollTrigger Animations & Staggering
    gsap.utils.toArray('section').forEach((section) => {
        gsap.from(section.querySelectorAll('.card-hover-effect'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.out'
        });
    });

    // Mega Groups Mini-Hero Pinning & Scroll Interaction
    const megaGroups = document.querySelectorAll('.mega-group');
    megaGroups.forEach((group) => {
        const hero = group.querySelector('.group-hero');
        if (window.innerWidth >= 1024 && hero) {
            ScrollTrigger.create({
                trigger: group,
                start: 'top top+=100',
                end: 'bottom bottom-=100',
                pin: hero,
                pinSpacing: false
            });
        }
    });
});