$(document).ready(function () {
    // Al cargar la página, ocultamos las cortinas
    $(".left-curtain").css("width", "0%");
    $(".right-curtain").css("width", "0%");
  
    $(".valentines-day").click(function () {
      // Animación de desvanecimiento de los elementos del sobre
      $(".envelope").css({
        animation: "fall 3s linear 1",
        "-webkit-animation": "fall 3s linear 1"
      });
      $(".envelope").fadeOut(800, function () {
        // Ocultar elementos dentro de .valentines-day
        $(
          ".valentines-day .heart, .valentines-day .text, .valentines-day .front"
        ).hide();
  
        // Hacer visible la carta con una animación ondulante
        $("#card").css({
          visibility: "visible",
          opacity: 0,
          transform: "scale(0.1)"
        });
        $("#card").animate(
          { opacity: 1 },
          {
            duration: 1000,
            step: function (now, fx) {
              var scale = 1 + Math.sin(now * Math.PI) * 0.1; // Calculamos la escala basada en la función seno
              $(this).css("transform", "scale(" + scale + ")");
            }
          }
        ); // Animación de ondulación
      });
    });
  });
  

  class Confetti {
    constructor(canvas, ctx, colors) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.colors = colors;
      this.confetti = [];
      this.confettiCount = 500;
      this.gravity = 0.45;
      this.terminalVelocity = 5;
      this.drag = 0.075;
      this.resizeCanvas();
      this.initConfetti();
      this.render();
      this.setupEventListeners();
    }
  
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  
    randomRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    initConfetti() {
      for (let i = 0; i < this.confettiCount; i++) {
        this.confetti.push({
          color: this.colors[Math.floor(this.randomRange(0, this.colors.length))],
          dimensions: { x: this.randomRange(10, 20), y: this.randomRange(10, 30) },
          position: { x: this.randomRange(0, this.canvas.width), y: this.canvas.height - 1 },
          rotation: this.randomRange(0, 2 * Math.PI),
          scale: { x: 1, y: 1 },
          velocity: { x: this.randomRange(-25, 25), y: this.randomRange(0, -50) }
        });
      }
    }
  
    render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      this.confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;
  
        this.ctx.translate(confetto.position.x, confetto.position.y);
        this.ctx.rotate(confetto.rotation);
  
        confetto.velocity.x -= confetto.velocity.x * this.drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + this.gravity, this.terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
  
        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;
  
        if (confetto.position.y >= this.canvas.height) this.confetti.splice(index, 1);
  
        if (confetto.position.x > this.canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = this.canvas.width;
  
        confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        this.ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
  
        this.ctx.fillRect(-width / 2, -height / 2, width, height);
  
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      });
  
      if (this.confetti.length <= 10) this.initConfetti();
  
      window.requestAnimationFrame(() => this.render());
    }
  
    setupEventListeners() {
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  }
  
  document.getElementById('confettiButton').addEventListener('click', () => {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    const colors = [
      { front: 'red', back: 'darkred' },
      { front: 'green', back: 'darkgreen' },
      { front: 'blue', back: 'darkblue' },
      { front: 'yellow', back: 'darkyellow' },
      { front: 'orange', back: 'darkorange' },
      { front: 'pink', back: 'darkpink' },
      { front: 'purple', back: 'darkpurple' },
      { front: 'turquoise', back: 'darkturquoise' }
    ];
  
    const music = document.getElementById('confettiMusic');
  
    if (music.paused) {
      new Confetti(canvas, ctx, colors);
      music.play();
      document.getElementById('confettiButton').innerHTML = '&#10074;&#10074;';
    } else {
      music.pause();
      document.getElementById('confettiButton').innerHTML = '&#9658;';
    }
  });