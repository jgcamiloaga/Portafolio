document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Cerrar el menú al hacer clic en un enlace
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Project card tilt effect
function moveCard(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(-8px, -8px)`;
  card.style.boxShadow = "8px 8px 0 black";
}

// Reset card position when mouse leaves
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

// Animate skill levels on scroll
const skillLevels = document.querySelectorAll(".skill-level");

function animateSkillLevels() {
  skillLevels.forEach((skill) => {
    const level = skill.getAttribute("data-level");
    skill.style.width = "0%";
    setTimeout(() => {
      skill.style.transition = "width 1s ease-in-out";
      skill.style.width = `${level}%`;
    }, 200);
  });
}

// Intersection Observer for skill levels animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillLevels();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document
  .querySelector("#skills")
  .querySelectorAll(".skill-card")
  .forEach((card) => {
    observer.observe(card);
  });

// Form submission handling
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Add your form submission logic here
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    console.log("Form submitted:", formData);
    // You would typically send this data to a server here

    // Reset form
    this.reset();
    alert("Gracias por tu mensaje! Te responderé pronto.");
  });

// Active section highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.backgroundColor = "";
    if (link.getAttribute("href").slice(1) === current) {
      link.style.backgroundColor = "black";
      link.style.color = "white";
    } else {
      link.style.backgroundColor = "";
      link.style.color = "black";
    }
  });
});

// Animación de carga inicial
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar animación de carga por 2 segundos
  setTimeout(() => {
    document.querySelector(".initial-loading").classList.add("hide");
    startPageAnimations();
  }, 1500);
});

// Iniciar animaciones de la página
function startPageAnimations() {
  // Animar títulos de la sección inicial
  const titles = document.querySelectorAll(".animate-title");
  titles.forEach((title, index) => {
    setTimeout(() => {
      title.classList.add("show");
    }, 500 * index);
  });

  // Activar efecto glitch
  const glitchText = document.querySelector(".glitch");
  if (glitchText) {
    glitchText.classList.add("show");
  }
}

// Animación al hacer scroll
function handleScrollAnimations() {
  const sections = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Iniciar observador de scroll
handleScrollAnimations();

// Función para animar elementos secuencialmente
function animateSequentially(elements, delayBetween = 200) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * delayBetween);
  });
}

// Aplicar animaciones secuenciales a los elementos de navegación
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.style.opacity = "0";
    link.style.transform = "translateY(-20px)";
    link.style.transition = "all 0.5s ease";
  });

  // Comenzar animación después de un pequeño delay
  setTimeout(() => {
    animateSequentially(navLinks);
  }, 1500); // Después de la animación de carga
});