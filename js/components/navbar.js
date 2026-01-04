function getNavOffset() {
    const nav = document.querySelector(".top-nav");
    return nav ? nav.offsetHeight + 10 : 80;
}


const navLinks = document.querySelectorAll(".nav-inner a");
const sections = document.querySelectorAll("section");
const glider = document.querySelector(".nav-glider");
const navInner = document.querySelector(".nav-inner");

let activeLink = document.querySelector(".nav-inner a.active");

/* --- move underline under a link --- */
function moveGlider(el, animate = true) {
    if (!el) return;

    const linkRect = el.getBoundingClientRect();
    const parentRect = navInner.getBoundingClientRect();

    // disable animation if needed (for instant recalculation)
    glider.style.transition = animate
        ? ""
        : "none";

    glider.style.width = `${linkRect.width}px`;
    glider.style.left = `${linkRect.left - parentRect.left}px`;

    // re-enable transition after instant move
    if (!animate) {
        requestAnimationFrame(() => {
            glider.style.transition =
                "left 0.45s cubic-bezier(0.37, 1.95, 0.66, 0.56), width 0.45s cubic-bezier(0.37, 1.95, 0.66, 0.56)";
        });
    }
}

/* --- hover: follow mouse --- */
navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        moveGlider(link);
    });
});

/* --- leave navbar: return to active --- */
navInner.addEventListener("mouseleave", () => {
    moveGlider(activeLink);
});

/* --- click: set active manually --- */
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        activeLink = link;
        moveGlider(activeLink);
    });
});

/* --- scroll-spy: auto update active section --- */
window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 140) {
            currentSectionId = section.id;
        }
    });

    if (!currentSectionId) return;

    const newActive = document.querySelector(
        `.nav-inner a[href="#${currentSectionId}"]`
    );

    if (newActive && newActive !== activeLink) {
        navLinks.forEach(l => l.classList.remove("active"));
        newActive.classList.add("active");
        activeLink = newActive;
        moveGlider(activeLink);
    }
});

/* --- INITIAL ENTRY ANIMATION --- */
window.addEventListener("load", () => {
    // start from far left, invisible
    glider.style.width = "0px";
    glider.style.left = "0px";
    glider.style.opacity = "0";

    // wait for layout + fonts to settle
    setTimeout(() => {
        glider.style.opacity = "1";
        moveGlider(activeLink);
    }, 120);
});

/* --- KEEP POSITION ON RESIZE --- */
let resizeTimeout;
["resize", "orientationchange"].forEach(evt => {
    window.addEventListener(evt, () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            moveGlider(activeLink, false);
        }, 100);
    });
});

