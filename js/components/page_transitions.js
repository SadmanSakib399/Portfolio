document.addEventListener("DOMContentLoaded", () => {

    const appContent = document.getElementById("app-content");
    if (!appContent) {
        console.warn("No #app-content found.");
        return;
    }

    async function loadPage(url, addToHistory = true) {
        // Animate out
        appContent.classList.add("page-exit");

        await new Promise(res => setTimeout(res, 300));

        try {
            const res = await fetch(url);
            const html = await res.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const newContent = doc.querySelector("#app-content");

            if (!newContent) {
                window.location.href = url;
                return;
            }

            // Swap content
            appContent.innerHTML = newContent.innerHTML;

            // Animate in
            appContent.classList.remove("page-exit");
            appContent.classList.add("page-enter");

            setTimeout(() => {
                appContent.classList.remove("page-enter");
            }, 300);

            if (addToHistory) {
                history.pushState({}, "", url);
            }

            window.scrollTo(0, 0);

        } catch (err) {
            console.error("SPA load error:", err);
            window.location.href = url;
        }
    }

    // Back / forward
    window.addEventListener("popstate", () => {
        loadPage(location.pathname, false);
    });

    // Intercept <a> links
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;

        const href = link.getAttribute("href");

        if (!href || href.startsWith("#") || href.startsWith("http")) return;

        e.preventDefault();
        loadPage(href);
    });

    // Make global for sidebar.js
    window.loadPage = loadPage;
});
