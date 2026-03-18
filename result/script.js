// ==========================
// LENIS (smooth scroll)
// ==========================
const lenis = new Lenis({
  duration: 1.6, // higher = smoother (1.2 default hota hai)
  smoothWheel: true,
  smoothTouch: false, // keep false unless you want mobile smoothing
  wheelMultiplier: 0.9, // slightly softer scroll
  touchMultiplier: 1.2,
  easing: (t) => 1 - Math.pow(1 - t, 4), // smoother easeOutQuart
});

/* Sync with GSAP */
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ==========================
// TEXT SCRAMBLE
// ==========================
let hasPlayed = false;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const finalText = "THE CONQUERORS";
const el = document.getElementById("hero-title");

let iteration = 0;

function scrambleText() {
  iteration = 0;

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

    // 🔥 smoother progression
    iteration += 0.18;

  }, 45); // 🔥 slightly slower refresh
}

// ==========================
// GSAP MASTER TIMELINE
// ==========================
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-1",
    start: "top -5%",
    end: "top -200%",
    pin: true,
    scrub: 2,
    // markers: true,

    onEnter: () => {
      if (!hasPlayed) {
        scrambleText();
        hasPlayed = true;
      }
    }
  },
  defaults: {
    ease: "expo.out",
  },
});


// ==========================
// STEP 1 → H1 (main hero)
// ==========================

tl.to("#hero-title", {
  textShadow: `
    0 0 10px rgba(255,255,255,0.6),
    0 0 25px rgba(255,255,255,0.4),
    0 0 60px rgba(255,255,255,0.25)
  `,
  duration: 1
});

tl.to("#hero-title", {
  y: -260,
  scale: 0.58,
  duration: 2.5
},"-1");


// ==========================
// STEP 2 → H3 (after H1)
// ==========================

tl.from(".hero-sub", {
  opacity: 0,
  filter: "blur(12px)",
  duration: 1
});

tl.to(".hero-sub", {
  y: -260,
  scale: 0.9,
  duration: 1.6
},"-.5");

tl.from(".card-1", {
    y: 800,
    scale: 0.7,
    rotationX: 45, 
    rotationZ: 20 ,   
    duration: 2.5,
})
tl.from(".card-2", {
    y: 900,
    scale: 0.65,
    rotationX: 145, 
    rotationZ: 80 ,   
    duration: 2.5,
})
tl.from(".card-3", {
    y: 1000,
    scale: 0.6,
    rotationX: 65, 
    rotationZ: 70 ,   
    duration: 2.5,
})
// ==========================
// STEP 3 → CARDS
// ==========================

// tl.from(".card", {
//   y: 80,
//   opacity: 0,
//   scale: 0.9,
//   stagger: 0.15,
//   duration: 1.2,
//   ease: "power3.out"
// });
// const cl = gsap.timeline({
//     scrollTrigger: {
//     trigger: ".page-1",
//     start: "50% 15%",
//     end: "top top%",
//     markers: true,
//     }
// })

// function sheryAnimation() {
//     Shery.imageEffect("#image-div", {
//     style: 5,
//     config: {"a":{"value":2,"range":[0,30]},
//     "b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},
//     "aspect":{"value":0.6285574776785714},"ignoreShapeAspect":{"value":true},
//     "shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},
//     "shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},
//     "currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},
//     "growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},
//     "displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1.3,"range":[1,5]},"scrollType":{"value":0},
//     "geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.6,"range":[0,10]},
//     "metaball":{"value":0.43,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":7,"range":[0,100]}},
//     gooey: true
// })
// }

// window.addEventListener("load", function () {
//   sheryAnimation();
// });
// ==========================
// PAGE 2 REVEAL ANIMATION
// ==========================

let page2Played = false;

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-2",
    start: "top 60%",
    end: "top 20%",
    // markers: true,

    onEnter: () => {
      if (!page2Played) {
        tl2.play();
        page2Played = true;
      }
    }
  },
  paused: true,
  defaults: {
    ease: "expo.out",
    duration: 1.4
  }
});


// ==========================
// STEP 1 → BLOCK 1
// ==========================

tl2.from(".block:nth-child(1) .text", {
  y: 120,
  opacity: 0,
  filter: "blur(10px)"
});

tl2.from(".block:nth-child(1) #image-div img", {
  scale: 0.8,
  opacity: 0,
  rotation: -8,
  y: 100
}, "-=1");


// ==========================
// STEP 2 → BLOCK 2 (reverse feel)
// ==========================

tl2.from(".block:nth-child(2) .text", {
  x: 150,
  opacity: 0,
  filter: "blur(10px)"
}, "-=0.5");

tl2.from(".block:nth-child(2) #image-div img", {
  x: -150,
  opacity: 0,
  scale: 0.8,
  rotation: 8
}, "-=1");


// ==========================
// STEP 3 → BLOCK 3
// ==========================

tl2.from(".block:nth-child(3) .text", {
  y: 120,
  opacity: 0,
  filter: "blur(10px)"
}, "-=0.5");

tl2.from(".block:nth-child(3) #image-div img", {
  scale: 0.75,
  opacity: 0,
  rotation: -5,
  y: 120
}, "-=1");