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
    }
};

document.addEventListener("DOMContentLoaded", () => {
    if (!window.SPA || !window.PAGE_CONFIG) {
        console.error("SPA or PAGE_CONFIG missing");
        return;
    }

    SPA.onChange(({ page }) => {
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
        }

        // ===== SIDEBAR =====
        if (window.SidebarController) {
            SidebarController.setActiveRadio(config.sidebarRadio);
            SidebarController.refresh();
        }

    });
});
