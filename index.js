// Typewriter animation for hero role
if (document.querySelector(".typed-role")) {
  new Typed(".typed-role", {
    strings: [
      "Full Stack Developer",
      "Problem Solver",
    ],
    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 1800,
    startDelay: 400,
    showCursor: true,
    cursorChar: "|",
    loop: true,
  });
}

// ===== MOBILE DRAWER NAVIGATION =====
const mobileNavToggle = document.getElementById("mobileNavToggle");
const mobileDrawer = document.getElementById("mobileDrawer");
const drawerCloseBtn = document.getElementById("drawerCloseBtn");
const drawerOverlay = document.getElementById("drawerOverlay");
const drawerLinks = document.querySelectorAll(".drawer-links a");

function openDrawer() {
  if (mobileDrawer && drawerOverlay) {
    mobileDrawer.classList.add("open");
    drawerOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeDrawer() {
  if (mobileDrawer && drawerOverlay) {
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

if (mobileNavToggle) mobileNavToggle.addEventListener("click", openDrawer);
if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

drawerLinks.forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

// ===== SMOOTH SCROLL FOR NAVIGATION ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== SCROLL PROGRESS & NAVBAR SCROLLED STATE & ACTIVE TRACKER =====
const progressBar = document.getElementById("scrollProgressBar");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  // Navbar glass backdrop trigger
  if (navbar) {
    if (scrollTop > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Active section tracker
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollTop >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// ===== SCROLL REVEAL ENGINE & STAGGER SEQUENCER =====
document.addEventListener("DOMContentLoaded", () => {
  const revealSelectors = [
    ".section-header",
    ".about-text-content",
    ".about-feature-col",
    ".experience-card",
    ".skill-category",
    ".project-showcase-card",
    ".contact-left",
    ".contact-form-card",
    ".footer-col",
  ];

  revealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add("motion-reveal");
    });
  });

  const motionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".motion-reveal").forEach((el) => {
    motionObserver.observe(el);
  });

  // ===== 3D SPRING TILT MICRO-INTERACTIONS =====
  const tiltSelectors =
    ".project-showcase-card, .about-feature-col, .experience-card, .contact-card, .skill-category";
  const tiltElements = document.querySelectorAll(tiltSelectors);

  tiltElements.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
});

// ===== CONTACT FORM & TOAST NOTIFICATION =====
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (toast) {
      if (toastMsg)
        toastMsg.textContent =
          "Thank you! Your message has been received. I will get back to you soon.";
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 4500);
    }
    this.reset();
  });
}

// Reset any saved light-mode theme
localStorage.removeItem("theme");
document.body.classList.remove("light-mode");


