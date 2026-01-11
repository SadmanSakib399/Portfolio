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
                history.pushState({}, "", url);
            }

            window.scrollTo(0, 0);

            const page = url.split("/").pop();

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
        const path = location.pathname.split("/").pop() || "portfolio.html";
        loadPage(path, false);
    });

    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("http")) return;

        e.preventDefault();
        loadPage(href);
    });

    const initial = location.pathname.split("/").pop();
    if (!initial || initial === "index.html") {
        loadPage("portfolio.html", false);
    } else {
        loadPage(initial, false);
    }
});
