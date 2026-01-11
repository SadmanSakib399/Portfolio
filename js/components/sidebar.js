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

        // Hover → move glider only
        label.addEventListener("mouseenter", () => {
            radio.checked = true;
        });

        // Click → navigate
        label.addEventListener("click", (e) => {
            e.preventDefault();

            activeRadio = radio;
            radio.checked = true;

            // Close sidebar
            if (toggle && sideNav) {
                toggle.checked = false;
                sideNav.classList.remove("active");
            }

            const target = routes[radio.id];
            if (!target) return;

            document.body.classList.add("fade-out");

            setTimeout(() => {
                loadPage(target);
            }, 400);
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
