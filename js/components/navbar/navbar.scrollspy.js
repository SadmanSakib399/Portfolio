window.NavbarScrollSpy = (() => {
    let activeLink = null;

    function getNavOffset() {
        const nav = document.querySelector(".top-nav");
        return nav ? nav.offsetHeight + 10 : 80;
    }

    function onScroll(navLinks, glider, navInner) {
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

        if (newActive !== activeLink) {
            navLinks.forEach(l => l.classList.remove("active"));
            newActive.classList.add("active");
            activeLink = newActive;
            NavbarGlider.move(glider, navInner, activeLink);
        }
    }

    function init(navLinks, glider, navInner, initialActive) {
        activeLink = initialActive;

        function handler() {
            onScroll(navLinks, glider, navInner);
        }

        window.removeEventListener("scroll", window.__spaScrollSpy);
        window.__spaScrollSpy = handler;
        window.addEventListener("scroll", window.__spaScrollSpy);
    }

    return { init };
})();
