// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // ===== INICIALIZACIÓN DE COMPONENTES =====
  initializeNavigation();
  initializeSmoothScrolling();
  initializeProjectCards();
  initializeSkillsAnimation();
  initializeContactForm();
  initializeScrollAnimations();
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
    // Error en smooth scrolling
  }
}

// ===== TARJETAS DE PROYECTOS - DISEÑO TILT 3D INTERACTIVO PREMIUM =====
function initializeProjectCards() {
  const projectCards = document.querySelectorAll("#projects .project-card");

  // Función mejorada para detectar dispositivos táctiles
  function detectTouchDevice() {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    // Añadir clase al body para poder aplicar estilos específicos
    if (isTouchDevice) {
      document.body.classList.add("touch-device");
    } else {
      document.body.classList.add("no-touch-device");
    }

    return isTouchDevice;
  }

  // Llamar a esta función al inicio y guardar el resultado
  const isTouchDevice = detectTouchDevice();

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

    if (isTouchDevice) {
      // NUEVO DISEÑO PREMIUM PARA MÓVIL
      // Limpiar la tarjeta
      card.innerHTML = "";

      // Crear la estructura principal
      const cardMobile = document.createElement("div");
      cardMobile.className = "project-card-mobile";

      // Sección de imagen
      const imageSection = document.createElement("div");
      imageSection.className = "project-image-section";

      // Imagen
      if (imageEl) {
        imageSection.appendChild(imageEl.cloneNode(true));
      } else {
        const newImage = document.createElement("img");
        newImage.className = "project-image";
        newImage.src = "img/placeholder.jpg";
        newImage.alt = "Vista previa del proyecto";
        imageSection.appendChild(newImage);
      }

      // Overlay
      const overlay = document.createElement("div");
      overlay.className = "project-overlay";
      imageSection.appendChild(overlay);

      // Número de proyecto
      const projectNumber = document.createElement("div");
      projectNumber.className = "project-number";
      projectNumber.textContent = `0${index + 1}`;
      imageSection.appendChild(projectNumber);

      // Sección de contenido
      const contentSection = document.createElement("div");
      contentSection.className = "project-content-section";

      // Título
      if (titleEl) {
        const title = document.createElement("h3");
        title.className = "project-title";
        title.textContent = titleEl.textContent;
        contentSection.appendChild(title);
      }

      // Subtítulo
      if (subtitleEl) {
        const subtitle = document.createElement("p");
        subtitle.className = "project-subtitle";
        subtitle.textContent = subtitleEl.textContent;
        contentSection.appendChild(subtitle);
      }

      // Descripción
      if (descriptionEl) {
        const description = document.createElement("div");
        description.className = "project-description";
        description.textContent = descriptionEl.textContent;
        contentSection.appendChild(description);
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

        contentSection.appendChild(linksContainer);
      }

      // Botón de expandir
      const expandBtn = document.createElement("div");
      expandBtn.className = "project-expand-btn";
      contentSection.appendChild(expandBtn);

      // Elementos decorativos
      const decoration1 = document.createElement("div");
      decoration1.className = "project-decoration project-decoration-1";
      cardMobile.appendChild(decoration1);

      const decoration2 = document.createElement("div");
      decoration2.className = "project-decoration project-decoration-2";
      contentSection.appendChild(decoration2);

      const decoration3 = document.createElement("div");
      decoration3.className = "project-decoration project-decoration-3";
      contentSection.appendChild(decoration3);

      // Ensamblar la estructura
      cardMobile.appendChild(imageSection);
      cardMobile.appendChild(contentSection);
      card.appendChild(cardMobile);

      // Añadir evento de toque al botón de expandir
      expandBtn.addEventListener(
        "touchstart",
        (e) => {
          e.stopPropagation(); // Evitar que el evento se propague

          // Alternar clase activa
          const isActive = card.classList.contains("touch-active");

          // Cerrar otras tarjetas activas
          document
            .querySelectorAll("#projects .project-card.touch-active")
            .forEach((activeCard) => {
              if (activeCard !== card) {
                activeCard.classList.remove("touch-active");
              }
            });

          // Alternar estado de la tarjeta actual
          if (isActive) {
            card.classList.remove("touch-active");
          } else {
            card.classList.add("touch-active");
          }
        },
        { passive: true }
      );

      // Evitar que los toques en los enlaces activen el efecto de la tarjeta
      const projectLinks = card.querySelectorAll(".project-link");
      projectLinks.forEach((link) => {
        link.addEventListener("touchstart", (e) => {
          e.stopPropagation();
        });
      });

      // Añadir efecto de feedback táctil
      expandBtn.addEventListener("touchstart", function () {
        this.style.transition = "transform 0.2s ease";
      });

      expandBtn.addEventListener("touchend", function () {
        this.style.transition =
          "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      });
    } else {
      // DISEÑO DESKTOP ORIGINAL CON EFECTO TILT 3D
      // Crear la nueva estructura de tarjeta con efecto tilt 3D

      // Contenedor principal
      const cardContainer = document.createElement("div");
      cardContainer.className = "project-tilt-container";

      // Imagen de fondo
      const imageContainer = document.createElement("div");
      imageContainer.className = "project-image-container";

      if (imageEl) {
        imageContainer.appendChild(imageEl.cloneNode(true));
      } else {
        const newImage = document.createElement("img");
        newImage.className = "project-image";
        newImage.src = "img/placeholder.jpg";
        newImage.alt = "Vista previa del proyecto";
        imageContainer.appendChild(newImage);
      }

      // Capa de color
      const colorOverlay = document.createElement("div");
      colorOverlay.className = "project-color-overlay";

      // Patrón decorativo
      const pattern = document.createElement("div");
      pattern.className = "project-pattern";

      // Número de proyecto
      const projectNumber = document.createElement("div");
      projectNumber.className = "project-number";
      projectNumber.textContent = `0${index + 1}`;

      // Contenido
      const content = document.createElement("div");
      content.className = "project-content";

      // Título y subtítulo
      if (titleEl && subtitleEl) {
        const titleContainer = document.createElement("div");
        titleContainer.className = "project-title-container";

        const title = document.createElement("h3");
        title.className = "project-title";
        title.textContent = titleEl.textContent;

        const subtitle = document.createElement("p");
        subtitle.className = "project-subtitle";
        subtitle.textContent = subtitleEl.textContent;

        titleContainer.appendChild(title);
        titleContainer.appendChild(subtitle);
        content.appendChild(titleContainer);
      }

      // Descripción
      if (descriptionEl) {
        const description = document.createElement("div");
        description.className = "project-description";
        description.textContent = descriptionEl.textContent;
        content.appendChild(description);
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

        content.appendChild(linksContainer);
      }

      // Brillo
      const shine = document.createElement("div");
      shine.className = "project-shine";

      // Ensamblar la estructura
      cardContainer.appendChild(imageContainer);
      cardContainer.appendChild(colorOverlay);
      cardContainer.appendChild(pattern);
      cardContainer.appendChild(projectNumber);
      cardContainer.appendChild(content);
      cardContainer.appendChild(shine);

      // Limpiar y reconstruir la tarjeta
      card.innerHTML = "";
      card.appendChild(cardContainer);

      // Añadir efecto tilt 3D para dispositivos no táctiles
      card.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        const container = this.querySelector(".project-tilt-container");
        const shine = this.querySelector(".project-shine");
        const title = this.querySelector(".project-title");
        const subtitle = this.querySelector(".project-subtitle");
        const description = this.querySelector(".project-description");
        const projectNumber = this.querySelector(".project-number");

        // Aplicar efecto tilt con diferentes intensidades para cada elemento
        container.style.transform = `perspective(1200px) rotateX(${
          percentY * -8
        }deg) rotateY(${percentX * 8}deg) scale3d(1.02, 1.02, 1.02)`;

        // Mover elementos con diferentes profundidades para efecto parallax
        if (title)
          title.style.transform = `translateY(0) translateX(${
            percentX * 10
          }px)`;
        if (subtitle)
          subtitle.style.transform = `translateY(0) translateX(${
            percentX * 5
          }px)`;
        if (description)
          description.style.transform = `translateX(${percentX * 7}px)`;
        if (projectNumber)
          projectNumber.style.transform = `translateZ(40px) translateX(${
            percentX * 15
          }px) translateY(${percentY * 15}px)`;

        // Mover el brillo
        shine.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 80%)`;
        shine.style.opacity = "1";
      });

      card.addEventListener("mouseleave", function () {
        const container = this.querySelector(".project-tilt-container");
        const shine = this.querySelector(".project-shine");
        const title = this.querySelector(".project-title");
        const subtitle = this.querySelector(".project-subtitle");
        const description = this.querySelector(".project-description");
        const projectNumber = this.querySelector(".project-number");

        // Restaurar posición
        container.style.transform =
          "perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
        shine.style.opacity = "0";

        // Restaurar posición de elementos internos
        if (title) title.style.transform = "";
        if (subtitle) subtitle.style.transform = "";
        if (description) description.style.transform = "";
        if (projectNumber) projectNumber.style.transform = "";
      });
    }
  });

  // Inicializar las animaciones de scroll para las tarjetas de proyectos
  initializeProjectScroll();
}

// Función mejorada para las animaciones de scroll de proyectos
function initializeProjectScroll() {
  const projectCards = document.querySelectorAll("#projects .project-card");
  const isTouchDevice = document.body.classList.contains("touch-device");

  // Verificar si hay soporte para IntersectionObserver
  if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Añadir clase para la animación de entrada
            entry.target.classList.add("in-view");

            if (isTouchDevice) {
              // Para dispositivos móviles, animar elementos específicos del nuevo diseño
              const imageSection = entry.target.querySelector(
                ".project-image-section"
              );
              const contentSection = entry.target.querySelector(
                ".project-content-section"
              );
              const title = entry.target.querySelector(".project-title");
              const subtitle = entry.target.querySelector(".project-subtitle");
              const expandBtn = entry.target.querySelector(
                ".project-expand-btn"
              );

              if (imageSection) imageSection.classList.add("animated");
              if (contentSection) contentSection.classList.add("animated");
              if (title) title.classList.add("animated");
              if (subtitle) subtitle.classList.add("animated");
              if (expandBtn) expandBtn.classList.add("animated");
            } else {
              // Para desktop, animar elementos del diseño tilt 3D
              const container = entry.target.querySelector(
                ".project-tilt-container"
              );
              const content = entry.target.querySelector(".project-content");
              const image = entry.target.querySelector(".project-image");
              const number = entry.target.querySelector(".project-number");
              const pattern = entry.target.querySelector(".project-pattern");

              if (container) container.classList.add("animated");
              if (content) content.classList.add("animated");
              if (image) image.classList.add("animated");
              if (number) number.classList.add("animated");
              if (pattern) pattern.classList.add("animated");
            }

            // Configurar animación de salida cuando se hace scroll hacia arriba
            setupExitAnimation(entry.target);
          } else if (entry.boundingClientRect.top > 0) {
            // Si la tarjeta sale por la parte superior, activar animación de salida
            entry.target.classList.remove("in-view");

            const elements = entry.target.querySelectorAll(".animated");
            elements.forEach((el) => {
              el.classList.remove("animated");
            });
          }
        });
      },
      {
        threshold: 0.15, // Empezar animación cuando 15% de la tarjeta sea visible
        rootMargin: "0px 0px -100px 0px", // Ajuste para anticipar la animación
      }
    );

    projectCards.forEach((card) => {
      // Preparar la tarjeta para animación
      card.classList.add("scroll-animate");
      projectObserver.observe(card);
    });
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    projectCards.forEach((card) => {
      card.classList.add("in-view");
    });
  }
}

// Nueva función para configurar animaciones de salida
function setupExitAnimation(card) {
  // Crear un nuevo observer para detectar cuando la tarjeta sale del viewport
  const exitObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          // La tarjeta ha salido por la parte inferior
          card.classList.add("exit-animation");

          // Quitar la clase después de que termine la animación
          setTimeout(() => {
            card.classList.remove("exit-animation");
          }, 500);

          // Dejar de observar
          exitObserver.unobserve(card);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "-20% 0px 0px 0px", // Activar cuando el 20% superior de la tarjeta sale del viewport
    }
  );

  exitObserver.observe(card);
}

// ===== NUEVA SECCIÓN DE SKILLS CON DISEÑO NEOBRUTALIST REFINADO =====
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
      logo: "img/skills/html-icon.png",
    },
    {
      name: "CSS",
      level: 85,
      logo: "img/skills/css-icon.png",
    },
    {
      name: "JAVASCRIPT",
      level: 80,
      logo: "img/skills/javascript-icon.png",
    },
    {
      name: "REACT",
      level: 60,
      logo: "img/skills/react-icon.png",
    },
    {
      name: "PYTHON",
      level: 75,
      logo: "img/skills/python-icon.png",
    },
    {
      name: "FLASK",
      level: 60,
      logo: "img/skills/flask-icon.png",
    },
    {
      name: "MYSQL",
      level: 75,
      logo: "img/skills/mysql-icon.png",
    },
    {
      name: "FIGMA",
      level: 80,
      logo: "img/skills/figma-icon.png",
    },
    {
      name: "TAILWIND",
      level: 65,
      logo: "img/skills/tailwind-icon.png",
    },
    {
      name: "JAVA",
      level: 80,
      logo: "img/skills/java-icon.png",
    },
  ];

  // Función para ajustar el tamaño de los logos según el ancho de la ventana
  function adjustLogoSize() {
    const windowWidth = window.innerWidth;
    let logoSize = 48; // Tamaño predeterminado

    if (windowWidth <= 400) {
      logoSize = 32;
    } else if (windowWidth <= 576) {
      logoSize = 36;
    } else if (windowWidth <= 768) {
      logoSize = 40;
    } else if (windowWidth <= 992) {
      logoSize = 44;
    }

    return logoSize;
  }

  // Obtener el tamaño de logo adecuado
  const logoSize = adjustLogoSize();

  skills.forEach((skill, index) => {
    const skillCard = document.createElement("div");
    skillCard.className = `skill-card scroll-animation ${
      index % 2 === 0 ? "from-left" : "from-right"
    } delay-${(index % 5) + 1}`;

    // Crear el logo
    const skillLogo = document.createElement("div");
    skillLogo.className = "skill-logo";
    const logoImg = document.createElement("img");
    logoImg.src = skill.logo;
    logoImg.alt = `${skill.name} logo`;
    logoImg.width = logoSize;
    logoImg.height = logoSize;
    skillLogo.appendChild(logoImg);

    // Crear el nombre de la habilidad
    const skillName = document.createElement("div");
    skillName.className = "skill-name";
    skillName.textContent = skill.name;

    // Ensamblar la tarjeta con el nuevo diseño
    skillCard.appendChild(skillLogo);
    skillCard.appendChild(skillName);

    // Añadir la tarjeta al grid
    skillsGrid.appendChild(skillCard);
  });

  // Añadir interactividad a las tarjetas
  const allSkillCards = skillsGrid.querySelectorAll(".skill-card");
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    // Para dispositivos táctiles
    allSkillCards.forEach((card) => {
      card.addEventListener("click", function () {
        // Cerrar otras tarjetas
        allSkillCards.forEach((otherCard) => {
          if (otherCard !== this) {
            otherCard.classList.remove("touch-active");
          }
        });

        // Alternar clase activa
        this.classList.toggle("touch-active");
      });
    });
  }

  // Inicializar animaciones de scroll para las tarjetas de habilidades
  initializeSkillsScroll();

  // Ajustar el tamaño de las tarjetas cuando cambia el tamaño de la ventana
  window.addEventListener("resize", () => {
    const logoSize = adjustLogoSize();
    const logoImgs = skillsGrid.querySelectorAll(".skill-logo img");

    logoImgs.forEach((img) => {
      img.width = logoSize;
      img.height = logoSize;
    });
  });
}

// Nueva función para las animaciones de scroll de las tarjetas de habilidades
function initializeSkillsScroll() {
  const skillCards = document.querySelectorAll("#skills .skill-card");

  if ("IntersectionObserver" in window) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");

            // Dejar de observar después de la animación
            // skillsObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    skillCards.forEach((card) => {
      card.classList.add("scroll-animate");
      skillsObserver.observe(card);
    });
  } else {
    // Fallback
    skillCards.forEach((card) => {
      card.classList.add("in-view");
    });
  }
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
      // Simplificar la interacción táctil para evitar conflictos con el scroll
      card.addEventListener("click", function (e) {
        // Cerrar otras tarjetas
        educationCards.forEach((otherCard) => {
          if (otherCard !== this) {
            otherCard.classList.remove("active-touch");

            // Resetear estilos
            const title = otherCard.querySelector(".education-title");
            const year = otherCard.querySelector(".education-year");
            const school = otherCard.querySelector(".education-school");
            const description = otherCard.querySelector(
              ".education-description"
            );

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
          this.style.transform = "translateY(-8px)";
          this.style.boxShadow = "12px 12px 0 rgba(0, 0, 0, 0.2)";
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

      // Añadir efecto de feedback táctil
      card.addEventListener("touchstart", function () {
        this.style.transition = "transform 0.2s ease";
      });

      card.addEventListener("touchend", function () {
        this.style.transition =
          "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      });
    }
  });

  // Inicializar animaciones de scroll para las tarjetas de educación
  initializeEducationScroll();
}

// Nueva función para las animaciones de scroll de las tarjetas de educación
function initializeEducationScroll() {
  const educationCards = document.querySelectorAll(
    "#education .education-card"
  );

  if ("IntersectionObserver" in window) {
    const educationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");

            // Dejar de observar después de la animación
            // educationObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    educationCards.forEach((card) => {
      card.classList.add("scroll-animate");
      educationObserver.observe(card);
    });
  } else {
    // Fallback
    educationCards.forEach((card) => {
      card.classList.add("in-view");
    });
  }
}

// ===== FORMULARIO DE CONTACTO =====
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  // Añadir clases de animación al formulario
  contactForm.classList.add("scroll-animation", "from-bottom");

  // Mejorar la animación de los campos del formulario
  const formGroups = contactForm.querySelectorAll(".form-group");

  formGroups.forEach((group, index) => {
    // Añadir clases de animación a cada grupo
    group.classList.add("scroll-animation", "from-left", `delay-${index + 1}`);

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

      // Añadir evento para dispositivos móviles para mejorar la experiencia táctil
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        input.addEventListener("touchstart", () => {
          // Añadir un pequeño retraso para evitar problemas con el scroll
          setTimeout(() => {
            label.classList.add("active");
          }, 100);
        });
      }
    }
  });

  // Añadir clase de animación al botón de envío
  const submitButton = contactForm.querySelector(".submit-button");
  if (submitButton) {
    submitButton.classList.add("scroll-animation", "from-bottom", "delay-4");
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Recoger datos del formulario
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

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

  // Inicializar animaciones de scroll para el formulario
  initializeContactScroll();
}

// Nueva función para las animaciones de scroll del formulario
function initializeContactScroll() {
  const contactForm = document.querySelector("#contact .contact-form");
  const formGroups = document.querySelectorAll("#contact .form-group");
  const submitButton = document.querySelector("#contact .submit-button");

  if ("IntersectionObserver" in window) {
    const contactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (contactForm) contactObserver.observe(contactForm);
    formGroups.forEach((group) => contactObserver.observe(group));
    if (submitButton) contactObserver.observe(submitButton);
  } else {
    // Fallback
    if (contactForm) contactForm.classList.add("active");
    formGroups.forEach((group) => group.classList.add("active"));
    if (submitButton) submitButton.classList.add("active");
  }
}

// Función mejorada para inicializar las animaciones de scroll
function initializeScrollAnimations() {
  // Inicializar animaciones de fade-in
  const fadeInSections = document.querySelectorAll(".fade-in-section");

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

// Función mejorada para manejar las animaciones de scroll
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

// Función mejorada para inicializar el botón de scroll to top
function initializeScrollTopButton() {
  const scrollTopButton = document.querySelector(".scroll-top-button");
  if (!scrollTopButton) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopButton.style.display = "block";
      setTimeout(() => {
        scrollTopButton.classList.add("active");
      }, 10);
    } else {
      scrollTopButton.classList.remove("active");
      setTimeout(() => {
        if (!scrollTopButton.classList.contains("active")) {
          scrollTopButton.style.display = "none";
        }
      }, 300);
    }
  });

  scrollTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Añadir feedback táctil
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    scrollTopButton.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.9)";
    });

    scrollTopButton.addEventListener("touchend", function () {
      this.style.transform = "";
    });
  }
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

// Función para crear partículas en el fondo
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

// Función para animar secuencialmente los elementos
function animateSequentially(elements, delayBetween = 200) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * delayBetween);
  });
}
