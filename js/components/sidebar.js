// ===============================
// SIDEBAR TOGGLE (USE CHECKBOX NATIVELY)
// ===============================
const toggle = document.getElementById("menu-toggle");
const sideNav = document.getElementById("side-nav");

if (toggle && sideNav) {
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            sideNav.classList.add("active");
        } else {
            sideNav.classList.remove("active");
        }
    });

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    sideNav.addEventListener("click", (e) => {
        e.stopPropagation();
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
            e.stopPropagation();

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
                window.location.href = target;
            }, 400);
        });
    });

    // Mouse leave → return to active
    radioContainer.addEventListener("mouseleave", () => {
        if (activeRadio) activeRadio.checked = true;
    });
}

// ========
