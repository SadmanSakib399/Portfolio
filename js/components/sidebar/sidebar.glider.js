window.SidebarGlider = (() => {
    function init() {
        const container = document.querySelector(".radio-container");
        const radios = document.querySelectorAll(".radio-container input[type='radio']");
        const glider = document.querySelector(".radio-container .glider");

        if (!container || !radios.length || !glider) return;

        let activeRadio = document.querySelector(".radio-container input:checked");

        function moveGliderTo(radio) {
            if (!radio) return;
            const label = radio.nextElementSibling;
            if (!label) return;

            const labelRect = label.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            glider.style.transform = `translateY(${labelRect.top - containerRect.top}px)`;
            glider.style.height = `${labelRect.height}px`;
        }

        // Init position
        if (activeRadio) {
            moveGliderTo(activeRadio);
        }

        radios.forEach(radio => {
            const label = radio.nextElementSibling;
            if (!label) return;

            label.addEventListener("mouseenter", () => {
                moveGliderTo(radio);
            });

            label.addEventListener("click", () => {
                activeRadio = radio;
                moveGliderTo(activeRadio);
            });
        });

        container.addEventListener("mouseleave", () => {
            if (activeRadio) moveGliderTo(activeRadio);
        });

        // Expose API
        return {
            setActive(radio) {
                activeRadio = radio;
                moveGliderTo(activeRadio);
            }
        };
    }

    return { init };
})();
