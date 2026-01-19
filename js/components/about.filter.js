window.AboutFilter = (() => {
    function init() {
        const educationRadio = document.getElementById("education");
        const workRadio = document.getElementById("work");

        const educationContent = document.querySelector(".education-content");
        const workContent = document.querySelector(".work-content");

        if (!educationRadio || !workRadio || !educationContent || !workContent) return;

        educationRadio.addEventListener("change", () => {
            if (educationRadio.checked) {
                educationContent.hidden = false;
                workContent.hidden = true;
            }
        });

        workRadio.addEventListener("change", () => {
            if (workRadio.checked) {
                educationContent.hidden = true;
                workContent.hidden = false;
            }
        });
    }

    return { init };
})();
