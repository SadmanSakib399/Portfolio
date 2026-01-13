window.SidebarNavigation = (() => {
    function init() {
        const toggle = document.getElementById("menu-toggle");
        const sideNav = document.getElementById("side-nav");

        const radios = document.querySelectorAll(".radio-container input[type='radio']");
        if (!radios.length) return;

        let activeRadio = document.querySelector(".radio-container input:checked");

        radios.forEach(radio => {
            const label = radio.nextElementSibling;
            if (!label) return;

            // Click → SPA navigation
            label.addEventListener("click", (e) => {
                e.preventDefault();

                activeRadio = radio;
                radio.checked = true;

                // Close sidebar
                if (toggle && sideNav) {
                    toggle.checked = false;
                    sideNav.classList.remove("active");
                }

                const entry = Object.values(PAGE_CONFIG).find(p => p.sidebarRadio === radio.id);
                if (!entry) return;

                const target = entry.file;
                if (!target) return;

                const app = document.getElementById("app-content");
                if (!app) return;

                app.classList.add("fade-out");

                setTimeout(() => {
                    app.classList.remove("fade-out");
                    SPA.load(target);
                }, 300);
            });
        });
    }

    return { init };
})();
