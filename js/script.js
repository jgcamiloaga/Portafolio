// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // ===== INICIALIZACIÓN DE COMPONENTES =====
  initializeNavigation();
  initializeSmoothScrolling();
  initializeProjectCards();
  initializeSkillsAnimation();
  initializeContactForm();
  initializeScrollAnimationsFunc();
  initializeLoadingAnimation();
  createParticles();
  initializeScrollTopButton();

  // Añadir manualmente los eventos moveCard a las tarjetas de proyectos
  setupProjectCardEvents();
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
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
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
    // Limpiar cualquier evento previo para evitar duplicados
    card.removeEventListener("mouseleave", resetCard);
    card.removeEventListener("touchstart", handleTouchStart);
    card.removeEventListener("touchend", handleTouchEnd);

    if (isTouchDevice) {
      // En dispositivos táctiles, usamos eventos touch
      card.addEventListener("touchstart", handleTouchStart);
      card.addEventListener("touchend", handleTouchEnd);

      // Eliminar el atributo onmousemove para evitar conflictos en dispositivos táctiles
      card.removeAttribute("onmousemove");
    } else {
      // En dispositivos no táctiles, aseguramos que el evento mouseleave esté activo
      card.addEventListener("mouseleave", resetCard);

      // Asegurarnos de que el evento mousemove esté correctamente configurado
      card.setAttribute("onmousemove", "moveCard(event)");
    }
  });

  console.log(`Inicializadas ${projectCards.length} tarjetas de proyectos`);
}

// Función para configurar eventos de tarjetas de proyectos
function setupProjectCardEvents() {
  const projectCards = document.querySelectorAll("#projects .project-card");
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  projectCards.forEach((card) => {
    if (!isTouchDevice) {
      // Añadir el evento mousemove directamente
      card.addEventListener("mousemove", moveCard);
      card.addEventListener("mouseleave", resetCard);
    } else {
      // En dispositivos táctiles
      card.addEventListener("touchstart", handleTouchStart);
      card.addEventListener("touchend", handleTouchEnd);
    }
  });

  console.log(
    `Configurados eventos para ${projectCards.length} tarjetas de proyectos`
  );
}

// Función para manejar el inicio del toque
function handleTouchStart(e) {
  e.preventDefault();
  const card = e.currentTarget;

  // Alternar la clase active-mobile para mostrar/ocultar el overlay
  card.classList.toggle("active-mobile");

  // Si la tarjeta está activa, aplicar efecto de elevación
  if (card.classList.contains("active-mobile")) {
    card.style.transform = "translate(-8px, -8px)";
    card.style.boxShadow = "8px 8px 0 black";
  } else {
    resetCard({ currentTarget: card });
  }
}

// Función para manejar el fin del toque
function handleTouchEnd(e) {
  // No hacemos nada aquí, ya que queremos que el overlay permanezca visible
  // hasta que el usuario toque nuevamente
}

// Función para el efecto de inclinación
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

  // Asegurarse de que el overlay sea visible
  const overlay = card.querySelector(".project-overlay");
  if (overlay) {
    overlay.style.opacity = "1";
  }
}

// Función para resetear la tarjeta
function resetCard(e) {
  const card = e.currentTarget;
  card.style.transform = "";
  card.style.boxShadow = "";

  // Ocultar el overlay al salir (solo en dispositivos no táctiles)
  if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    const overlay = card.querySelector(".project-overlay");
    if (overlay) {
      overlay.style.opacity = "";
    }
  }
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
function initializeScrollAnimationsFunc() {
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
