window.NavbarController = (() => {
    let initialized = false;

    let navLinks = [];
    let glider = null;
    let navInner = null;
    let activeLink = null;

    function setup() {
        const nav = document.querySelector(".top-nav");
        if (!nav) return;

        navLinks = Array.from(document.querySelectorAll(".nav-inner a"));
        glider = document.querySelector(".nav-glider");
        navInner = document.querySelector(".nav-inner");

        if (!navLinks.length || !glider || !navInner) return;

        activeLink = document.querySelector(".nav-inner a.active") || navLinks[0];
        if (activeLink) activeLink.classList.add("active");

        // ScrollSpy
        if (window.NavbarScrollSpy) {
            NavbarScrollSpy.init(navLinks, glider, navInner, activeLink);
        }

        bindLinkEvents();
        bindLeaveEvent();
        moveGliderInitial();
        bindResizeHandler();
    }

    function bindLinkEvents() {
        navLinks.forEach(link => {
            link.onmouseenter = () => {
                if (window.NavbarGlider) {
                    NavbarGlider.move(glider, navInner, link);
                }
            };

            link.onclick = (e) => {
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

                const navOffset = document.querySelector(".top-nav")?.offsetHeight || 80;
                const y = target.getBoundingClientRect().top + window.pageYOffset - navOffset;

                window.scrollTo({
                    top: y,
                    behavior: "smooth"
                });
            };
        });
    }

    function bindLeaveEvent() {
        navInner.onmouseleave = () => {
            if (window.NavbarGlider && activeLink) {
                NavbarGlider.move(glider, navInner, activeLink);
            }
        };
    }

    function moveGliderInitial() {
        setTimeout(() => {
            if (window.NavbarGlider && activeLink) {
                NavbarGlider.move(glider, navInner, activeLink, false);
            }
        }, 50);
    }

    function bindResizeHandler() {
        let resizeTimeout;

        const handler = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.NavbarGlider && activeLink) {
                    NavbarGlider.move(glider, navInner, activeLink, false);
                }
            }, 100);
        };

        window.removeEventListener("resize", window.__navbarResize);
        window.removeEventListener("orientationchange", window.__navbarResize);

        window.__navbarResize = handler;

        window.addEventListener("resize", window.__navbarResize);
        window.addEventListener("orientationchange", window.__navbarResize);
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

    function setActiveLink(link) {
        if (!link) return;
        
        // Ensure we have current references
        if (!navInner) navInner = document.querySelector(".nav-inner");
        if (!glider) glider = document.querySelector(".nav-glider");
        if (!navLinks.length && navInner) {
            navLinks = Array.from(navInner.querySelectorAll("a"));
        }
        
        // Update internal state
        activeLink = link;
        
        // Update active class
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        
        // Move glider to active link
        if (window.NavbarGlider && glider && navInner) {
            NavbarGlider.move(glider, navInner, activeLink, false);
        }
        
        // Update ScrollSpy if it exists
        if (window.NavbarScrollSpy && navLinks.length && glider && navInner) {
            NavbarScrollSpy.init(navLinks, glider, navInner, activeLink);
        }
    }

    return {
        init,
        refresh,
        setActiveLink
    };
})();

document.addEventListener("DOMContentLoaded", () => {
    if (window.NavbarController) {
        NavbarController.init();
    }
});
