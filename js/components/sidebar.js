// ===============================
// SIDEBAR TOGGLE
// ===============================
const toggle = document.getElementById("menu-toggle");
const sideNav = document.getElementById("side-nav");

if (toggle && sideNav) {
    toggle.addEventListener("change", () => {
        sideNav.classList.toggle("active", toggle.checked);
    });
}

// ===============================
// ROUTES
// ===============================
const routes = {
    "radio-portfolio": "index.html",
    "radio-blogs": "blogs.html",
    "radio-gallery": "gallery.html",
    "radio-thoughts": "thoughts.html"
};

// ===============================
// AUTO-CHECK RADIO BASED ON PAGE
// ===============================
const pageMap = {
    "index.html": "radio-portfolio",
    "blogs.html": "radio-blogs",
    "gallery.html": "radio-gallery",
    "thoughts.html": "radio-thoughts"
};

const currentPage = location.pathname.split("/").pop() || "index.html";
const activeRadioId = pageMap[currentPage];

if (activeRadioId) {
    const radio = document.getElementById(activeRadioId);
    if (radio) radio.checked = true;
}

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

        // HOVER → MOVE GLIDER ONLY
        label.addEventListener("mouseenter", () => {
            radio.checked = true;
        });

        // CLICK → NAVIGATE
        label.addEventListener("click", (e) => {
            e.preventDefault();

            activeRadio = radio;
            radio.checked = true;

            const target = routes[radio.id];
            if (!target) return;

            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = target;
            }, 400);
        });
    });

    // MOUSE LEAVE → RETURN TO ACTIVE
    radioContainer.addEventListener("mouseleave", () => {
        if (activeRadio) activeRadio.checked = true;
    });
}

// ===============================
// AUTO-CLOSE SIDEBAR
// ===============================

// Close on outside click
document.addEventListener("click", (e) => {
    if (!sideNav || !toggle) return;

    const clickedInsideSidebar = sideNav.contains(e.target);
    const clickedToggle = toggle.contains(e.target);

    if (!clickedInsideSidebar && !clickedToggle && sideNav.classList.contains("active")) {
        toggle.checked = false;
        sideNav.classList.remove("active");
    }
});

// Close on ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sideNav.classList.contains("active")) {
        toggle.checked = false;
        sideNav.classList.remove("active");
    }
});
