// ===============================
// PROJECT DATA
// ===============================
window.PROJECTS = [
    {
        title: "Flappy Plane",
        description: "A Flappy Bird style game built with Pygame and Godot.",
        image: "assets/images/flappy-plane.png",
        tags: ["Python", "GDScript", "Godot"],
        live: "#",
        github: "#"
    },
    {
        title: "Hangman Web App",
        description: "A Flask-based Hangman game with dynamic UI.",
        image: "assets/images/hangman.png",
        tags: ["Python", "Flask", "HTML", "CSS"],
        live: "#",
        github: "#"
    },
    {
        title: "Flappy Plane",
        description: "A Flappy Bird style game built with Pygame and Godot.",
        image: "assets/images/flappy-plane.png",
        tags: ["Python", "GDScript", "Godot"],
        live: "#",
        github: "#"
    },
    {
        title: "Hangman Web App",
        description: "A Flask-based Hangman game with dynamic UI.",
        image: "assets/images/hangman.png",
        tags: ["Python", "Flask", "HTML", "CSS"],
        live: "#",
        github: "#"
    },
    {
        title: "Flappy Plane",
        description: "A Flappy Bird style game built with Pygame and Godot.",
        image: "assets/images/flappy-plane.png",
        tags: ["Python", "GDScript", "Godot"],
        live: "#",
        github: "#"
    },
    {
        title: "Hangman Web App",
        description: "A Flask-based Hangman game with dynamic UI.",
        image: "assets/images/hangman.png",
        tags: ["Python", "Flask", "HTML", "CSS"],
        live: "#",
        github: "#"
    }
];

// ===============================
// CARD CREATION
// ===============================
function createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>

        <h3 class="project-title">${project.title}</h3>

        <p class="project-description">${project.description}</p>

        <div class="project-tags">
            ${renderProjectTags(project.tags)}
        </div>

        ${project.live ? `<a href="${project.live}" target="_blank" class="home-button project-btn">View Live</a>` : ""}
        ${project.github ? `<a href="${project.github}" target="_blank" class="home-button project-btn">GitHub</a>` : ""}
    `;

    return card;
}

// ===============================
// TAG LOGIC (reuses Skills)
// ===============================
function renderProjectTags(tags, max = 4) {
    let html = "";
    const visible = tags.slice(0, max);
    const extra = tags.length - max;

    visible.forEach(tag => {
        const type = getSkillType(tag);
        html += `<span class="skill-tag ${type}">${tag}</span>`;
    });

    if (extra > 0) {
        html += `<span class="skill-tag more">+${extra}</span>`;
    }

    return html;
}

function getSkillType(tag) {
    if (window.SKILLS_DATA?.languages.includes(tag)) return "languages";
    if (window.SKILLS_DATA?.frameworks.includes(tag)) return "frameworks";
    if (window.SKILLS_DATA?.tools.includes(tag)) return "tools";
    return "";
}

// ===============================
// RENDERERS
// ===============================
window.renderProjectsPreview = function () {
    const container = document.querySelector(".projects-grid");
    if (!container) return;

    container.innerHTML = "";
    PROJECTS.slice(0, 3).forEach(p => {
        container.appendChild(createProjectCard(p));
    });
};

window.renderProjectsListing = function () {
    const container = document.querySelector(".all-projects-grid");
    if (!container) return;

    container.innerHTML = "";
    PROJECTS.forEach(p => {
        container.appendChild(createProjectCard(p));
    });
};
