function initNavbar() {
    function getNavOffset() {
        const nav = document.querySelector(".top-nav");
        return nav ? nav.offsetHeight + 10 : 80;
    }

    const nav = document.querySelector(".top-nav");
    if (!nav) return;

    function handleNavBackground() {
        if (window.scrollY > 20) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }

    window.removeEventListener("scroll", window.__navBgScroll);
    window.__navBgScroll = handleNavBackground;
    window.addEventListener("scroll", window.__navBgScroll);

    // Run once
    handleNavBackground();


    const navLinks = document.querySelectorAll(".nav-inner a");
    const glider = document.querySelector(".nav-glider");
    const navInner = document.querySelector(".nav-inner");

    if (!navLinks.length || !glider || !navInner) return;

    let activeLink = document.querySelector(".nav-inner a.active");
    if (!activeLink) {
        activeLink = navLinks[0];
        if (activeLink) activeLink.classList.add("active");
    }



    function moveGlider(el, animate = true) {
        if (!el) return;

        const linkRect = el.getBoundingClientRect();
        const parentRect = navInner.getBoundingClientRect();

        glider.style.transition = animate ? "" : "none";
        glider.style.width = `${linkRect.width}px`;
        glider.style.left = `${linkRect.left - parentRect.left}px`;

        if (!animate) {
            requestAnimationFrame(() => {
                glider.style.transition =
                    "left 0.45s cubic-bezier(0.37, 1.95, 0.66, 0.56), width 0.45s cubic-bezier(0.37, 1.95, 0.66, 0.56)";
            });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            moveGlider(link);
        });

        link.addEventListener("click", (e) => {
            const hash = link.getAttribute("href");
            if (!hash || !hash.startsWith("#")) return;

            const target = document.querySelector(hash);
            if (!target) return;

            // ✅ STOP native anchor jump
            e.preventDefault();

            // Set active immediately
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            activeLink = link;
            moveGlider(activeLink);

            // ✅ Controlled scroll with offset
            const navOffset = nav?.offsetHeight || 80;

            const y =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navOffset;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        });

    });

    navInner.addEventListener("mouseleave", () => {
        moveGlider(activeLink);
    });

    // ===== SPA-SAFE SCROLLSPY =====
    function onScroll() {
        const sections = document.querySelectorAll("#app-content section");
        let currentSectionId = "";

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - getNavOffset()) {
                currentSectionId = section.id;
            }
        });

        if (!currentSectionId) return;

        const newActive = document.querySelector(
            `.nav-inner a[href="#${currentSectionId}"]`
        );

        if (!newActive) return;


        if (newActive && newActive !== activeLink) {
            navLinks.forEach(l => l.classList.remove("active"));
            newActive.classList.add("active");
            activeLink = newActive;
            moveGlider(activeLink);
        }
    }

    window.removeEventListener("scroll", window.__spaScrollSpy);
    window.__spaScrollSpy = onScroll;
    window.addEventListener("scroll", window.__spaScrollSpy);

    // Initial positioning
    setTimeout(() => {
        moveGlider(activeLink, false);
    }, 50);

    // Resize handling
    let resizeTimeout;
    ["resize", "orientationchange"].forEach(evt => {
        window.addEventListener(evt, () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                moveGlider(activeLink, false);
            }, 100);
        });
    });
}

// Make callable after SPA loads
window.initNavbar = initNavbar;

// Init on first load
document.addEventListener("DOMContentLoaded", initNavbar);



