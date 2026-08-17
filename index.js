// Typewriter animation for hero role
new Typed(".typed-role", {
  strings: ["Full Stack Developer", "Software Engineer", "Problem Solver"],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 1800,
  startDelay: 400,
  showCursor: true,
  cursorChar: "|",
  loop: true,
});

// Smooth Scroll for navigation anchors
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

// Scroll Progress & Navbar Scrolled State & Active Navigation
const progressBar = document.getElementById("scrollProgressBar");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
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

// ===== FRAMER MOTION SCROLL REVEAL ENGINE =====
document.addEventListener("DOMContentLoaded", () => {
  // Elements to apply motion reveal
  const revealSelectors = [
    ".section-header",
    ".about-text-content",
    ".experience-card",
    ".skill-category",
    ".contact-left",
    ".contact-form-card",
    ".footer-col"
  ];

  revealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add("motion-reveal");
    });
  });

  // Stagger containers
  document.querySelectorAll(".skills-grid-container .skill-category").forEach((cat) => {
    cat.classList.add("stagger-container");
    const tiles = cat.querySelectorAll(".skill-tile");
    tiles.forEach((tile, index) => {
      tile.style.transitionDelay = `${index * 0.06}s`;
    });
  });

  document.querySelectorAll(".about-features-box").forEach((box) => {
    box.classList.add("stagger-container", "motion-reveal");
    const cols = box.querySelectorAll(".about-feature-col");
    cols.forEach((col, index) => {
      col.style.transitionDelay = `${index * 0.12}s`;
    });
  });

  // IntersectionObserver (whileInView)
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
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".motion-reveal").forEach((el) => {
    motionObserver.observe(el);
  });

  // ===== 3D SPRING TILT MICRO-INTERACTIONS =====
  const tiltElements = document.querySelectorAll(
    ".experience-card, .about-feature-col, .contact-card, .contact-form-card"
  );

  tiltElements.forEach((card) => {
    card.classList.add("motion-tilt");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
});

// Form submission handler
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });
}

// Theme Toggle Logic
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeToggle ? themeToggle.querySelector("i") : null;

// Check for saved theme in localStorage
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  body.classList.add("light-mode");
  if (icon) {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      if (icon) {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    } else {
      localStorage.setItem("theme", "dark");
      if (icon) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    }
  });
}
