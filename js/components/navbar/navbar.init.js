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
    NavbarScrollSpy.init(navLinks, glider, navInner, activeLink);

    navLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            NavbarGlider.move(glider, navInner, link);
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
            NavbarGlider.move(glider, navInner, activeLink);

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
        NavbarGlider.move(glider, navInner, activeLink);
    });

    // Initial positioning
    setTimeout(() => {
        NavbarGlider.move(glider, navInner, activeLink, false);
    }, 50);

    // Resize handling
    let resizeTimeout;
    ["resize", "orientationchange"].forEach(evt => {
        window.addEventListener(evt, () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                NavbarGlider.move(glider, navInner, activeLink, false);
            }, 100);
        });
    });
}

// Make callable after SPA loads
window.initNavbar = initNavbar;

// Init on first load
document.addEventListener("DOMContentLoaded", initNavbar);



