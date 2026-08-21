/* ==========================================================================
   Aariz Ali Portfolio - Business Analyst & Business Associate
   Lenis Smooth Scroll & Interactive Script
   ========================================================================== */

/* ===== LENIS SMOOTH SCROLL INITIALIZATION ===== */
let lenis = null;

if (typeof Lenis !== "undefined") {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on("scroll", () => {
    updateScrollUI();
  });
}

const roles = [
  "Business Associate",
  "Research Analyst",
  "B2C Sales & Marketing Strategist",
  "Lead Generation & CRM Specialist",
  "Data Analytics & Visualization"
];

let index = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing-text");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== TYPING ANIMATION ===== */
function typeEffect() {
  if (!typingElement) return;
  if (charIndex < roles[index].length) {
    typingElement.textContent += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 85);
  } else {
    setTimeout(eraseEffect, 1800);
  }
}

function eraseEffect() {
  if (!typingElement) return;
  if (charIndex > 0) {
    typingElement.textContent = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 45);
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

/* ===== SCROLL REVEAL ANIMATION ===== */
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
    { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
  );

  hiddenBlocks.forEach(el => observer.observe(el));
}

/* ===== NAV HIGHLIGHT & SCROLL PROGRESS BAR ===== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".glass-nav a");
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollUI() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  // Top Scroll Progress Line
  if (scrollProgress && scrollHeight > 0) {
    const progressPercent = Math.min((scrollTop / scrollHeight) * 100, 100);
    scrollProgress.style.width = `${progressPercent}%`;
  }

  // Active Navigation Highlighting
  const scrollPosition = scrollTop + 180;
  let currentActiveId = "home";

  sections.forEach(current => {
    const sectionTop = current.offsetTop;
    const sectionHeight = current.offsetHeight;
    const sectionId = current.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentActiveId = sectionId;
    }
  });

  // Only set contact active when scrolled to the very bottom
  if (window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 15) {
    currentActiveId = "contact";
  }

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === `#${currentActiveId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Hero Image Scroll Parallax
  if (scrollTop < 800) {
    const heroImg = document.querySelector(".hero-image img");
    if (heroImg) {
      const progress = Math.min(scrollTop / 600, 1);
      const scale = 1 - progress * 0.04;
      heroImg.style.transform = `scale(${scale})`;
    }
  }
}

window.addEventListener("scroll", updateScrollUI);
document.addEventListener("DOMContentLoaded", updateScrollUI);

/* ===== LENIS ANCHOR SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId !== "#") {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -60 });
        } else {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });
});

/* ===== PARALLAX MOUSE MOVE AMBIENT GLOW ===== */
const glow1 = document.getElementById("glow1");
const glow2 = document.getElementById("glow2");
const glow3 = document.getElementById("glow3");

if (!prefersReducedMotion) {
  window.addEventListener("mousemove", e => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    if (glow1) {
      glow1.style.transform = `translate(${mouseX * 35}px, ${mouseY * 35}px)`;
    }
    if (glow2) {
      glow2.style.transform = `translate(${-mouseX * 45}px, ${-mouseY * 45}px)`;
    }
    if (glow3) {
      glow3.style.transform = `translate(${mouseX * 25}px, ${-mouseY * 25}px)`;
    }
  });
}

/* ===== MOBILE NAV MENU ===== */
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

/* ===== CARD TILT INTERACTION ===== */
const tiltCards = document.querySelectorAll(".value-card, .repo-card, .skills-group, .contact-card");

tiltCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

/* ===== CONTACT FORM SUBMISSION HANDLER ===== */
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("senderName").value;
  const email = document.getElementById("senderEmail").value;
  const subject = document.getElementById("msgSubject").value;
  const body = document.getElementById("msgBody").value;
  const status = document.getElementById("formStatus");

  const mailtoUrl = `mailto:aarizali015@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${body}`)}`;
  
  if (status) {
    status.style.color = "#0d9488";
    status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Preparing email message for Aariz Ali Shekh...`;
  }

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 500);
}
