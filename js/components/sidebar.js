// SIDEBAR BUTTON
const toggle = document.getElementById("menu-toggle");
const sideNav = document.getElementById("side-nav");

toggle.addEventListener("change", () => {
    sideNav.classList.toggle("active", toggle.checked);
});
