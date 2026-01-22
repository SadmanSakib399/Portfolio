window.SidebarController = (() => {
    let initialized = false;
    let smokeToggleSetup = false;

    function setup() {
        if (window.SidebarToggle) {
            SidebarToggle.init();
        }

        if (window.SidebarNavigation) {
            SidebarNavigation.init();
        }

        if (window.SidebarClose) {
            SidebarClose.init();
        }

        if (window.SidebarGlider) {
            SidebarGlider.init();
        }

        setupSmokeToggle();
    }

    function setupSmokeToggle() {
        if (smokeToggleSetup) return;

        const smokeToggle = document.getElementById("mouse-trail-toggle");
        if (!smokeToggle) return;

        smokeToggleSetup = true;

        // Force smoke OFF before setting up listener (handles refresh/hot reload)
        if (window.MouseSmoke) {
            MouseSmoke.disableSmoke();
        }

        // Set initial state to OFF
        smokeToggle.checked = false;

        smokeToggle.addEventListener("change", () => {
            if (window.MouseSmoke) {
                if (smokeToggle.checked) {
                    MouseSmoke.enableSmoke();
                } else {
                    MouseSmoke.disableSmoke();
                }
            }
        });
    }

    function setActiveRadio(radioId) {
        if (!radioId) return;

        const radio = document.getElementById(radioId);
        if (radio) {
            radio.checked = true;
        }
    }

    function init() {
        if (initialized) return;
        initialized = true;
        setup();
    }

    function refresh() {
        setup();
    }

    return {
        init,
        refresh,
        setActiveRadio
    };
})();

document.addEventListener("DOMContentLoaded", () => {
    if (window.SidebarController) {
        SidebarController.init();
    }
});
