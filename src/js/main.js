// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Reveal elements on scroll
window.addEventListener("scroll", reveal);

function reveal() {
  const reveals = document.querySelectorAll(".skill-card, .project-card");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}

// Theme Toggle with modern best practices
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sunIcon = '<i class="fas fa-sun"></i>';
const moonIcon = '<i class="fas fa-moon"></i>';
const STORAGE_KEY = "riya-portfolio-theme";
const DARK_THEME = "dark-theme";
const LIGHT_THEME = "light-theme";

// Initialize theme based on:
// 1. User's previous preference in localStorage
// 2. System preference (prefers-color-scheme)
// 3. Default to light theme if neither is available
function initializeTheme() {
  // Check localStorage first
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme) {
    applyTheme(savedTheme);
    return;
  }

  // If no saved theme, check system preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersDarkScheme.matches) {
    applyTheme(DARK_THEME);
  } else {
    applyTheme(LIGHT_THEME);
  }

  // Listen for system theme changes
  prefersDarkScheme.addEventListener("change", (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
    }
  });
}

function applyTheme(theme) {
  if (theme === DARK_THEME) {
    body.classList.add(DARK_THEME);
    themeToggle.innerHTML = sunIcon;
    themeToggle.setAttribute("aria-label", "Switch to light theme");
  } else {
    body.classList.remove(DARK_THEME);
    themeToggle.innerHTML = moonIcon;
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
  }
}

// Toggle theme when button is clicked
themeToggle.addEventListener("click", () => {
  const isDarkTheme = body.classList.contains(DARK_THEME);
  const newTheme = isDarkTheme ? LIGHT_THEME : DARK_THEME;

  applyTheme(newTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);

  // Dispatch custom event for theme change
  window.dispatchEvent(
    new CustomEvent("themechange", {
      detail: { theme: newTheme },
    })
  );
});

// Initialize theme on page load
initializeTheme();

// Project Carousel
const projectsGrid = document.querySelector(".projects-grid");
const prevArrow = document.querySelector(".prev-arrow");
const nextArrow = document.querySelector(".next-arrow");

nextArrow.addEventListener("click", () => {
  const cardWidth = document.querySelector(".project-card").offsetWidth;
  const gap = parseInt(window.getComputedStyle(projectsGrid).gap);
  projectsGrid.scrollBy({
    left: cardWidth + gap,
    behavior: "smooth",
  });
});

prevArrow.addEventListener("click", () => {
  const cardWidth = document.querySelector(".project-card").offsetWidth;
  const gap = parseInt(window.getComputedStyle(projectsGrid).gap);
  projectsGrid.scrollBy({
    left: -(cardWidth + gap),
    behavior: "smooth",
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll Animation
window.addEventListener("scroll", reveal);
function reveal() {
  const reveals = document.querySelectorAll(".skill-card, .project-card");
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 150) {
      element.classList.add("active");
    }
  });
}
reveal();

// Typed.js initialization for the animated text in hero section
var typed = new Typed("#typed-element", {
  strings: [
    "Full Stack Developer",
    "Software Developer"
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  startDelay: 500,
  backDelay: 1000,
  cursorChar: "|",
});

// Add smooth transition for animated text (no longer needed with Typed.js)
// const animatedText = document.querySelector('.animated-text');
// window.addEventListener('load', () => {
//     animatedText.style.opacity = '1';
// });

// Contact form handling
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        formStatus.innerHTML =
          '<p class="success-message">Thanks for your message! I will get back to you soon.</p>';
        contactForm.reset();

        // Clear success message after 5 seconds
        setTimeout(() => {
          formStatus.innerHTML = "";
        }, 5000);
      })
      .catch((error) => {
        formStatus.innerHTML =
          '<p class="error-message">Oops! There was a problem submitting your form. Please try again.</p>';

        // Clear error message after 5 seconds
        setTimeout(() => {
          formStatus.innerHTML = "";
        }, 5000);
      });
  });
}

// Check if mobile menu should be initialized (only on mobile)
function isMobileView() {
  return window.innerWidth <= 768;
}

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const menuOverlay = document.getElementById("menu-overlay");

  // Only initialize mobile menu on mobile devices
  if (mobileMenuBtn && navLinks && menuOverlay && isMobileView()) {
    console.log("Mobile menu elements found and initialized");

    // Toggle menu when hamburger is clicked
    mobileMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close menu when overlay is clicked
    menuOverlay.addEventListener("click", function () {
      closeMobileMenu();
    });

    // Close menu when a navigation link is clicked
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", function () {
        closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      const isMenuOpen = navLinks.classList.contains("active");
      const clickedInsideMenu = navLinks.contains(e.target);
      const clickedOnButton = mobileMenuBtn.contains(e.target);

      if (isMenuOpen && !clickedInsideMenu && !clickedOnButton) {
        closeMobileMenu();
      }
    });
  }

  function toggleMobileMenu() {
    if (!isMobileView()) return; // Only toggle on mobile

    console.log("Toggling mobile menu");
    mobileMenuBtn.classList.toggle("menu-open");
    navLinks.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    document.body.classList.toggle("menu-active");
  }

  function closeMobileMenu() {
    if (!isMobileView()) return; // Only close on mobile

    console.log("Closing mobile menu");
    mobileMenuBtn.classList.remove("menu-open");
    navLinks.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-active");
  }

  // Handle resize events to adapt between mobile and desktop
  window.addEventListener("resize", function () {
    if (!isMobileView() && navLinks.classList.contains("active")) {
      // If we resize to desktop while menu is open, close it
      closeMobileMenu();
    }
  });
});

// Navbar scroll effect and active link highlighting
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const scrollPosition = window.scrollY;

  // Add scrolled class to navbar when scrolled
  if (scrollPosition > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Highlight active section in navbar
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});
