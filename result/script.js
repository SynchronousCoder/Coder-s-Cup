// ==========================
// LENIS (smooth scroll)
// ==========================
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// ==========================
// TEXT SCRAMBLE
// ==========================

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const finalText = "THE CONQUERORS";
const el = document.getElementById("hero-title");

let iteration = 0;

function scrambleText() {
  const interval = setInterval(() => {

    el.innerText = finalText
      .split("")
      .map((letter, index) => {

        if (letter === " ") return " ";

        if (index < iteration) {
          return finalText[index];
        }

        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= finalText.length) {
      clearInterval(interval);
    }

    iteration += 0.35;

  }, 30);
}


// ==========================
// GSAP MASTER TIMELINE
// ==========================

const tl = gsap.timeline({
  defaults: {
    ease: "power3.out"
  }
});

// initial reveal
tl.to("#hero-title", {
  opacity: 1,
  filter: "blur(0px)",
  duration: 1.2
});

// movement + scale (parallax feel)
tl.to("#hero-title", {
  y: -120,
  scale: 0.65,
  letterSpacing: "2px",
  duration: 1.5
}, "-=0.8");


// ==========================
// START BOTH TOGETHER
// ==========================

scrambleText();