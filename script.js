const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
    this.draw();
  }
}

function fireworks() {
  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ["#ff0000", "#ffff00", "#ffffff"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2) / 30 * i;
      const velocity = {
        x: Math.cos(angle) * (Math.random() * 4),
        y: Math.sin(angle) * (Math.random() * 4)
      };
      particles.push(new Particle(x, y, color, velocity));
    }
  }, 1000);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      p.update();
    }
  });
}

fireworks();
animate();