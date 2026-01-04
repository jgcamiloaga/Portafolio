/**
 * Módulo de navegación
 * Maneja el menú hamburguesa, overlay, animaciones y resaltado de sección activa
 */

/**
 * Función principal para inicializar la navegación
 */
export function initializeNavigation() {
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  const navLinksItems = document.querySelectorAll(".nav-link")
  const body = document.body

  if (!menuToggle || !navLinks) return

  // Crear overlay para el fondo cuando el menú está activo
  const navOverlay = document.createElement("div")
  navOverlay.className = "nav-overlay"
  navOverlay.style.position = "fixed"
  navOverlay.style.top = "0"
  navOverlay.style.left = "0"
  navOverlay.style.width = "100%"
  navOverlay.style.height = "100%"
  navOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
  navOverlay.style.zIndex = "999"
  navOverlay.style.opacity = "0"
  navOverlay.style.visibility = "hidden"
  navOverlay.style.transition = "all 0.3s ease"
  navOverlay.style.backdropFilter = "blur(3px)"
  body.appendChild(navOverlay)

  // Función para alternar el menú con animación mejorada
  function toggleMenu() {
    menuToggle.classList.toggle("active")
    const isExpanded = menuToggle.classList.contains("active")

    // Si el menú se está abriendo
    if (isExpanded) {
      // Actualizar aria-expanded
      menuToggle.setAttribute("aria-expanded", "true")
      menuToggle.setAttribute("aria-label", "Cerrar menú de navegación")

      // Mostrar el overlay con animación
      navOverlay.style.visibility = "visible"
      setTimeout(() => {
        navOverlay.style.opacity = "1"
      }, 10)

      // Activar el menú
      navLinks.classList.add("active")

      // Bloquear scroll del body
      body.style.overflow = "hidden"

      // Animar cada enlace secuencialmente
      navLinksItems.forEach((link, index) => {
        // Resetear primero para asegurar la animación
        link.style.opacity = "0"
        link.style.transform = "translateY(-20px)"

        // Forzar un reflow para que la transición funcione
        void link.offsetWidth

        // Aplicar la animación con delay
        setTimeout(
          () => {
            link.style.opacity = "1"
            link.style.transform = "translateY(0)"
          },
          100 + index * 50,
        )
      })
    } else {
      // Actualizar aria-expanded
      menuToggle.setAttribute("aria-expanded", "false")
      menuToggle.setAttribute("aria-label", "Abrir menú de navegación")

      // Ocultar el overlay
      navOverlay.style.opacity = "0"
      setTimeout(() => {
        navOverlay.style.visibility = "hidden"
      }, 300)

      // Desactivar el menú
      navLinks.classList.remove("active")

      // Desbloquear scroll
      body.style.overflow = ""

      // Animar la salida de los enlaces
      navLinksItems.forEach((link, index) => {
        setTimeout(
          () => {
            link.style.opacity = "0"
            link.style.transform = "translateY(-10px)"
          },
          (navLinksItems.length - index - 1) * 30,
        )
      })

      // Resetear los estilos después de la animación
      setTimeout(() => {
        if (!menuToggle.classList.contains("active")) {
          navLinksItems.forEach((link) => {
            link.style.opacity = ""
            link.style.transform = ""
          })
        }
      }, 300)
    }
  }

  // Toggle del menú hamburguesa
  menuToggle.addEventListener("click", toggleMenu)

  // Cerrar el menú al hacer clic en un enlace
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu()
    })

    // Preparar para animación secuencial
    link.style.opacity = "0"
    link.style.transform = "translateY(-20px)"
    link.style.transition = "all 0.5s ease"
  })

  // Cerrar menú al hacer clic en el overlay
  navOverlay.addEventListener("click", toggleMenu)

  // Cerrar menú al presionar la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuToggle.classList.contains("active")) {
      toggleMenu()
    }
  })

  // Animación secuencial de los enlaces de navegación
  setTimeout(() => {
    animateSequentially(navLinksItems)
  }, 1000)

  // Resaltado de sección activa
  initializeActiveSection(navLinksItems)
}

/**
 * Resaltado de sección activa durante el scroll
 */
function initializeActiveSection(navLinks) {
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active-link")
      link.removeAttribute("aria-current")
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active-link")
        link.setAttribute("aria-current", "page")
      }
    })
  })
}

/**
 * Función helper para animar elementos secuencialmente
 */
function animateSequentially(elements, delayBetween = 200) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, index * delayBetween)
  })
}
