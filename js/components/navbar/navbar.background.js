window.NavbarBackground = (() => {
    function init() {
        const nav = document.querySelector(".top-nav");
        if (!nav) return;

        function onScroll() {
            if (window.scrollY > 10) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        }

        window.removeEventListener("scroll", window.__navBgScroll);
        window.__navBgScroll = onScroll;
        window.addEventListener("scroll", window.__navBgScroll);

        onScroll(); // initial state
    }

    return { init };
})();
