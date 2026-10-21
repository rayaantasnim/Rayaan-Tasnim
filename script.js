        // Initialize Lucide Icons
        lucide.createIcons();

        // 01. Mobile Navigation Toggle
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // 02. Navbar Scroll Dynamic Styling
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('bg-[#07090e]/90', 'backdrop-blur-md', 'border-white/10', 'shadow-2xl');
            } else {
                navbar.classList.remove('bg-[#07090e]/90', 'backdrop-blur-md', 'border-white/10', 'shadow-2xl');
            }
        });

        // 03. Tech Stack Filtering
        const filterBtns = document.querySelectorAll('.tech-filter-btn');
        const techItems = document.querySelectorAll('.tech-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('bg-cyan-500', 'text-black', 'font-bold');
                    b.classList.add('bg-slate-900', 'text-slate-300');
                });
                btn.classList.add('bg-cyan-500', 'text-black', 'font-bold');
                btn.classList.remove('bg-slate-900', 'text-slate-300');

                const filter = btn.getAttribute('data-filter');

                techItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // 04. Modal Control
        function openModal(id) {
            document.getElementById(id).classList.remove('hidden');
        }

        function closeModal(id) {
            document.getElementById(id).classList.add('hidden');
        }

        // 05. Copy Email
        function copyEmail() {
            const email = "rayaantasnim@gmail.com";
            const input = document.createElement('textarea');
            input.value = email;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);

            const copyText = document.getElementById('copy-text');
            copyText.textContent = 'Copied!';
            setTimeout(() => {
                copyText.textContent = 'Copy';
            }, 2000);
        }

        // 06. Form Dispatch Simulation
        function handleFormSubmit(e) {
            e.preventDefault();
            const feedback = document.getElementById('form-feedback');
            feedback.classList.remove('hidden');
            setTimeout(() => {
                feedback.classList.add('hidden');
                e.target.reset();
            }, 3000);
        }

        // 07. Dynamic Particle Canvas Background
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');

        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.5 + 0.5;
                this.color = Math.random() > 0.5 ? '#00f2fe' : '#9d4edd';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.6;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor(window.innerWidth / 15), 80);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect nearby particles with subtle lines
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = '#00f2fe';
                        ctx.globalAlpha = (100 - dist) / 1000;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateCanvas);
        }

        initParticles();
        animateCanvas();
