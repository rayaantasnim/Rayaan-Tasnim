document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('tech-stacks');
    if (!section) return;

    // Find the horizontal scroll container (flex container)
    const container = section.querySelector('.flex') || section.querySelector('[class*="flex"]') || section.firstElementChild;
    if (!container) return;

    let targetScrollLeft = container.scrollLeft;
    let currentScrollLeft = container.scrollLeft;
    let isAnimating = false;
    let touchStartY = 0;
    let touchStartX = 0;

    // Smooth scroll animation with easing
    function animate() {
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Clamp target
        targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScroll));

        // Linear interpolation (lerp) for smooth easing/inertia
        currentScrollLeft += (targetScrollLeft - currentScrollLeft) * 0.1;

        if (Math.abs(targetScrollLeft - currentScrollLeft) > 0.5) {
            container.scrollLeft = currentScrollLeft;
            requestAnimationFrame(animate);
        } else {
            container.scrollLeft = targetScrollLeft;
            currentScrollLeft = targetScrollLeft;
            isAnimating = false;
        }
    }

    function startAnimation() {
        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(animate);
        }
    }

    // Helper to check if section is pinned in viewport
    function isSectionActive() {
        const rect = section.getBoundingClientRect();
        // Section is active when its top is near top of viewport
        return rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
    }

    // Handle Mouse Wheel & Trackpad
    function handleWheel(e) {
        if (!isSectionActive()) return;

        const maxScroll = container.scrollWidth - container.clientWidth;
        const delta = e.deltaY || e.deltaX;

        // Scrolling Down / Right
        if (delta > 0 && container.scrollLeft < maxScroll - 1) {
            e.preventDefault();
            targetScrollLeft += delta;
            startAnimation();
        } 
        // Scrolling Up / Left
        else if (delta < 0 && container.scrollLeft > 1) {
            e.preventDefault();
            targetScrollLeft += delta;
            startAnimation();
        }
        // At the boundaries (start or end), allow default vertical scroll to release lock
    }

    // Handle Touch Events for Mobile Swipe
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
        if (!isSectionActive()) return;

        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        
        const deltaY = touchStartY - touchY;
        const deltaX = touchStartX - touchX;

        // Primary movement is vertical swipe
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            const maxScroll = container.scrollWidth - container.clientWidth;

            // Swiping Up -> Scroll Right inside section
            if (deltaY > 0 && container.scrollLeft < maxScroll - 1) {
                if (e.cancelable) e.preventDefault();
                targetScrollLeft += deltaY * 1.5;
                startAnimation();
            } 
            // Swiping Down -> Scroll Left inside section
            else if (deltaY < 0 && container.scrollLeft > 1) {
                if (e.cancelable) e.preventDefault();
                targetScrollLeft += deltaY * 1.5;
                startAnimation();
            }
        }

        touchStartY = touchY;
        touchStartX = touchX;
    }

    // Attach Event Listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
});