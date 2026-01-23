// ===============================
// SINGLE SOURCE OF TRUTH
// ===============================
window.PAGE_CONFIG = {
    portfolio: {
        file: "portfolio.html",
        nav: [
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" }
        ],
        sidebarRadio: "radio-portfolio"
    },

    blogs: {
        file: "blogs.html",
        nav: [
            { label: "Blogs", href: "#" }
        ],
        sidebarRadio: "radio-blogs"
    },

    gallery: {
        file: "gallery.html",
        nav: [
            { label: "Gallery", href: "#" }
        ],
        sidebarRadio: "radio-gallery"
    },

    thoughts: {
        file: "thoughts.html",
        nav: [
            { label: "Thoughts", href: "#" }
        ],
        sidebarRadio: "radio-thoughts"
    },

    projects: {
        file: "projects.html",
        nav: [
            { label: "Home", href: "portfolio.html#home" },
            { label: "About", href: "portfolio.html#about" },
            { label: "Skills", href: "portfolio.html#skills" },
            { label: "Projects", href: "portfolio.html#projects" }
        ],
        sidebarRadio: "radio-portfolio",
        initialActiveNav: "#projects"
    }
};

window.SPALifecycle = (() => {
    let initialized = false;

    function init() {
        if (initialized) return;
        initialized = true;

        if (!window.SPA || !window.PAGE_CONFIG) {
            console.error("SPA or PAGE_CONFIG missing");
            return;
        }

        SPA.onChange(handlePageChange);

        // 🔥 IMPORTANT: force initial sync
        syncWithCurrentPage();
    }

    function syncWithCurrentPage() {
        const params = new URLSearchParams(window.location.search);
        const page = params.get("page") || "portfolio.html";
        handlePageChange({ page });
    }

    function handlePageChange({ page }) {
        const config = Object.values(PAGE_CONFIG).find(p => p.file === page);

        if (!config) {
            console.warn("No config for page:", page);
            return;
        }

        // ===== NAVBAR =====
        if (window.NavbarRender && config.nav) {
            NavbarRender.render(config.nav);
        }

        if (window.NavbarController) {
            NavbarController.refresh();
            
            // Set initial active link if specified (for pages like projects.html)
            if (config.initialActiveNav) {
                setTimeout(() => {
                    const activeLink = document.querySelector(`.nav-inner a[href="${config.initialActiveNav}"]`);
                    if (activeLink && window.NavbarController) {
                        NavbarController.setActiveLink(activeLink);
                    }
                }, 150);
            }
        }

        // ===== SIDEBAR =====
        if (window.SidebarController) {
            SidebarController.setActiveRadio(config.sidebarRadio);
            SidebarController.refresh();
        }

        // ===== ABOUT FILTER =====
        if (window.AboutFilter) {
            AboutFilter.init();
        }

        // ===== SKILLS =====
        if (window.initSkills) {
            initSkills();
        }


    }

    return { init };
})();

document.addEventListener("DOMContentLoaded", () => {
    SPALifecycle.init();
});
