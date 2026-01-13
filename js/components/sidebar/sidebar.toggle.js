window.SidebarToggle = (() => {
    function init() {
        const toggle = document.getElementById("menu-toggle");
        const sideNav = document.getElementById("side-nav");

        if (!toggle || !sideNav) return;

        toggle.addEventListener("change", () => {
            sideNav.classList.toggle("active", toggle.checked);
        });
    }

    return { init };
})();
