// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // ===== INICIALIZACIÓN DE COMPONENTES =====
  initializeNavigation();
  initializeSmoothScrolling();
  initializeProjectCards();
  initializeSkillsAnimation();
  initializeContactForm();
  initializeScrollAnimations();
  initializeLoadingAnimation();
  createParticles();
  initializeScrollTopButton();

  // Inicializar el efecto 3D para las tarjetas de proyectos
  initializeCardTilt();

  // Inicializar animaciones para tarjetas de educación
  initializeEducationCards();
});

// ===== NAVEGACIÓN =====
function initializeNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-link");

  if (!menuToggle || !navLinks) return;

  // Toggle del menú hamburguesa
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Cerrar el menú al hacer clic en un enlace
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });

    // Preparar para animación secuencial
    link.style.opacity = "0";
    link.style.transform = "translateY(-20px)";
    link.style.transition = "all 0.5s ease";
  });

  // Animación secuencial de los enlaces de navegación
  setTimeout(() => {
    animateSequentially(navLinksItems);
  }, 1000);

  // Resaltado de sección activa
  initializeActiveSection(navLinksItems);
}

// Resaltado de sección activa durante el scroll
function initializeActiveSection(navLinks) {
  const sections = document.querySelectorAll("section");

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
      link.classList.remove("active-link");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active-link");
      }
    });
  });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return; // Evitar errores con enlaces vacíos

      const target = document.querySelector(targetId);
      if (target) {
        // Usar window.scrollTo en lugar de scrollIntoView para mayor compatibilidad
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== TARJETAS DE PROYECTOS =====
function initializeProjectCards() {
  const projectCards = document.querySelectorAll("#projects .project-card");

  // Detectar si es un dispositivo táctil
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  projectCards.forEach((card) => {
    // Asegurarse de que la tarjeta tenga el estilo transform-style: preserve-3d
    card.style.transformStyle = "preserve-3d";

    if (isTouchDevice) {
      // En dispositivos táctiles, usamos eventos touch
      card.addEventListener("touchstart", handleTouchStart);
      card.addEventListener("touchend", handleTouchEnd);
    } else {
      // En dispositivos no táctiles, usamos eventos de mouse
      card.addEventListener("mousemove", moveCard);
      card.addEventListener("mouseleave", resetCard);
      card.addEventListener("mouseenter", enterCard);
    }
  });

  console.log(`Inicializadas ${projectCards.length} tarjetas de proyectos`);
}

// Función para inicializar el efecto de inclinación 3D
function initializeCardTilt() {
  // Esta función ahora está integrada en initializeProjectCards
  console.log("Efecto de inclinación 3D inicializado correctamente");
}

// Función para cuando el mouse entra en la tarjeta
function enterCard(e) {
  const card = e.currentTarget;

  // Añadir una transición suave al entrar
  card.style.transition = "transform 0.2s ease-out";
  setTimeout(() => {
    card.style.transition = "none"; // Quitar la transición después para que el movimiento sea fluido
  }, 200);

  // Aplicar efecto inicial de agrandamiento
  card.style.transform = "scale(1.05)";

  // Mostrar overlay
  const overlay = card.querySelector(".project-overlay");
  if (overlay) {
    overlay.style.opacity = "1";
  }
}

// Función para el efecto de inclinación
function moveCard(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Aumentar el factor de rotación para un efecto más visible
  const rotateX = ((y - centerY) / 10) * 1.5;
  const rotateY = ((centerX - x) / 10) * 1.5;

  // Aplicar transformación 3D con perspectiva
  card.style.transform = `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // Asegurarse de que el overlay sea visible
  const overlay = card.querySelector(".project-overlay");
  if (overlay) {
    overlay.style.opacity = "1";
  }
}

// Función para resetear la tarjeta
function resetCard(e) {
  const card = e.currentTarget;

  // Añadir transición suave al salir
  card.style.transition = "transform 0.5s ease";

  // Resetear transformación
  card.style.transform = "";

  // Ocultar overlay
  const overlay = card.querySelector(".project-overlay");
  if (overlay) {
    overlay.style.opacity = "";
  }
}

// Función para manejar el inicio del toque
function handleTouchStart(e) {
  e.preventDefault();
  const card = e.currentTarget;

  // Alternar la clase active-mobile para mostrar/ocultar el overlay
  card.classList.toggle("active-mobile");

  // Si la tarjeta está activa, aplicar efecto de elevación
  if (card.classList.contains("active-mobile")) {
    card.style.transform = "scale(1.05)";
  } else {
    card.style.transform = "";
  }
}

// Función para manejar el fin del toque
function handleTouchEnd(e) {
  // No hacemos nada aquí, ya que queremos que el overlay permanezca visible
  // hasta que el usuario toque nuevamente
}

// ===== TARJETAS DE EDUCACIÓN =====
function initializeEducationCards() {
  const educationCards = document.querySelectorAll(
    "#education .education-card"
  );

  // Detectar si es un dispositivo táctil
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  educationCards.forEach((card, index) => {
    // Añadir un pequeño retraso inicial para crear un efecto escalonado
    card.style.transitionDelay = `${index * 0.05}s`;

    // Para dispositivos no táctiles
    if (!isTouchDevice) {
      // Animación al pasar el mouse
      card.addEventListener("mouseenter", () => {
        // Efecto de elevación
        card.style.zIndex = "10";

        // Animar elementos internos
        const title = card.querySelector(".education-title");
        const year = card.querySelector(".education-year");
        const school = card.querySelector(".education-school");
        const description = card.querySelector(".education-description");

        if (title) title.style.transform = "translateX(5px)";
        if (year) year.style.backgroundColor = "black";
        if (year) year.style.color = "white";
        if (school) school.style.transform = "translateX(-5px)";
        if (description) {
          description.style.transform = "translateY(-3px)";
          description.style.opacity = "1";
        }
      });

      card.addEventListener("mouseleave", () => {
        // Restaurar z-index
        setTimeout(() => {
          card.style.zIndex = "";
        }, 300);

        // Restaurar elementos internos
        const title = card.querySelector(".education-title");
        const year = card.querySelector(".education-year");
        const school = card.querySelector(".education-school");
        const description = card.querySelector(".education-description");

        if (title) title.style.transform = "";
        if (year) year.style.backgroundColor = "";
        if (year) year.style.color = "";
        if (school) school.style.transform = "";
        if (description) {
          description.style.transform = "";
          description.style.opacity = "";
        }
      });
    } else {
      // Para dispositivos táctiles
      card.addEventListener("touchstart", (e) => {
        e.preventDefault();

        // Alternar la clase para el efecto
        const wasActive = card.classList.contains("active-touch");

        // Primero, eliminar la clase de todas las tarjetas
        educationCards.forEach((c) => {
          c.classList.remove("active-touch");
          c.style.transform = "";
          c.style.boxShadow = "";
          c.style.zIndex = "";

          // Resetear elementos internos
          const title = c.querySelector(".education-title");
          const year = c.querySelector(".education-year");
          const school = c.querySelector(".education-school");
          const description = c.querySelector(".education-description");

          if (title) title.style.transform = "";
          if (year) year.style.backgroundColor = "";
          if (year) year.style.color = "";
          if (school) school.style.transform = "";
          if (description) {
            description.style.transform = "";
            description.style.opacity = "";
          }
        });

        // Luego, añadir la clase solo a la tarjeta actual si no estaba activa
        if (!wasActive) {
          card.classList.add("active-touch");
          card.style.transform = "translateY(-15px)";
          card.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
          card.style.zIndex = "10";

          // Animar elementos internos
          const title = card.querySelector(".education-title");
          const year = card.querySelector(".education-year");
          const school = card.querySelector(".education-school");
          const description = card.querySelector(".education-description");

          if (title) title.style.transform = "translateX(5px)";
          if (year) year.style.backgroundColor = "black";
          if (year) year.style.color = "white";
          if (school) school.style.transform = "translateX(-5px)";
          if (description) {
            description.style.transform = "translateY(-3px)";
            description.style.opacity = "1";
          }
        }
      });
    }
  });

  console.log(
    `Inicializadas ${educationCards.length} tarjetas de educación con animación mejorada`
  );
}

// ===== ANIMACIÓN DE HABILIDADES =====
function initializeSkillsAnimation() {
  const skillsSection = document.querySelector("#skills");
  if (!skillsSection) return;

  const skillLevels = document.querySelectorAll(".skill-level");

  // Intersection Observer para animar las barras de habilidades
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillLevels(skillLevels);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillsSection.querySelectorAll(".skill-card").forEach((card) => {
    observer.observe(card);
  });
}

function animateSkillLevels(skillLevels) {
  skillLevels.forEach((skill) => {
    const level = skill.getAttribute("data-level");
    skill.style.width = "0%";
    setTimeout(() => {
      skill.style.transition = "width 1s ease-in-out";
      skill.style.width = `${level}%`;
    }, 200);
  });
}

// ===== FORMULARIO DE CONTACTO =====
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Recoger datos del formulario
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    console.log("Form submitted:", formData);
    // Aquí iría la lógica para enviar los datos al servidor

    // Resetear formulario y mostrar confirmación
    this.reset();
    alert("Gracias por tu mensaje! Te responderé pronto.");
  });
}

// ===== ANIMACIONES DE SCROLL =====
function initializeScrollAnimations() {
  // Inicializar animaciones de fade-in
  const fadeInSections = document.querySelectorAll(".fade-in-section");
  console.log(`Se encontraron ${fadeInSections.length} secciones con fade-in`);

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeInSections.forEach((section) => {
    fadeObserver.observe(section);
  });

  // Inicializar animaciones avanzadas de scroll
  handleScrollAnimations();

  // Escuchar eventos de scroll
  window.addEventListener("scroll", () => {
    handleScrollAnimations();
  });

  // También ejecutar en resize para manejar cambios de orientación
  window.addEventListener("resize", () => {
    handleScrollAnimations();
  });
}

// Función para manejar las animaciones de scroll avanzadas
function handleScrollAnimations() {
  const scrollAnimations = document.querySelectorAll(".scroll-animation");
  const sections = document.querySelectorAll(".section");

  // Verificar si un elemento está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Elemento está parcialmente visible
    const isVisible =
      rect.top <= windowHeight * 0.85 && rect.bottom >= windowHeight * 0.15;

    // Elemento está completamente fuera de la vista (para animaciones de salida)
    const isCompletelyOutOfView = rect.bottom <= 0 || rect.top >= windowHeight;

    return { isVisible, isCompletelyOutOfView };
  }

  // Aplicar animaciones a elementos
  scrollAnimations.forEach((animation) => {
    const { isVisible, isCompletelyOutOfView } = isInViewport(animation);

    if (isVisible) {
      animation.classList.add("active");
    } else if (
      animation.classList.contains("exit-enabled") &&
      isCompletelyOutOfView
    ) {
      animation.classList.remove("active");
      animation.classList.add("exit-active");
    } else if (
      animation.classList.contains("exit-enabled") &&
      !isCompletelyOutOfView
    ) {
      animation.classList.remove("exit-active");
    }
  });

  // Aplicar clase a secciones en vista
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
      section.classList.add("in-view");
    } else {
      section.classList.remove("in-view");
    }
  });
}

// ===== ANIMACIÓN DE CARGA INICIAL =====
function initializeLoadingAnimation() {
  const loadingScreen = document.querySelector(".initial-loading");
  if (!loadingScreen) return;

  // Mostrar animación de carga por 1.5 segundos
  setTimeout(() => {
    loadingScreen.classList.add("hide");
    startPageAnimations();
  }, 100);
}

// Iniciar animaciones de la página después de la carga
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

// ===== PARTÍCULAS DE FONDO =====
function createParticles() {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    // Crear contenedor de partículas si no existe
    if (!section.querySelector(".particles")) {
      const particles = document.createElement("div");
      particles.className = "particles";
      section.appendChild(particles);

      // Crear partículas
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("span");
        particle.className = "particle";

        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        // Tamaño aleatorio
        const size = Math.random() * 10 + 5;

        // Duración y retraso aleatorios
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        // Aplicar estilos
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particles.appendChild(particle);
      }
    }
  });
}

// ===== BOTÓN DE VOLVER ARRIBA =====
function initializeScrollTopButton() {
  const scrollTopButton = document.querySelector(".scroll-top-button");
  if (!scrollTopButton) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopButton.classList.add("active");
    } else {
      scrollTopButton.classList.remove("active");
    }
  });

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===== FUNCIONES UTILITARIAS =====
// Función para animar elementos secuencialmente
function animateSequentially(elements, delayBetween = 200) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * delayBetween);
  });
}
