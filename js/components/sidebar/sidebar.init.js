// ===============================
// AUTO-CHECK RADIO BASED ON PAGE
// ===============================
const pageMap = {
    "portfolio.html": "radio-portfolio",
    "blogs.html": "radio-blogs",
    "gallery.html": "radio-gallery",
    "thoughts.html": "radio-thoughts"
};

if (window.SidebarToggle) {
    SidebarToggle.init();
}


if (window.SidebarNavigation) {
    SidebarNavigation.init();
}

if (window.SidebarClose) {
    SidebarClose.init();
}

if (window.SidebarGlider) {
    SidebarGlider.init();
}