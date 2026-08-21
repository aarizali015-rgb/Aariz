const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Python Developer"
];

let index = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing-text");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeEffect() {
  if (charIndex < roles[index].length) {
    typingElement.textContent += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 60);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(typeEffect, 300);
  }
}

if (typingElement) {
  if (prefersReducedMotion) {
    typingElement.textContent = roles[0];
  } else {
    typeEffect();
  }
}


/* ===== SCROLL ANIMATION ===== */
const hiddenBlocks = document.querySelectorAll(".hidden");

if (prefersReducedMotion) {
  hiddenBlocks.forEach(el => el.classList.add("show"));
} else {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  hiddenBlocks.forEach(el => observer.observe(el));
}

/* ===== MOBILE NAV ===== */
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector(".glass-nav");
const navOverlay = document.querySelector(".nav-overlay");

if (navToggle && navPanel && navOverlay) {
  const closeNav = () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  const openNav = () => {
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
  };

  navToggle.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) {
      closeNav();
      return;
    }
    openNav();
  });

  navOverlay.addEventListener("click", closeNav);
  navPanel.querySelectorAll("a").forEach(link => link.addEventListener("click", closeNav));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeNav();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

/* ===== ACTIVE SCROLL FRAME-BY-FRAME EFFECT ===== */
function updateScrollEffects() {
  const scrollTop = window.scrollY;

  // Hero image reaction to scroll
  if (scrollTop < 800) {
    const heroImg = document.querySelector(".hero-image img");
    if (heroImg) {
      const maxScroll = 600;
      const progress = Math.min(scrollTop / maxScroll, 1);
      const totalFrames = 8;
      const currentFrame = Math.round(progress * totalFrames);

      const scale = 1 - currentFrame * 0.015;
      const rotate = currentFrame * 2.5;
      const clip = (currentFrame / totalFrames) * 100;

      heroImg.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
      heroImg.style.clipPath = `inset(${clip}% 0% 0% 0% rounded 50%)`;
    }
  }

  // Certifications images frame-by-frame scroll parallax
  const certSection = document.querySelector(".certifications-section");
  if (certSection && certSection.classList.contains("show")) {
    const certImages = certSection.querySelectorAll("img");
    const sectionTop = certSection.getBoundingClientRect().top + scrollTop;
    const windowHeight = window.innerHeight;

    if (scrollTop + windowHeight > sectionTop) {
      const scrollInSection = (scrollTop + windowHeight) - sectionTop;
      const totalScrollRange = windowHeight + certSection.offsetHeight;
      const progress = Math.min(Math.max(scrollInSection / totalScrollRange, 0), 1);

      const currentFrame = Math.round(progress * 6);
      certImages.forEach((img) => {
        const rotate = -3 + currentFrame * 1;
        const translate = 10 - currentFrame * 3.3;
        img.style.transform = `translateY(${translate}px) rotate(${rotate}deg)`;
      });
    }
  }
}

window.addEventListener("scroll", updateScrollEffects);
document.addEventListener("DOMContentLoaded", updateScrollEffects);
updateScrollEffects();
