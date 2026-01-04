// SIDEBAR BUTTON
const menuBtn = document.getElementById("menu-btn");
const sideNav = document.getElementById("side-nav");

menuBtn.addEventListener("click", () => {
    sideNav.classList.toggle("active");
});