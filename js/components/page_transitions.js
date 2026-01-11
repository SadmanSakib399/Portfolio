// Fade IN on load
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
});

// Fade OUT on link click
document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#")) return;

    link.addEventListener("click", e => {
        e.preventDefault();
        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = href;
        }, 400);
    });
});


