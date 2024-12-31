document.getElementById("startButton").addEventListener("click", () => {
    const name = document.getElementById("nameInput").value;
    if (!name) {
      alert("Please enter your name!");
      return;
    }
  
    document.querySelector(".container").classList.add("hidden");
    const fireworksDiv = document.getElementById("fireworks");
    fireworksDiv.classList.remove("hidden");
  
    document.getElementById("greetingText").innerText = `Happy New Year, ${name}! 🎉`;
  
    const audio = document.getElementById("audio");
    audio.play();
  
    startFireworks();
  });
  
  function startFireworks() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const particles = [];
    const colors = ["#ff0040", "#ff8000", "#00ff00", "#0080ff", "#ff00ff", "#ffff00"];
  
    function createParticle(x, y) {
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50;
        const speed = Math.random() * 4 + 1;
        particles.push({
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 100,
        });
      }
    }
  
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.x += particle.dx;
        particle.y += particle.dy;
        particle.life -= 1;
  
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
  
        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });
  
      requestAnimationFrame(drawParticles);
    }
  
    setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;
      createParticle(x, y);
    }, 500);
  
    drawParticles();
  }
  