const canvas = document.getElementById('smokeCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let isLeftClick = false;
const mouse = { x: 0, y: 0, vX: 0, vY: 0, lastX: 0, lastY: 0 };

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('mousedown', (e) => { if (e.button === 0) isLeftClick = true; });
window.addEventListener('mouseup', (e) => { if (e.button === 0) isLeftClick = false; });

document.addEventListener('mousemove', (e) => {
    const dx = e.clientX - mouse.lastX;
    const dy = e.clientY - mouse.lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.vX = dx;
    mouse.vY = dy;

    if (isLeftClick) {
        // This fills the gaps between mouse samples to prevent "balls"
        const particlesToSpawn = Math.max(1, Math.floor(distance / 6));
        
        for (let i = 0; i < particlesToSpawn; i++) {
            const ratio = i / particlesToSpawn;
            const spawnX = mouse.lastX + (dx * ratio);
            const spawnY = mouse.lastY + (dy * ratio);
            
            particles.push(new SmokeParticle(
                spawnX, 
                spawnY, 
                mouse.vX * 0.1, 
                mouse.vY * 0.1
            ));
        }
    }

    mouse.lastX = e.clientX;
    mouse.lastY = e.clientY;
});

class SmokeParticle {
    constructor(x, y, vX, vY) {
        this.x = x;
        this.y = y;
        this.vX = vX + (Math.random() - 0.5) * 1.5;
        this.vY = vY + (Math.random() - 0.5) * 1.5 - 0.5; 
        this.size = Math.random() * 25 + 15;
        this.life = 1.0;
        this.rotation = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.08;
        this.decay = 0.003 + Math.random() * 0.004;
    }

    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
            this.vX += mouse.vX * 0.015;
            this.vY += mouse.vY * 0.015;
        }

        this.x += this.vX;
        this.y += this.vY;
        this.rotation += this.spin;
        this.vX *= 0.98;
        this.vY *= 0.98;
        this.life -= this.decay;
        this.size += 0.5; 
    }

    draw() {
        if (this.life <= 0) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Smooth fade-out curve
        const smoothAlpha = Math.pow(this.life, 2);
        ctx.globalAlpha = smoothAlpha * 0.25;

        let grd = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        grd.addColorStop(0, 'rgba(200, 200, 200, 0.8)');
        grd.addColorStop(0.4, 'rgba(150, 150, 150, 0.3)');
        grd.addColorStop(1, 'rgba(50, 50, 50, 0)');

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();