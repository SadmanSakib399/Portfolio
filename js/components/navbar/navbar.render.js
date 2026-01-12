window.NavbarRender = {
    render(links) {
        const navInner = document.querySelector(".nav-inner");
        if (!navInner) return;

        const glider = navInner.querySelector(".nav-glider");

        navInner.querySelectorAll("a").forEach(a => a.remove());

        links.forEach(({ label, href }) => {
            const a = document.createElement("a");
            a.textContent = label;
            a.href = href;
            navInner.insertBefore(a, glider);
        });

        if (window.initNavbar) {
            initNavbar();
        }
    }
};
