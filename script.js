// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  setTimeout(() => {
    cursorFollower.style.left = `${e.clientX}px`;
    cursorFollower.style.top = `${e.clientY}px`;
  }, 100);
});

// Function to handle cursor hover effects
const handleCursorHover = (elements) => {
  elements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursor.style.backgroundColor = "var(--accent)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(0.5)";
      cursorFollower.style.borderColor = "var(--accent)";
    });

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.backgroundColor = "var(--accent)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.borderColor = "var(--primary)";
    });
  });
};

// Apply cursor hover effects to interactive elements
handleCursorHover(
  document.querySelectorAll(
    "a, button, .project-card, .filter-btn, .blog-card, .timeline-item, .leadership-card"
  )
);

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const toggleTheme = () => {
  body.classList.toggle("dark-mode");
  const isDarkMode = body.classList.contains("dark-mode");

  themeToggle.innerHTML = isDarkMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
};

themeToggle.addEventListener("click", toggleTheme);

// Check for saved theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

const toggleMobileMenu = () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
};

hamburger.addEventListener("click", toggleMobileMenu);

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Animate Skills on Scroll
const skillProgressBars = document.querySelectorAll(".skill-progress");

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
};

const animateSkills = () => {
  skillProgressBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    if (isElementInViewport(bar)) {
      bar.style.width = `${width}%`;
    }
  });
};

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

// Animation on Scroll
const animateElementsOnScroll = () => {
  const elements = document.querySelectorAll(
    ".section-title, .about-image, .about-text, .timeline-item, " +
      ".blog-card, .project-card, .leadership-card, .testimonial-slider, .contact-form"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Initialize animated elements
document
  .querySelectorAll(
    ".section-title, .about-image, .about-text, .timeline-item, " +
      ".blog-card, .project-card, .leadership-card, .testimonial-slider, .contact-form"
  )
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

window.addEventListener("scroll", animateElementsOnScroll);
window.addEventListener("load", animateElementsOnScroll);

// Project Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    // Filter projects
    projectCards.forEach((card) => {
      card.style.display =
        filterValue === "all" ||
        card.getAttribute("data-category") === filterValue
          ? "block"
          : "none";
    });
  });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const sliderDots = document.querySelectorAll(".slider-dot");
let currentSlide = 0;

const showSlide = (index) => {
  testimonialSlides.forEach((slide) => slide.classList.remove("active"));
  sliderDots.forEach((dot) => dot.classList.remove("active"));

  testimonialSlides[index].classList.add("active");
  sliderDots[index].classList.add("active");
  currentSlide = index;
};

sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

// Auto slide change
setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonialSlides.length;
  showSlide(currentSlide);
}, 5000);

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTopButton.classList.toggle("active", window.pageYOffset > 300);
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Form Submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  // Validate email format
  const email = document.getElementById("email").value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    e.preventDefault();
    alert("Please enter a valid email address.");
    return;
  }

  // Check for empty fields
  const name = document.getElementById("name").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if (!name || !subject || !message) {
    e.preventDefault();
    alert("Please fill in all required fields.");
  }
});
