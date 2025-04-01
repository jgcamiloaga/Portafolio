// Función mejorada para inicializar las tarjetas de proyectos en dispositivos móviles
function initializeMobileProjectCards() {
  // Verificar si estamos en un dispositivo táctil
  const isTouchDevice = document.body.classList.contains("touch-device");
  if (!isTouchDevice) return;

  const projectCards = document.querySelectorAll("#projects .project-card");

  projectCards.forEach((card, index) => {
    // Obtener elementos internos originales
    const previewEl = card.querySelector(".project-preview");
    const imageEl = card.querySelector(".project-image");
    const overlayEl = card.querySelector(".project-overlay");
    const titleEl = overlayEl ? overlayEl.querySelector("h3") : null;
    const descriptionEl = overlayEl
      ? overlayEl.querySelector(".project-description")
      : null;
    const linksEl = card.querySelector(".project-links");

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

    // Botón de expandir
    const expandBtn = document.createElement("div");
    expandBtn.className = "project-expand-btn";
    expandBtn.setAttribute("aria-label", "Expandir proyecto");
    expandBtn.setAttribute("role", "button");
    expandBtn.setAttribute("tabindex", "0");
    imageSection.appendChild(expandBtn);

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
        newLink.rel = "noopener noreferrer";
        linksContainer.appendChild(newLink);
      });

      contentSection.appendChild(linksContainer);
    }

    // Elementos decorativos
    const decoration1 = document.createElement("div");
    decoration1.className = "project-decoration project-decoration-1";
    cardMobile.appendChild(decoration1);

    const decoration2 = document.createElement("div");
    decoration2.className = "project-decoration project-decoration-2";
    contentSection.appendChild(decoration2);

    // Ensamblar la estructura
    cardMobile.appendChild(imageSection);
    cardMobile.appendChild(contentSection);
    card.appendChild(cardMobile);

    // Añadir eventos de interacción táctil mejorados
    setupMobileCardInteractions(card, expandBtn);
  });

  // Inicializar las animaciones de scroll para las tarjetas de proyectos
  initializeMobileProjectScroll();
}

// Función para configurar interacciones táctiles mejoradas
function setupMobileCardInteractions(card, expandBtn) {
  // Variables para el seguimiento de gestos
  let startX, startY, moveX, moveY, startTime;
  let isScrolling = false;
  const swipeThreshold = 50; // Umbral para detectar deslizamiento
  const tapThreshold = 10; // Umbral para detectar toque
  const timeThreshold = 300; // Umbral de tiempo para distinguir entre toque y deslizamiento

  // Función para manejar el inicio del toque
  function handleTouchStart(e) {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
    isScrolling = false;

    // Añadir efecto visual de feedback
    this.style.transition = "transform 0.2s ease";
  }

  // Función para manejar el movimiento del toque
  function handleTouchMove(e) {
    if (!startX || !startY) return;

    const touch = e.touches[0];
    moveX = touch.clientX - startX;
    moveY = touch.clientY - startY;

    // Detectar si el usuario está haciendo scroll vertical
    if (!isScrolling) {
      isScrolling = Math.abs(moveY) > Math.abs(moveX);
    }
  }

  // Función para manejar el fin del toque
  function handleTouchEnd(e) {
    if (!startX || !startY) return;

    const endTime = Date.now();
    const timeDiff = endTime - startTime;

    // Restaurar transición normal
    this.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Si no es scroll y es un toque rápido con poco movimiento, considerarlo como un toque
    if (
      !isScrolling &&
      timeDiff < timeThreshold &&
      Math.abs(moveX) < tapThreshold &&
      Math.abs(moveY) < tapThreshold
    ) {
      toggleCardActive(card);
    }

    // Reiniciar variables
    startX = startY = moveX = moveY = null;
  }

  // Función para alternar el estado activo de la tarjeta
  function toggleCardActive(card) {
    // Cerrar otras tarjetas activas
    document
      .querySelectorAll("#projects .project-card.touch-active")
      .forEach((activeCard) => {
        if (activeCard !== card) {
          activeCard.classList.remove("touch-active");
        }
      });

    // Alternar estado de la tarjeta actual
    card.classList.toggle("touch-active");
  }

  // Añadir evento de toque al botón de expandir
  expandBtn.addEventListener(
    "touchstart",
    function (e) {
      e.stopPropagation(); // Evitar que el evento se propague
      toggleCardActive(card);
    },
    { passive: true }
  );

  // Añadir eventos de toque a la tarjeta
  card.addEventListener("touchstart", handleTouchStart, { passive: true });
  card.addEventListener("touchmove", handleTouchMove, { passive: true });
  card.addEventListener("touchend", handleTouchEnd, { passive: true });

  // Evitar que los toques en los enlaces activen el efecto de la tarjeta
  const projectLinks = card.querySelectorAll(".project-link");
  projectLinks.forEach((link) => {
    link.addEventListener(
      "touchstart",
      (e) => {
        e.stopPropagation();
      },
      { passive: true }
    );
  });

  // Añadir soporte para teclado (accesibilidad)
  expandBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCardActive(card);
    }
  });
}

// Función mejorada para las animaciones de scroll de proyectos en móvil
function initializeMobileProjectScroll() {
  const projectCards = document.querySelectorAll("#projects .project-card");

  // Verificar si hay soporte para IntersectionObserver
  if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Añadir clase para la animación de entrada
            entry.target.classList.add("in-view");

            // Animar elementos específicos del diseño móvil
            const imageSection = entry.target.querySelector(
              ".project-image-section"
            );
            const contentSection = entry.target.querySelector(
              ".project-content-section"
            );

            if (imageSection) {
              // Añadir un pequeño retraso para crear un efecto escalonado
              setTimeout(() => {
                imageSection.classList.add("animated");
              }, 100);
            }

            if (contentSection) {
              // Añadir un pequeño retraso para crear un efecto escalonado
              setTimeout(() => {
                contentSection.classList.add("animated");
              }, 200);
            }

            // Configurar animación de salida cuando se hace scroll hacia arriba
            setupMobileExitAnimation(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Empezar animación cuando 15% de la tarjeta sea visible
        rootMargin: "0px 0px -50px 0px", // Ajuste para anticipar la animación
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

      const imageSection = card.querySelector(".project-image-section");
      const contentSection = card.querySelector(".project-content-section");

      if (imageSection) imageSection.classList.add("animated");
      if (contentSection) contentSection.classList.add("animated");
    });
  }
}

// Función para configurar animaciones de salida en móvil
function setupMobileExitAnimation(card) {
  // Crear un nuevo observer para detectar cuando la tarjeta sale del viewport
  const exitObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          // La tarjeta ha salido por la parte inferior
          // Quitar clases de animación para que se vuelvan a aplicar al entrar
          const imageSection = card.querySelector(".project-image-section");
          const contentSection = card.querySelector(".project-content-section");

          if (imageSection) imageSection.classList.remove("animated");
          if (contentSection) contentSection.classList.remove("animated");

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

// Modificar la función initializeProjectCards para incluir la inicialización móvil
function enhanceInitializeProjectCards() {
  const originalInitializeProjectCards = initializeProjectCards;

  // Reemplazar la función original con nuestra versión mejorada
  window.initializeProjectCards = function () {
    // Llamar a la función original para mantener la funcionalidad desktop
    originalInitializeProjectCards();

    // Añadir nuestra funcionalidad móvil mejorada
    initializeMobileProjectCards();
  };
}

// Ejecutar la mejora cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Mejorar la función de inicialización de tarjetas de proyectos
  enhanceInitializeProjectCards();

  // Si la página ya está cargada, inicializar directamente
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    initializeMobileProjectCards();
  }
});
