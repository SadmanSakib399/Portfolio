window.NavbarGlider = (() => {
    function move(glider, navInner, el, animate = true) {
        if (!el || !glider || !navInner) return;

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

    return { move };
})();
