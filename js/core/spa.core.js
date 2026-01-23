// ===============================
// SPA CORE
// ===============================
window.SPA = (() => {

    // 🔒 Navigation lock
    let isNavigating = false;

    const listeners = {
        change: []
    };

    let appContent = null;

    function init() {
        document.body.classList.add("loaded");

        appContent = document.getElementById("app-content");
        if (!appContent) return;

        interceptLinks();
        handlePopState();
        initialLoad();
    }

    async function load(url, addToHistory = true) {
        if (isNavigating) return;
        isNavigating = true;

        try {
            if (!appContent) return;

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
                window.scrollTo(0, 0);
            }

            const page = url.split("/").pop();

            notifyChange({
                page,
                isInitial: !addToHistory
            });

        } catch (err) {
            console.error("SPA error:", err);
        } finally {
            // release lock after animations settle
            setTimeout(() => {
                isNavigating = false;
            }, 400);
        }
    }

    function interceptLinks() {
        document.addEventListener("click", (e) => {
            const link = e.target.closest("a");
            if (!link) return;

            const href = link.getAttribute("href");
            if (!href) return;

            // ONLY intercept SPA html navigation
            if (!href.endsWith(".html")) return;

            e.preventDefault();
            load(href);
        });
    }

    function handlePopState() {
        window.addEventListener("popstate", () => {
            const params = new URLSearchParams(window.location.search);
            const page = params.get("page") || "portfolio.html";
            load(page, false);
        });
    }

    function initialLoad() {
        const params = new URLSearchParams(window.location.search);
        const page = params.get("page") || "portfolio.html";
        load(page, false);
    }

    function onChange(fn) {
        listeners.change.push(fn);
    }

    function notifyChange(data) {
        listeners.change.forEach(fn => fn(data));
    }

    return {
        init,
        load,
        onChange
    };
})();

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", SPA.init);
