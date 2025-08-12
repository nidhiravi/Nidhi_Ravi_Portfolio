// Single Page Scroll Website with Smooth Scrolling
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Active navigation highlighting
  const sections = document.querySelectorAll(".section");
  const navItems = document.querySelectorAll("nav ul li a");

  function updateActiveNav() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  }

  // Update active nav on scroll
  window.addEventListener("scroll", updateActiveNav);

  // Initial active nav
  updateActiveNav();

  // 3D Carousel for Courses and Certifications
  const carousel3d = document.querySelector(".carousel-3d");
  const carouselDots = document.querySelector(".carousel-dots");

  if (carousel3d && carouselDots) {
    const cards = Array.from(carousel3d.children);
    const classOrder = ["active", "right", "back-right", "back-left", "left"];
    let current = 0;
    let interval;

    // Create navigation dots
    carouselDots.innerHTML = "";
    cards.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => {
        current = i;
        updateClasses();
        resetInterval();
      });
      carouselDots.appendChild(dot);
    });
    const dots = Array.from(carouselDots.children);

    function updateClasses() {
      cards.forEach((card, i) => {
        card.className =
          "carousel-3d-card " + classOrder[(i - current + 5) % 5];
      });
      dots.forEach((dot, i) => {
        dot.className = "carousel-dot" + (i === current ? " active" : "");
      });
    }

    function next() {
      current = (current + 1) % cards.length;
      updateClasses();
    }

    function startCarousel() {
      interval = setInterval(next, 2500);
    }

    function stopCarousel() {
      clearInterval(interval);
    }

    function resetInterval() {
      stopCarousel();
      startCarousel();
    }

    carousel3d.addEventListener("mouseenter", stopCarousel);
    carousel3d.addEventListener("mouseleave", startCarousel);

    updateClasses();
    startCarousel();
  }

  // Keyboard navigation support
  document.addEventListener("keydown", function (e) {
    const sections = document.querySelectorAll(".section");
    const currentSection = Array.from(sections).findIndex((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom >= 100;
    });

    if (e.key === "ArrowDown" && currentSection < sections.length - 1) {
      sections[currentSection + 1].scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "ArrowUp" && currentSection > 0) {
      sections[currentSection - 1].scrollIntoView({ behavior: "smooth" });
    }
  });
});
