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

            // Extract hash from URL if present
            const urlParts = url.split("#");
            const pageUrl = urlParts[0];
            const hash = urlParts[1] ? "#" + urlParts[1] : null;

            appContent.classList.add("page-exit");
            await new Promise(res => setTimeout(res, 300));

            const res = await fetch(pageUrl);
            const html = await res.text();

            appContent.innerHTML = html;

            appContent.classList.remove("page-exit");
            appContent.classList.add("page-enter");

            setTimeout(() => {
                appContent.classList.remove("page-enter");
                
                // Scroll to hash after page transition completes
                if (hash) {
                    requestAnimationFrame(() => {
                        const target = document.querySelector(hash);
                        if (target) {
                            const navOffset = document.querySelector(".top-nav")?.offsetHeight || 80;
                            const y = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
                            window.scrollTo({
                                top: y,
                                behavior: "smooth"
                            });
                        }
                    });
                }
            }, 300);

            if (addToHistory) {
                const newUrl = hash ? `?page=${pageUrl}${hash}` : `?page=${pageUrl}`;
                history.pushState({}, "", newUrl);
                if (!hash) {
                    window.scrollTo(0, 0);
                }
            }

            const page = pageUrl.split("/").pop();

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
        const hash = window.location.hash;
        const urlWithHash = hash ? `${page}${hash}` : page;
        load(urlWithHash, false);
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
