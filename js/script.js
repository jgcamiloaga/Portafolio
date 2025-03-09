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
  try {
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
  } catch (error) {
    console.error("Error en smooth scrolling:", error);
  }
}

// ===== TARJETAS DE PROYECTOS - DISEÑO COMPLETAMENTE NUEVO =====
function initializeProjectCards() {
  const projectCards = document.querySelectorAll("#projects .project-card");

  // Detectar si es un dispositivo táctil
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.body.classList.add("touch-device");
  }

  projectCards.forEach((card, index) => {
    // Obtener elementos internos originales
    const previewEl = card.querySelector(".project-preview");
    const imageEl = card.querySelector(".project-image");
    const overlayEl = card.querySelector(".project-overlay");
    const titleEl = overlayEl ? overlayEl.querySelector("h3") : null;
    const subtitleEl = overlayEl ? overlayEl.querySelector("p") : null;
    const descriptionEl = overlayEl
      ? overlayEl.querySelector(".project-description")
      : null;
    const linksEl = card.querySelector(".project-links");

    // Crear la nueva estructura de tarjeta con efecto de flip 3D

    // Contenedor principal para el efecto flip
    const flipContainer = document.createElement("div");
    flipContainer.className = "project-flip-container";

    // Elemento que rota
    const flipper = document.createElement("div");
    flipper.className = "project-flipper";

    // Cara frontal (imagen)
    const frontFace = document.createElement("div");
    frontFace.className = "project-front";

    // Número de proyecto
    const projectNumber = document.createElement("div");
    projectNumber.className = "project-number";
    projectNumber.textContent = `0${index + 1}`;
    frontFace.appendChild(projectNumber);

    // Imagen
    if (imageEl) {
      const imageContainer = document.createElement("div");
      imageContainer.className = "project-image-container";
      imageContainer.appendChild(imageEl.cloneNode(true));
      frontFace.appendChild(imageContainer);
    } else {
      const imageContainer = document.createElement("div");
      imageContainer.className = "project-image-container";
      const newImage = document.createElement("img");
      newImage.className = "project-image";
      newImage.src = "img/placeholder.jpg";
      newImage.alt = "Vista previa del proyecto";
      imageContainer.appendChild(newImage);
      frontFace.appendChild(imageContainer);
    }

    // Título en la cara frontal
    if (titleEl && subtitleEl) {
      const frontTitle = document.createElement("div");
      frontTitle.className = "project-front-title";

      const title = document.createElement("h3");
      title.textContent = titleEl.textContent;

      const subtitle = document.createElement("p");
      subtitle.textContent = subtitleEl.textContent;

      frontTitle.appendChild(title);
      frontTitle.appendChild(subtitle);
      frontFace.appendChild(frontTitle);
    }

    // Cara trasera (detalles)
    const backFace = document.createElement("div");
    backFace.className = "project-back";

    // Contenido de la cara trasera
    const backContent = document.createElement("div");
    backContent.className = "project-back-content";

    // Título y subtítulo en la cara trasera
    if (titleEl && subtitleEl) {
      const title = document.createElement("h3");
      title.className = "project-title";
      title.textContent = titleEl.textContent;

      const subtitle = document.createElement("p");
      subtitle.className = "project-subtitle";
      subtitle.textContent = subtitleEl.textContent;

      backContent.appendChild(title);
      backContent.appendChild(subtitle);
    }

    // Descripción
    if (descriptionEl) {
      const description = document.createElement("p");
      description.className = "project-description";
      description.textContent = descriptionEl.textContent;
      backContent.appendChild(description);
    }

    // Enlaces
    if (linksEl) {
      const linksContainer = document.createElement("div");
      linksContainer.className = "project-links";

      // Clonar los enlaces
      const originalLinks = linksEl.querySelectorAll("a");
      originalLinks.forEach((link) => {
        const newLink = document.createElement("a");
        newLink.href = link.href;
        newLink.className = "project-link";
        newLink.textContent = link.textContent;
        newLink.target = "_blank";
        linksContainer.appendChild(newLink);
      });

      backContent.appendChild(linksContainer);
    }

    backFace.appendChild(backContent);

    // Ensamblar la estructura
    flipper.appendChild(frontFace);
    flipper.appendChild(backFace);
    flipContainer.appendChild(flipper);

    // Limpiar y reconstruir la tarjeta
    card.innerHTML = "";
    card.appendChild(flipContainer);

    // Añadir eventos para dispositivos táctiles
    if (isTouchDevice) {
      card.addEventListener("touchstart", function (e) {
        e.preventDefault();

        // Cerrar otras tarjetas abiertas
        projectCards.forEach((otherCard) => {
          if (otherCard !== this) {
            otherCard.classList.remove("active");
          }
        });

        // Alternar estado activo
        this.classList.toggle("active");
      });
    }
  });

  console.log(
    `Inicializadas ${projectCards.length} tarjetas de proyectos con nuevo diseño de flip 3D`
  );
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
      // Para dispositivos táctiles - Versión mejorada
      card.addEventListener("touchstart", function (e) {
        e.preventDefault();

        // Primero, desactivar todas las tarjetas
        educationCards.forEach((c) => {
          if (c !== this) {
            c.classList.remove("active-touch");

            // Resetear estilos
            const title = c.querySelector(".education-title");
            const year = c.querySelector(".education-year");
            const school = c.querySelector(".education-school");
            const description = c.querySelector(".education-description");

            if (title) title.style.transform = "";
            if (year) {
              year.style.backgroundColor = "";
              year.style.color = "";
            }
            if (school) school.style.transform = "";
            if (description) {
              description.style.transform = "";
              description.style.opacity = "";
            }
          }
        });

        // Alternar estado de la tarjeta actual
        this.classList.toggle("active-touch");

        // Aplicar o quitar estilos según el estado
        const isActive = this.classList.contains("active-touch");
        const title = this.querySelector(".education-title");
        const year = this.querySelector(".education-year");
        const school = this.querySelector(".education-school");
        const description = this.querySelector(".education-description");

        if (isActive) {
          this.style.transform = "translateY(-15px) scale(1.02)";
          this.style.boxShadow = "15px 15px 0 rgba(0, 0, 0, 0.2)";
          this.style.zIndex = "10";

          if (title) title.style.transform = "translateX(5px)";
          if (year) {
            year.style.backgroundColor = "black";
            year.style.color = "white";
          }
          if (school) school.style.transform = "translateX(-5px)";
          if (description) {
            description.style.transform = "translateY(-3px)";
            description.style.opacity = "1";
          }
        } else {
          this.style.transform = "";
          this.style.boxShadow = "";
          this.style.zIndex = "";

          if (title) title.style.transform = "";
          if (year) {
            year.style.backgroundColor = "";
            year.style.color = "";
          }
          if (school) school.style.transform = "";
          if (description) {
            description.style.transform = "";
            description.style.opacity = "";
          }
        }
      });
    }
  });

  console.log(
    `Inicializadas ${educationCards.length} tarjetas de educación con animación mejorada`
  );
}

// ===== NUEVA SECCIÓN DE SKILLS CON LOGOS =====
function initializeSkillsAnimation() {
  const skillsSection = document.querySelector("#skills");
  if (!skillsSection) return;

  // Crear nuevas tarjetas de habilidades con logos
  const skillsGrid = skillsSection.querySelector(".skills-grid");
  if (!skillsGrid) return;

  // Limpiar el grid existente
  skillsGrid.innerHTML = "";

  // Definir las habilidades con sus logos y niveles
  const skills = [
    {
      name: "HTML",
      level: 90,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>`,
    },
    {
      name: "CSS",
      level: 85,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11v11h-11z"></path><path d="M3 3v18h18V3H3z"></path></svg>`,
    },
    {
      name: "JAVASCRIPT",
      level: 80,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17V7c0-2-2-3-4-3H8C6 4 4 5 4 7v10c0 2 2 3 4 3h8c2 0 4-1 4-3z"></path><path d="M9 8h1"></path><path d="M14 8h1"></path><path d="M9 12h6"></path><path d="M9 16h6"></path></svg>`,
    },
    {
      name: "REACT",
      level: 60,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M12 6a9.77 9.77 0 0 1 8.82 5.5A9.77 9.77 0 0 1 12 17a9.77 9.77 0 0 1-8.82-5.5A9.77 9.77 0 0 1 12 6z"></path></svg>`,
    },
    {
      name: "PYTHON",
      level: 75,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9h.01"></path><path d="M11 12h1v4h1"></path><path d="M8 20V8c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v12H8z"></path><path d="M10 14h4"></path></svg>`,
    },
    {
      name: "FLASK",
      level: 60,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v2H9zM8 14c0 4 1.5 6 4 6s4-2 4-6-1-8-4-8-4 4-4 8z"></path><path d="M7 9h10"></path></svg>`,
    },
    {
      name: "MYSQL",
      level: 75,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path><path d="M3 10h18"></path><path d="M10 3v18"></path></svg>`,
    },
    {
      name: "FIGMA",
      level: 80,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path></svg>`,
    },
    {
      name: "TAILWIND",
      level: 65,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><path d="M6 8h12"></path><path d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12"></path><path d="M6.6 15.6A2 2 0 1 0 10 17v-5"></path></svg>`,
    },
    {
      name: "JAVA",
      level: 80,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12.5c1.4-1.7 3.8-3.2 9.8-3.2 6 0 10 1.5 10 3.5s-4 3.5-10 3.5c-6.5 0-8.7-1.8-9.8-3.8"></path><path d="M5 10V7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v3"></path></svg>`,
    },
  ];

  // Crear las tarjetas de habilidades
  skills.forEach((skill, index) => {
    const skillCard = document.createElement("div");
    skillCard.className = `skill-card scroll-animation ${
      index % 2 === 0 ? "from-left" : "from-right"
    } delay-${(index % 5) + 1}`;

    // Crear el logo
    const skillLogo = document.createElement("div");
    skillLogo.className = "skill-logo";
    skillLogo.innerHTML = skill.logo;

    // Crear el nombre de la habilidad
    const skillName = document.createElement("h3");
    skillName.className = "skill-name";
    skillName.textContent = skill.name;

    // Crear el indicador de nivel
    const skillLevel = document.createElement("div");
    skillLevel.className = "skill-level";
    skillLevel.textContent = `${skill.level}%`;

    // Crear los puntos indicadores de nivel
    const skillLevelIndicator = document.createElement("div");
    skillLevelIndicator.className = "skill-level-indicator";

    // Crear 5 puntos, llenando según el nivel
    const dotsCount = 5;
    const filledDots = Math.round((skill.level / 100) * dotsCount);

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement("div");
      dot.className = `skill-dot ${i < filledDots ? "filled" : ""}`;
      skillLevelIndicator.appendChild(dot);
    }

    // Ensamblar la tarjeta
    skillCard.appendChild(skillLogo);
    skillCard.appendChild(skillName);
    skillCard.appendChild(skillLevel);
    skillCard.appendChild(skillLevelIndicator);

    // Añadir la tarjeta al grid
    skillsGrid.appendChild(skillCard);
  });

  console.log(
    `Inicializadas ${skills.length} tarjetas de habilidades con logos`
  );
}

// ===== FORMULARIO DE CONTACTO =====
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  // Mejorar la animación de los campos del formulario
  const formGroups = contactForm.querySelectorAll(".form-group");

  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea");
    const label = group.querySelector("label");

    if (input && label) {
      // Verificar si el campo ya tiene valor al cargar
      if (input.value.trim() !== "") {
        label.classList.add("active");
      }

      // Eventos para la animación
      input.addEventListener("focus", () => {
        label.classList.add("active");
        input.classList.add("active");
      });

      input.addEventListener("blur", () => {
        if (input.value.trim() === "") {
          label.classList.remove("active");
        }
        input.classList.remove("active");
      });
    }
  });

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

    // Resetear también las clases active de las etiquetas
    formGroups.forEach((group) => {
      const label = group.querySelector("label");
      if (label) {
        label.classList.remove("active");
      }
    });

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
