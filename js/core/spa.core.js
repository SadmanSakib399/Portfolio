// ===============================
// SPA CORE
// ===============================
window.SPA = (() => {
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
        if (!appContent) return;

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
                window.scrollTo(0, 0);
            }

            const page = url.split("/").pop();

            notifyChange({
                page,
                isInitial: !addToHistory
            });

        } catch (err) {
            console.error("SPA error:", err);
        }
    }

    function interceptLinks() {
        document.addEventListener("click", (e) => {
            const link = e.target.closest("a");
            if (!link) return;

            const href = link.getAttribute("href");
            if (!href || href.startsWith("#") || href.startsWith("http")) return;

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
