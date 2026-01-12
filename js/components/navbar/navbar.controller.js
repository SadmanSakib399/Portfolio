(function () {
    let initialized = false;

    function setup() {
        const nav = document.querySelector(".top-nav");
        if (!nav) return;

        const navLinks = document.querySelectorAll(".nav-inner a");
        const glider = document.querySelector(".nav-glider");
        const navInner = document.querySelector(".nav-inner");

        if (!navLinks.length || !glider || !navInner) return;

        let activeLink = document.querySelector(".nav-inner a.active");
        if (!activeLink) {
            activeLink = navLinks[0];
            if (activeLink) activeLink.classList.add("active");
        }

        // ScrollSpy
        if (window.NavbarScrollSpy) {
            NavbarScrollSpy.init(navLinks, glider, navInner, activeLink);
        }

        navLinks.forEach(link => {
            link.addEventListener("mouseenter", () => {
                if (window.NavbarGlider) {
                    NavbarGlider.move(glider, navInner, link);
                }
            });

            link.addEventListener("click", (e) => {
                const hash = link.getAttribute("href");
                if (!hash || !hash.startsWith("#")) return;

                const target = document.querySelector(hash);
                if (!target) return;

                e.preventDefault();

                navLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
                activeLink = link;

                if (window.NavbarGlider) {
                    NavbarGlider.move(glider, navInner, activeLink);
                }

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
            if (window.NavbarGlider) {
                NavbarGlider.move(glider, navInner, activeLink);
            }
        });

        // Initial positioning
        setTimeout(() => {
            if (window.NavbarGlider) {
                NavbarGlider.move(glider, navInner, activeLink, false);
            }
        }, 50);

        // Resize handling
        let resizeTimeout;
        ["resize", "orientationchange"].forEach(evt => {
            window.addEventListener(evt, () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    if (window.NavbarGlider) {
                        NavbarGlider.move(glider, navInner, activeLink, false);
                    }
                }, 100);
            });
        });
    }

    function init() {
        if (initialized) return;
        initialized = true;

        setup();

        if (window.NavbarBackground) {
            NavbarBackground.init();
        }
    }

    function refresh() {
        setup();
    }

    window.NavbarController = {
        init,
        refresh
    };

    document.addEventListener("DOMContentLoaded", init);
})();
