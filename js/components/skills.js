window.SKILLS_DATA = {
    languages: ["Python", "JavaScript", "HTML", "CSS", "GDScript"],
    frameworks: ["Flask", "Bootstrap", "Tkinter", "PySide6"],
    tools: ["Git", "GitHub", "VS Code", "Godot", "Aseprite", "Adobe Premiere Pro", "Figma"],
};

function createSkillTag(text, type) {
    const tag = document.createElement("span");
    tag.className = `skill-tag ${type}`;
    tag.textContent = text;
    return tag;
}

function renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container) return;

    container.innerHTML = ""; // prevent duplicates

    Object.entries(SKILLS_DATA).forEach(([category, skills]) => {
        const row = document.createElement("div");
        row.className = "skill-row";

        const label = document.createElement("div");
        label.className = `skill-label ${category}`;
        label.textContent = category.toUpperCase() + ":";

        const tagsWrap = document.createElement("div");
        tagsWrap.className = "skill-tags-wrap";

        skills.forEach(skill => {
            const tag = createSkillTag(skill, category);
            tagsWrap.appendChild(tag);
        });

        row.appendChild(label);
        row.appendChild(tagsWrap);
        container.appendChild(row);
    });
}

window.initSkills = function () {
    renderSkills();
};
