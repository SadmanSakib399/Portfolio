(function () {
    let initialized = false;

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
    }

    function init() {
        if (initialized) return;
        initialized = true;
        setup();
    }

    function refresh() {
        setup();
    }

    window.SidebarController = {
        init,
        refresh
    };

    document.addEventListener("DOMContentLoaded", init);
})();
