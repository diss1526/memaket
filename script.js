document.addEventListener('DOMContentLoaded', () => {
    const deadline = new Date('2024-12-31T23:59:59');
    
    const elDays = document.querySelector('.timer__days');
    const elHours = document.querySelector('.timer__hours');
    const elMinutes = document.querySelector('.timer__minutes');
    const elSeconds = document.querySelector('.timer__seconds');
    
    const declensionNum = (num, words) => {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
    };
  
    const updateTimer = () => {
      const now = new Date();
      const diff = Math.max(0, deadline - now);
  
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
  
      elDays.textContent = String(days).padStart(2, '0');
      elHours.textContent = String(hours).padStart(2, '0');
      elMinutes.textContent = String(minutes).padStart(2, '0');
      elSeconds.textContent = String(seconds).padStart(2, '0');
  
      elDays.dataset.title = declensionNum(days, ['day', 'days', 'days']);
      elHours.dataset.title = declensionNum(hours, ['hour', 'hours', 'hours']);
      elMinutes.dataset.title = declensionNum(minutes, ['minute', 'minutes', 'minutes']);
      elSeconds.dataset.title = declensionNum(seconds, ['second', 'seconds', 'seconds']);
      if (diff === 0) {
        clearInterval(timerId);
      }
    };
  
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
  });



const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const numberOfFlakes = 200;
const flakes = [];

function createFlakes() {
    for (let i = 0; i < numberOfFlakes; i++) {
        flakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            opacity: Math.random(),
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 3 + 1,
            radius: Math.random() * 4 + 1
        });
    }
}

function drawFlakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '20px Arial';
    for (let i = 0; i < numberOfFlakes; i++) {
        const flake = flakes[i];
        ctx.fillText('❄', flake.x, flake.y);
    }
    moveFlakes();
}

function moveFlakes() {
    for (let i = 0; i < numberOfFlakes; i++) {
        const flake = flakes[i];
        flake.x += flake.speedX;
        flake.y += flake.speedY;
        if (flake.y > canvas.height) {
            flakes[i] = {
                x: Math.random() * canvas.width,
                y: 0,
                opacity: flake.opacity,
                speedX: flake.speedX,
                speedY: flake.speedY,
                radius: flake.radius
            };
        }
    }
}

function animateSnow() {
    drawFlakes();
    requestAnimationFrame(animateSnow);
}

createFlakes();
animateSnow();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flakes.length = 0;
    createFlakes();
});

document.addEventListener('DOMContentLoaded', () => {
    animateSnow();
});
