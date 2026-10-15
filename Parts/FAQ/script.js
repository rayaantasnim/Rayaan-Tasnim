/* 2. JavaScript Core Block (Complete production-ready dropdown engine script) */
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const brandAnchor = document.getElementById('brand-anchor');
    if (brandAnchor) {
        brandAnchor.addEventListener('mousemove', (e) => {
            const rect = brandAnchor.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(brandAnchor, {
                rotationY: x * 0.15,
                rotationX: -y * 0.15,
                transformPerspective: 500,
                duration: 0.1,
                ease: 'power1.out'
            });
        });
        brandAnchor.addEventListener('mouseleave', () => {
            gsap.to(brandAnchor, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }

    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const codexOverlay = document.getElementById('codex-overlay');

    function openMenu() {
        if (codexOverlay) {
            codexOverlay.classList.remove('opacity-0', 'pointer-events-none');
            codexOverlay.classList.add('opacity-100', 'pointer-events-auto');
            document.body.style.overflow = 'hidden';
            gsap.fromTo('#codex-overlay a', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power3.out' });
        }
    }

    function closeMenu() {
        if (codexOverlay) {
            codexOverlay.classList.remove('opacity-100', 'pointer-events-auto');
            codexOverlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        }
    }

    if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            const searchInput = document.getElementById('faq-search');
            if (searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        }
    });

    const faqItems = document.querySelectorAll('.faq-item');
    const faqContainer = document.getElementById('faq-container');

    // Create and insert the "No results found" placeholder notification element dynamically
    let noResultsMsg = document.getElementById('faq-no-results');
    if (!noResultsMsg && faqContainer) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'faq-no-results';
        noResultsMsg.className = 'hidden border border-cyan-500/20 bg-slate-900/50 rounded-xl p-8 text-center text-slate-400 font-rajdhani tracking-wider uppercase text-sm';
        noResultsMsg.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-cyan-400 mb-2 block text-xl"></i>[SYSTEM PROTOCOL]: No matching telemetry or query parameters found in the registry.';
        faqContainer.parentNode.insertBefore(noResultsMsg, faqContainer.nextSibling);
    }
    
    faqItems.forEach(item => {
        const triggerBtn = item.querySelector('.faq-trigger') || item.querySelector('.faq-question') || item.querySelector('button');
        const answerBlock = item.querySelector('.faq-answer-block') || item.querySelector('.faq-answer') || item.querySelector('div:nth-child(2)');
        const chevronIcon = item.querySelector('.faq-icon i') || item.querySelector('.fa-chevron-down') || item.querySelector('i');

        if (answerBlock) {
            answerBlock.style.cssText = 'display: block !important; max-height: none !important; overflow: hidden !important; height: 0px; opacity: 0;';
        }

        if (triggerBtn && answerBlock) {
            triggerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = item.classList.contains('active');

                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active', 'border-cyan-400');
                        otherItem.classList.add('border-cyan-500/20');
                        
                        const otherAnswer = otherItem.querySelector('.faq-answer-block') || otherItem.querySelector('.faq-answer') || otherItem.querySelector('div:nth-child(2)');
                        const otherIcon = otherItem.querySelector('.faq-icon i') || otherItem.querySelector('.fa-chevron-down') || otherItem.querySelector('i');
                        
                        if (otherAnswer) {
                            otherAnswer.style.cssText = 'display: block !important; max-height: none !important; overflow: hidden !important;';
                            gsap.to(otherAnswer, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut' });
                        }
                        if (otherIcon) gsap.to(otherIcon, { rotation: 0, duration: 0.3 });
                    }
                });

                if (!isOpen) {
                    item.classList.add('active', 'border-cyan-400');
                    item.classList.remove('border-cyan-500/20');
                    
                    answerBlock.style.cssText = 'display: block !important; max-height: none !important; overflow: hidden !important; height: auto;';
                    const targetHeight = answerBlock.scrollHeight;
                    answerBlock.style.height = '0px';
                    
                    gsap.to(answerBlock, { 
                        height: targetHeight, 
                        opacity: 1, 
                        duration: 0.4, 
                        ease: 'power2.out',
                        onComplete: () => {
                            answerBlock.style.height = 'auto';
                        }
                    });
                    if (chevronIcon) gsap.to(chevronIcon, { rotation: 180, duration: 0.3 });
                } else {
                    item.classList.remove('active', 'border-cyan-400');
                    item.classList.add('border-cyan-500/20');
                    
                    answerBlock.style.cssText = 'display: block !important; max-height: none !important; overflow: hidden !important; height: ' + answerBlock.scrollHeight + 'px;';
                    
                    gsap.to(answerBlock, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut' });
                    if (chevronIcon) gsap.to(chevronIcon, { rotation: 0, duration: 0.3 });
                }
            });
        }
    });

    const searchInput = document.getElementById('faq-search');
    const clearSearchBtn = document.getElementById('clear-search') || document.getElementById('search-clear');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (clearSearchBtn) {
                if (query.length > 0) {
                    clearSearchBtn.classList.remove('hidden');
                } else {
                    clearSearchBtn.classList.add('hidden');
                }
            }

            let matchCount = 0;

            faqItems.forEach(item => {
                const questionBtn = item.querySelector('.faq-question') || item.querySelector('button');
                const questionText = questionBtn ? questionBtn.textContent.toLowerCase() : '';
                
                if (query !== '' && questionText.includes(query)) {
                    item.style.display = 'block';
                    matchCount++;
                } else {
                    item.style.display = 'none';
                    if (item.classList.contains('active')) {
                        item.classList.remove('active', 'border-cyan-400');
                        item.classList.add('border-cyan-500/20');
                        const ans = item.querySelector('.faq-answer-block') || item.querySelector('.faq-answer') || item.querySelector('div:nth-child(2)');
                        const icn = item.querySelector('.faq-icon i') || item.querySelector('.fa-chevron-down') || item.querySelector('i');
                        if (ans) {
                            ans.style.cssText = 'display: block !important; max-height: none !important; overflow: hidden !important; height: 0px; opacity: 0;';
                        }
                        if (icn) gsap.set(icn, { rotation: 0 });
                    }
                }
            });

            if (noResultsMsg) {
                if (matchCount === 0 && query !== '') {
                    noResultsMsg.classList.remove('hidden');
                } else {
                    noResultsMsg.classList.add('hidden');
                }
            }
        });
    }

    if (clearSearchBtn && searchInput) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            faqItems.forEach(item => {
                item.style.display = 'none';
            });
            clearSearchBtn.classList.add('hidden');
            if (noResultsMsg) noResultsMsg.classList.add('hidden');
            searchInput.focus();
        });
    }

    const sections = document.querySelectorAll('main > section, .oracle-section');
    sections.forEach(section => {
        gsap.fromTo(section, 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.04,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    const footerGlowBox = document.getElementById('footer-glow-box');
    if (footerGlowBox) {
        document.addEventListener('mousemove', (e) => {
            const xPercent = e.clientX / window.innerWidth;
            const hueShift = Math.floor(xPercent * 60) + 180;
            footerGlowBox.style.filter = 'hue-rotate(' + hueShift + 'deg)';
        });
    }
});