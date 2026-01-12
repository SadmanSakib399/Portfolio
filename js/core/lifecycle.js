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
        if (window.renderTopNav && config.nav) {
            renderTopNav(config.nav);
        }

        // ===== SIDEBAR =====
        if (config.sidebarRadio) {
            const radio = document.getElementById(config.sidebarRadio);
            if (radio) radio.checked = true;
        }
    });
});
