// ===============================
// SPA LIFECYCLE
// ===============================
window.__onSpaPageChange = function ({ page, isInitial }) {

    // ===== TOP NAV CONFIG =====
    if (window.renderTopNav) {

        if (page === "portfolio.html") {
            renderTopNav([
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" }
            ]);
        }

        if (page === "blogs.html") {
            renderTopNav([{ label: "Blogs", href: "#" }]);
        }

        if (page === "gallery.html") {
            renderTopNav([{ label: "Gallery", href: "#" }]);
        }

        if (page === "thoughts.html") {
            renderTopNav([{ label: "Thoughts", href: "#" }]);
        }
    }

        // ===== SIDEBAR SYNC =====
    if (window.syncSidebarWithPage) {
        window.syncSidebarWithPage(page);
    }


};