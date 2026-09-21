
(function () {
    "use strict";

    var quotes = [
    "“Don't stay a consumer. Build your legacy.”",
    "“More than what you imagine”"
    ];
    var quoteIdx = 0;
    var quoteEl = document.getElementById("flashQuote");
    
    var quoteInterval = setInterval(function() {
    quoteIdx = (quoteIdx + 1) % quotes.length;
    if (quoteEl) quoteEl.textContent = quotes[quoteIdx];
    }, 1500);

    var progress = 0;
    var bar = document.getElementById("flashBar");
    var percentageEl = document.getElementById("flashPercentage");
    var flashScreen = document.getElementById("flashScreen");

    var loadingInterval = setInterval(function() {
    progress += Math.floor(Math.random() * 8) + 5;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        clearInterval(quoteInterval);
        if (quoteEl) quoteEl.textContent = "“More than what you imagine”";
        if (percentageEl) percentageEl.textContent = "100%";
        if (bar) bar.style.width = "100%";
        
        setTimeout(function() {
        if (flashScreen) {
            flashScreen.classList.add("exploding");
            setTimeout(function() {
            flashScreen.classList.add("fade-out");
            }, 400);
        }
        }, 200);
    } else {
        if (bar) bar.style.width = progress + "%";
        if (percentageEl) percentageEl.textContent = progress + "%";
    }
    }, 120);

    const canvasSky = document.getElementById('skyCanvas');
    if (canvasSky) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasSky, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const starCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 50;
        starPositions[i + 1] = (Math.random() - 0.5) * 50;
        starPositions[i + 2] = (Math.random() - 0.5) * 50;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.12,
        transparent: true,
        opacity: 0.8
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    });

    const clock = new THREE.Clock();
    function animateSky() {
        requestAnimationFrame(animateSky);
        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        starField.rotation.y = elapsedTime * 0.03 + targetX;
        starField.rotation.x = elapsedTime * 0.02 + targetY;

        const positions = starGeometry.attributes.position.array;
        for (let i = 2; i < starCount * 3; i += 3) {
        positions[i] += 0.02;
        if (positions[i] > 25) {
            positions[i] = -25;
        }
        }
        starGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }
    animateSky();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    }

    const dashboardCanvas = document.getElementById('dashboardCanvas');
    if (dashboardCanvas) {
    const dbScene = new THREE.Scene();
    const dbCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    dbCamera.position.z = 10;

    const dbRenderer = new THREE.WebGLRenderer({ canvas: dashboardCanvas, alpha: true, antialias: true });
    dbRenderer.setSize(window.innerWidth, window.innerHeight);

    const geom = new THREE.IcosahedronGeometry(3, 2);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00b4d8, wireframe: true, transparent: true, opacity: 0.35 });
    const sphereMesh = new THREE.Mesh(geom, mat);
    dbScene.add(sphereMesh);

    let dbMouseX = 0, dbMouseY = 0;
    window.addEventListener('mousemove', (e) => {
        dbMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        dbMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateDashboard() {
        requestAnimationFrame(animateDashboard);
        sphereMesh.rotation.x += 0.005 + dbMouseY * 0.02;
        sphereMesh.rotation.y += 0.007 + dbMouseX * 0.02;
        dbRenderer.render(dbScene, dbCamera);
    }
    animateDashboard();
    }

    var megaToggle = document.getElementById("megaMenuToggleBtn");
    var mobileDashboardBtn = document.getElementById("mobileDashboardBtn");
    var megaOverlay = document.getElementById("megaMenuOverlay");
    var megaClose = document.getElementById("megaMenuCloseBtn");
    var megaLinks = document.querySelectorAll(".mega-menu-link");

    function setMegaMenu(open) {
    if (megaOverlay) {
        megaOverlay.classList.toggle("is-open", open);
        megaOverlay.setAttribute("aria-hidden", String(!open));
        document.body.style.overflow = open ? "hidden" : "";
    }
    }

    if (megaToggle) {
    megaToggle.addEventListener("click", function() {
        setMegaMenu(true);
    });
    }
    if (mobileDashboardBtn) {
    mobileDashboardBtn.addEventListener("click", function() {
        setMobileMenuCard(false);
        setMegaMenu(true);
    });
    }
    if (megaClose) {
    megaClose.addEventListener("click", function() {
        setMegaMenu(false);
    });
    }
    megaLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        setMegaMenu(false);
    });
    });

    var menuDropdownBtn = document.getElementById("menuDropdownBtn");
    var mobileMenuCard = document.getElementById("mobileMenuCard");
    var navDrawerTriggerBtn = document.getElementById("navDrawerTriggerBtn");

    function setMobileMenuCard(open) {
    if (mobileMenuCard) {
        mobileMenuCard.classList.toggle("is-open", open);
    }
    }

    if (menuDropdownBtn) {
    menuDropdownBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        var isOpen = mobileMenuCard.classList.contains("is-open");
        setMobileMenuCard(!isOpen);
    });
    }

    document.addEventListener("click", function(e) {
    if (mobileMenuCard && !mobileMenuCard.contains(e.target) && e.target !== menuDropdownBtn) {
        setMobileMenuCard(false);
    }
    });

    var navToggler = document.getElementById("navTogglerBtn");
    var navDrawer = document.getElementById("foldedNavDrawer");
    var navOverlay = document.getElementById("foldedNavOverlay");
    var navClose = document.getElementById("navDrawerCloseBtn");
    var drawerLinks = document.querySelectorAll(".nav-drawer-link");

    function setFoldedDrawer(open) {
    if (navDrawer && navOverlay) {
        navDrawer.classList.toggle("is-open", open);
        navOverlay.classList.toggle("is-open", open);
        document.body.style.overflow = open ? "hidden" : "";
    }
    }

    if (navToggler) {
    navToggler.addEventListener("click", function() {
        setFoldedDrawer(true);
    });
    }
    if (navDrawerTriggerBtn) {
    navDrawerTriggerBtn.addEventListener("click", function() {
        setMobileMenuCard(false);
        setFoldedDrawer(true);
    });
    }
    if (navClose) {
    navClose.addEventListener("click", function() {
        setFoldedDrawer(false);
    });
    }
    if (navOverlay) {
    navOverlay.addEventListener("click", function() {
        setFoldedDrawer(false);
    });
    }
    drawerLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        setFoldedDrawer(false);
    });
    });

    document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        setFoldedDrawer(false);
        setMegaMenu(false);
        setMobileMenuCard(false);
    }
    });

    var observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
        });
    },
    { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(function (node) {
    observer.observe(node);
    });

    //=============================== 
    //Competitive Programming Journey cards here 
    //Will be placed just here
    //===============================

    var cpSection = document.getElementById("cp-journey-section");
    var cpCard = document.getElementById("cpCard3D");
    var cpBadge = document.getElementById("cpCardBadge");
    var cpTitle = document.getElementById("cpCardTitle");
    var cpText = document.getElementById("cpCardText");
    var cpImg = document.getElementById("cpCardImg");
    var currentStepIndex = -1;

    window.addEventListener("scroll", function() {
    if (!cpSection || !cpCard) return;
    var rect = cpSection.getBoundingClientRect();
    var sectionHeight = cpSection.offsetHeight - window.innerHeight;
    if (sectionHeight <= 0) return;
    
    var scrollProgress = -rect.top / sectionHeight;
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));

    var step = Math.floor(scrollProgress * cpSteps.length);
    if (step >= cpSteps.length) step = cpSteps.length - 1;

    if (step !== currentStepIndex) {
        currentStepIndex = step;
        var data = cpSteps[step];

        if (step === 0) {
        cpCard.style.background = "linear-gradient(160deg, rgba(30, 20, 8, 0.92), rgba(10, 6, 2, 0.8))";
        cpCard.style.borderColor = "rgba(212, 175, 55, 0.8)";
        cpCard.style.boxShadow = "0 0 45px rgba(212, 175, 55, 0.4)";
        } else if (step % 2 === 0) {
        cpCard.style.background = "linear-gradient(160deg, rgba(8, 22, 38, 0.9), rgba(3, 8, 18, 0.75))";
        cpCard.style.borderColor = "rgba(0, 243, 255, 0.8)";
        cpCard.style.boxShadow = "0 0 50px rgba(0, 243, 255, 0.5)";
        } else {
        cpCard.style.background = "linear-gradient(160deg, rgba(22, 12, 28, 0.9), rgba(8, 4, 12, 0.75))";
        cpCard.style.borderColor = "rgba(212, 175, 55, 0.8)";
        cpCard.style.boxShadow = "0 0 50px rgba(212, 175, 55, 0.5)";
        }

        cpCard.style.transform = "rotateX(" + (Math.sin(step * 2) * 15) + "deg) rotateY(" + (Math.cos(step * 2) * 15) + "deg) scale(1.05)";

        setTimeout(function() {
        cpBadge.textContent = data.badge;
        cpTitle.textContent = data.title;
        cpText.textContent = data.text;
        if (cpImg) cpImg.src = data.img;
        cpCard.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        }, 300);
    }
    });

    var counters = document.querySelectorAll(".counter");
    var animatedCounters = false;

    var metricsSection = document.getElementById("metrics");
    if (metricsSection) {
    var metricsObserver = new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
        if (entry.isIntersecting && !animatedCounters) {
            animatedCounters = true;
            counters.forEach(function(counter) {
            var target = parseFloat(counter.getAttribute("data-target"));
            var decimals = counter.getAttribute("data-decimals") ? parseInt(counter.getAttribute("data-decimals")) : 0;
            var duration = 3000;
            var startTime = null;

            function updateCount(currentTime) {
                if (!startTime) startTime = currentTime;
                var progressTime = currentTime - startTime;
                var currentVal = Math.min(progressTime / duration, 1) * target;
                counter.textContent = currentVal.toFixed(decimals);
                if (progressTime < duration) {
                requestAnimationFrame(updateCount);
                } else {
                counter.textContent = decimals > 0 ? target.toFixed(decimals) : target;
                }
            }
            requestAnimationFrame(updateCount);
            });
            obs.unobserve(entry.target);
        }
        });
    }, { threshold: 0.3 });
    metricsObserver.observe(metricsSection);
    }
})();
