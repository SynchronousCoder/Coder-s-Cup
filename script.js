/* ==================================================
   PARALLAX ROTATION – Page 1 Hero Title
================================================== */

(function () {
  const title = document.getElementById("hero-title");
  if (!title) return;

  // Wrap in a perspective container
  title.style.transformStyle = "preserve-3d";

  let currentRX = 0, currentRY = 0;
  let targetRX  = 0, targetRY  = 0;
  let rafId;

  const MAX_DEG = 15; // max tilt in degrees

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateTitle() {
    currentRX = lerp(currentRX, targetRX, 0.08);
    currentRY = lerp(currentRY, targetRY, 0.08);

    title.style.transform =
      `perspective(800px) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;

    if (Math.abs(currentRX - targetRX) > 0.01 ||
        Math.abs(currentRY - targetRY) > 0.01) {
      rafId = requestAnimationFrame(animateTitle);
    } else {
      cancelAnimationFrame(rafId);
    }
  }

  function onMouseMove(e) {
    const { clientX, clientY } = e;
    const { innerWidth: W, innerHeight: H } = window;

    // Normalize -1 … +1
    const nx =  (clientX / W - 0.5) * 2.5;
    const ny = -(clientY / H - 0.5) * 5; // invert Y for natural feel

    targetRY =  nx * MAX_DEG;
    targetRX =  ny * MAX_DEG * 0.6; // subtle X tilt

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animateTitle);
  }

  function onMouseLeave() {
    targetRX = 0;
    targetRY = 0;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animateTitle);
  }

  const page1 = document.querySelector(".page-1");
  if (page1) {
    page1.addEventListener("mousemove", onMouseMove, { passive: true });
    page1.addEventListener("mouseleave", onMouseLeave);
  }
})();


/* ==================================================
   PARALLAX ROTATION – Page 5 Final Title
================================================== */

(function () {
  const finalTitle = document.getElementById("final-title");
  if (!finalTitle) return;

  finalTitle.style.transformStyle = "preserve-3d";

  let currentRX = 0, currentRY = 0;
  let targetRX  = 0, targetRY  = 0;
  let rafId;

  const MAX_DEG = 15;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateFinal() {
    currentRX = lerp(currentRX, targetRX, 0.08);
    currentRY = lerp(currentRY, targetRY, 0.08);

    finalTitle.style.transform =
      `perspective(800px) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;

    if (Math.abs(currentRX - targetRX) > 0.01 ||
        Math.abs(currentRY - targetRY) > 0.01) {
      rafId = requestAnimationFrame(animateFinal);
    } else {
      cancelAnimationFrame(rafId);
    }
  }

  function onMouseMove(e) {
    const { clientX, clientY } = e;
    const { innerWidth: W, innerHeight: H } = window;

    const nx =  (clientX / W - 0.5) * 3;
    const ny = -(clientY / H - 0.5) * 3;

    targetRY =  nx * MAX_DEG;
    targetRX =  ny * MAX_DEG * 0.6;

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animateFinal);
  }

  function onMouseLeave() {
    targetRX = 0;
    targetRY = 0;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animateFinal);
  }

  const page5 = document.querySelector(".page-5");
  if (page5) {
    page5.addEventListener("mousemove", onMouseMove, { passive: true });
    page5.addEventListener("mouseleave", onMouseLeave);
  }
})();


/* ==================================================
================================================== */
// (paste the full existing script.js content here)
/* --------------------------------------------------
   Lenis Smooth Scroll – Enhanced Smoothness
-------------------------------------------------- */

const lenis = new Lenis({
  duration: 1.6,              // higher = smoother (1.2 default hota hai)
  smoothWheel: true,
  smoothTouch: false,         // keep false unless you want mobile smoothing
  wheelMultiplier: 0.9,       // slightly softer scroll
  touchMultiplier: 1.2,
  easing: (t) => 1 - Math.pow(1 - t, 4), // smoother easeOutQuart
});

/* Sync with GSAP */
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


/* --------------------------------------------------
   GSAP Setup
-------------------------------------------------- */

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------
   Page 1 – Hero Scale on Scroll
-------------------------------------------------- */

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-1",
    start: "7% top",
    end: "7% -50%",
    scrub: 1,
    // markers: true
  }
});

// Animate hero + last-content
tl.to(".hero, .last-content", {
  scale: 0.95,
  y: -50,
  opacity: 0.75,
  duration: 1.5,
  ease: "power2.out"
});

// Animate navbar separately
tl.to(".navbar", {
  y: -10,
  scale: 0.95,
  opacity: 0.85,
  duration: 1.5,
  ease: "power2.out"
}, "<");

/* --------------------------------------------------
   Page 2 – Character Glow Reveal
-------------------------------------------------- */

const heading = document.querySelector(".page-2 h1");

if (heading) {
  const chars = heading.textContent.split("");
  heading.innerHTML = chars.map(char => `<span>${char}</span>`).join("");

  const page2Timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".page-2",
      start: "top 0%",
      end: "top -170%",
      scrub: 2,
      pin: true,
      // markers: true,
    },
  });

  page2Timeline.to(".page-2 h1 span", {
    color: "#FCFCFC",
    textShadow:
      "0 0 4px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.25), 0 0 20px rgba(255,255,255,0.15)",
    duration: 2,
    stagger: 0.06,
    ease: "power2.out",
  });
}

/* --------------------------------------------------
   Page 3 – Card Split & Flip Animation
-------------------------------------------------- */

let page3Timeline;

ScrollTrigger.matchMedia({

  // ── DESKTOP (≥1025px) — DO NOT TOUCH ──────────────
  "(min-width: 1025px)": function () {

    page3Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-3",
        start: "top top",
        end: "top -170%",
        scrub: 1,
        pin: true,
      },
    });

    page3Timeline
      .to(".banner", { scale: 0.85, duration: 1 }, "-=2.25")
      .to(".page3-heading h1", { y: -250, duration: 1 }, "-=1.75")
      .to("#card-1", { x: -20, duration: 1.25 }, "-=1")
      .to("#card-3", { x: 20, duration: 1.25 }, "-=1.25")
      .to(".card", {
        rotationY: 180,
        duration: 1.25,
        stagger: 0.1,
        ease: "power3.inOut",
      })
      .to("#card-1", {
        y: 30,
        rotationZ: -10,
        duration: 1.2,
        ease: "power3.inOut",
      }, "-=1.2")
      .to("#card-3", {
        y: 30,
        rotationZ: 10,
        duration: 1.2,
        ease: "power3.inOut",
      }, "-=1.2");

  },

  // ── MOBILE (≤1024px) ──────────────────────────────
  "(max-width: 1024px)": function () {

    // kill desktop timeline if somehow alive
    if (page3Timeline && page3Timeline.scrollTrigger) {
      page3Timeline.scrollTrigger.kill();
      page3Timeline.kill();
      page3Timeline = null;
    }

    gsap.set(".card", { clearProps: "transform" });
    gsap.set(".banner", { clearProps: "transform" });

    // Set cards off-screen below before animation starts
    gsap.set(".card", {
      y: 300,
      rotationX: 25,
      rotationY: -15,
      rotationZ: -8,
      opacity: 0,
      transformPerspective: 900,
    });

    const page3TimelineMobile = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-3",
        start: "top top",
        end: "top -180%",
        scrub: 1.2,
        pin: true,
      },
    });

    page3TimelineMobile
  .from(".page3-heading h1", {
    y: 600,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  })
  .fromTo("#card-1",
    { y: 300, rotationX: 25, rotationY: -150, rotationZ: 60, opacity: 0 },
    { y: 0,   rotationX: 0,  rotationY: 180,  rotationZ: 0,  opacity: 1, duration: 1.4, ease: "power3.out" },
  "-=0.5")
  .fromTo("#card-2",
    { y: 300, rotationX: 25, rotationY: -150, rotationZ: 60, opacity: 0 },
    { y: 0,   rotationX: 0,  rotationY: 180,  rotationZ: 0,  opacity: 1, duration: 1.4, ease: "power3.out" },
  "-=1.1")
  .fromTo("#card-3",
    { y: 300, rotationX: 25, rotationY: -150, rotationZ: 60, opacity: 0 },
    { y: 0,   rotationX: 0,  rotationY: 180,  rotationZ: 0,  opacity: 1, duration: 1.4, ease: "power3.out" },
  "-=1.1");
  }

});
/* --------------------------------------------------
   Card Hover Lighting (Mouse Tracking)
-------------------------------------------------- */

document.querySelectorAll(".card-back").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--mx", `${mx}%`);
    card.style.setProperty("--my", `${my}%`);
  });
});

/* --------------------------------------------------
   Galaxy Background Engine
   (No visual or speed changes)
-------------------------------------------------- */

function initGalaxy() {
  const canvas = document.createElement("canvas");
  canvas.classList.add("galaxy-canvas");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");

  let width = 0;
  let height = 0;
  let stars = [];
  let shootingStars = [];
  let mouseX = 0;
  let mouseY = 0;
  let scrollOffset = 0;

  const STAR_COUNT = window.innerWidth < 768 ? 200 : 500;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener("scroll", () => {
    scrollOffset = window.scrollY * 0.0004;
  });

  /* --------------------------
     Star Class
  -------------------------- */

  class Star {
    constructor(layer) {
      this.layer = layer;
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;

      this.originalSize = Math.random() * (this.layer * 0.7) + 0.3;
      this.size = this.originalSize;

      this.baseAlpha = Math.random();
      this.alpha = this.baseAlpha;

      this.baseSpeed = 0.003 * this.layer;
      this.speedVariation = Math.random() * 0.002;

      this.twinkleSpeed = 0.0015 + Math.random() * 0.002;
      this.twinkleOffset = Math.random() * Math.PI * 2;

      const colors = ["#ffffff", "#bcdcff", "#ffd6a3"];
      this.color = colors[Math.floor(Math.random() * colors.length)];

      this.glow = Math.random() > 0.97;
    }

    update(time) {
      const dynamicSpeed =
        this.baseSpeed +
        Math.sin(time * 0.0002 + this.twinkleOffset) *
          this.speedVariation;

      this.x += dynamicSpeed + scrollOffset * this.layer;
      this.y += dynamicSpeed + scrollOffset * this.layer;

      if (this.x > width) this.x = 0;
      if (this.y > height) this.y = 0;
      if (this.x < 0) this.x = width;
      if (this.y < 0) this.y = height;

      this.alpha =
        this.baseAlpha +
        Math.sin(time * this.twinkleSpeed + this.twinkleOffset) *
          0.3;

      if (Math.random() > 0.9995) {
        this.size = this.originalSize + 1.5;
      }

      this.size += (this.originalSize - this.size) * 0.05;

      this.parallaxX = (mouseX - width / 2) * 0.0002 * this.layer;
      this.parallaxY = (mouseY - height / 2) * 0.0002 * this.layer;
    }

    draw() {
      ctx.globalAlpha = Math.max(this.alpha, 0);

      const drawX = this.x + this.parallaxX;
      const drawY = this.y + this.parallaxY;

      if (this.glow) {
        const gradient = ctx.createRadialGradient(
          drawX, drawY, 0,
          drawX, drawY, this.size * 6
        );

        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(drawX, drawY, this.size * 6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(drawX, drawY, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star(Math.random() * 3 + 1));
    }
  }

  createStars();

  /* --------------------------
     Shooting Star
  -------------------------- */

  class ShootingStar {
    constructor() {
      this.x = Math.random() * width * 0.4;
      this.y = Math.random() * height * 0.4;
      this.length = 180;
      this.speed = 8;
      this.progress = 0;
      this.opacity = 1;
    }

    update() {
      this.progress += this.speed;
      this.opacity -= 0.01;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(this.x + this.progress, this.y + this.progress * 0.5);
      ctx.lineTo(
        this.x + this.progress - this.length,
        this.y + this.progress * 0.5 - this.length * 0.5
      );
      ctx.stroke();
      ctx.restore();
    }
  }

  function maybeCreateShootingStar() {
    if (Math.random() > 0.998) {
      shootingStars.push(new ShootingStar());
    }
  }

  /* --------------------------
     Nebula + Center Glow
  -------------------------- */

  function drawNebula(time) {
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      width * 0.1,
      width / 2,
      height / 2,
      width * 0.9
    );

    gradient.addColorStop(
      0,
      `rgba(120,0,0,${
        0.05 + Math.sin(time * 0.0004) * 0.02
      })`
    );
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
  }

  function drawDust(time) {
    ctx.save();
    ctx.globalAlpha = 0.04;

    for (let i = 0; i < 40; i++) {
      const x = (Math.sin(time * 0.0001 + i) * width) % width;
      const y = (Math.cos(time * 0.0001 + i) * height) % height;
      ctx.fillRect(x, y, 1, 1);
    }

    ctx.restore();
  }

  /* --------------------------
     Main Animation Loop
  -------------------------- */

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(Math.sin(time * 0.00005) * 0.002);
    ctx.translate(-width / 2, -height / 2);

    drawNebula(time);
    drawDust(time);

    stars.forEach(star => {
      star.update(time);
      star.draw();
    });

    ctx.restore();

    maybeCreateShootingStar();

    shootingStars = shootingStars.filter(shoot => {
      shoot.update();
      shoot.draw();
      return shoot.opacity > 0;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

initGalaxy();




//responsive
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

if ('ontouchstart' in window) {
  document.querySelectorAll(".card-back").forEach(card => {
    card.addEventListener("touchmove", e => {
      const rect = card.getBoundingClientRect();
      const touch = e.touches[0];

      const mx = ((touch.clientX - rect.left) / rect.width) * 100;
      const my = ((touch.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--mx", `${mx}%`);
      card.style.setProperty("--my", `${my}%`);
    });
  });
}