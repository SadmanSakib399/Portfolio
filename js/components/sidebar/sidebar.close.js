window.SidebarClose = (() => {
    function init() {
        const toggle = document.getElementById("menu-toggle");
        const sideNav = document.getElementById("side-nav");

        if (!toggle || !sideNav) return;

        // ===============================
        // OUTSIDE CLICK CLOSE
        // ===============================
        document.addEventListener("click", (e) => {
            const clickedInsideSidebar = sideNav.contains(e.target);
            const clickedToggle = e.target.closest(".hamburger");

            if (clickedInsideSidebar || clickedToggle) return;

            if (toggle.checked) {
                toggle.checked = false;
                sideNav.classList.remove("active");
            }
        });

        // ===============================
        // ESC CLOSE
        // ===============================
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && toggle.checked) {
                toggle.checked = false;
                sideNav.classList.remove("active");
            }
        });
    }

    return { init };
})();
