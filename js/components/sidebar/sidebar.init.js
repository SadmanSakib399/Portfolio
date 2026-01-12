// ===============================
// SIDEBAR TOGGLE (NATIVE CHECKBOX)
// ===============================
const toggle = document.getElementById("menu-toggle");
const sideNav = document.getElementById("side-nav");

if (toggle && sideNav) {
    toggle.addEventListener("change", () => {
        sideNav.classList.toggle("active", toggle.checked);
    });
}

// ===============================
// AUTO-CHECK RADIO BASED ON PAGE
// ===============================
const pageMap = {
    "portfolio.html": "radio-portfolio",
    "blogs.html": "radio-blogs",
    "gallery.html": "radio-gallery",
    "thoughts.html": "radio-thoughts"
};

// ===============================
// HOVER GLIDER + CLICK NAVIGATION
// ===============================
const radioContainer = document.querySelector(".radio-container");
const radios = document.querySelectorAll(".radio-container input[type='radio']");

if (radioContainer && radios.length) {
    let activeRadio = document.querySelector(".radio-container input:checked");

    radios.forEach(radio => {
        const label = radio.nextElementSibling;
        if (!label) return;

        // Hover → move glider only
        label.addEventListener("mouseenter", () => {
            radio.checked = true;
        });

        // Click → SPA navigate
        label.addEventListener("click", (e) => {
            e.preventDefault();

            activeRadio = radio;
            radio.checked = true;

            // Close sidebar
            if (toggle && sideNav) {
                toggle.checked = false;
                sideNav.classList.remove("active");
            }

            const entry = Object.values(PAGE_CONFIG).find(p => p.sidebarRadio === radio.id);
            if (!entry) return;

            const target = entry.file;

            if (!target) return;

            const app = document.getElementById("app-content");
            if (!app) return;

            app.classList.add("fade-out");

            setTimeout(() => {
                app.classList.remove("fade-out");
                SPA.load(target);
            }, 300);
        });
    });

    // Mouse leave → return to active
    radioContainer.addEventListener("mouseleave", () => {
        if (activeRadio) activeRadio.checked = true;
    });
}

// ===============================
// OUTSIDE CLICK CLOSE
// ===============================
document.addEventListener("click", (e) => {
    if (!toggle || !sideNav) return;

    const clickedInsideSidebar = sideNav.contains(e.target);
    const clickedToggle = e.target.closest(".hamburger");

    if (clickedInsideSidebar || clickedToggle) return;

    if (toggle.checked) {
        toggle.checked = false;
        sideNav.classList.remove("active");
    }
});

// ===============================
// ESC CLOSE
// ===============================
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.checked) {
        toggle.checked = false;
        sideNav.classList.remove("active");
    }
});
