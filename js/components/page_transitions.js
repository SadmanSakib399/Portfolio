window.onPageChange = function (page) {

    if (!window.renderTopNav) return;

    // ===== PORTFOLIO / HOME =====
    if (page === "portfolio.html") {
        renderTopNav([
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" }
        ]);
        return;
    }

    // ===== BLOGS =====
    if (page === "blogs.html") {
        renderTopNav([
            { label: "Blogs", href: "#" }
        ]);
        return;
    }

    // ===== GALLERY =====
    if (page === "gallery.html") {
        renderTopNav([
            { label: "Gallery", href: "#" }
        ]);
        return;
    }

    // ===== THOUGHTS =====
    if (page === "thoughts.html") {
        renderTopNav([
            { label: "Thoughts", href: "#" }
        ]);
        return;
    }
};


document.body.classList.add("loaded");

document.addEventListener("DOMContentLoaded", () => {
    const appContent = document.getElementById("app-content");
    if (!appContent) return;

    async function loadPage(url, addToHistory = true) {
        try {
            appContent.classList.add("page-exit");
            await new Promise(res => setTimeout(res, 300));

            const res = await fetch(url);
            const html = await res.text();

            appContent.innerHTML = html;

            appContent.classList.remove("page-exit");
            appContent.classList.add("page-enter");

            setTimeout(() => {
                appContent.classList.remove("page-enter");
            }, 300);

            if (addToHistory) {
                history.pushState({}, "", "?page=" + url);
            }

            window.scrollTo(0, 0);

            const page = url.split("/").pop();
            if (window.onPageChange) {
                window.onPageChange(page);
            }


            // ✅ ONLY sync state, NO reinit
            if (window.setTopNavActiveByPage) {
                window.setTopNavActiveByPage(page);
            }

            if (window.syncSidebarWithPage) {
                window.syncSidebarWithPage(url);
            }

        } catch (err) {
            console.error("SPA error:", err);
        }
    }

    window.loadPage = loadPage;

    window.addEventListener("popstate", () => {
        const params = new URLSearchParams(window.location.search);
        const page = params.get("page") || "portfolio.html";
        loadPage(page, false);
    });


    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("http")) return;

        e.preventDefault();
        loadPage(href);
    });

    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || "portfolio.html";
    loadPage(page, false);

});
