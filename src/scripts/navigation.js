/**
 * Script de navegación del portafolio
 * 
 * Gestiona:
 * - Menu hamburguesa responsivo con animaciones
 * - Navegación suave entre secciones
 * - Resaltado automático de sección activa en el scroll
 * - Animaciones de entrada y salida de enlaces del menú
 * - Accesibilidad completa (teclado, focus, escape)
 * - Control del scroll del body cuando el menú está activo
 */

document.addEventListener("DOMContentLoaded", () => {
  // Obtener elementos del DOM
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  const navLinksItems = document.querySelectorAll(".nav-link")
  const body = document.body

  // Verificar que todos los elementos necesarios existan
  if (!menuToggle || !navLinks) {
    return
  }

  /**
   * Función principal para alternar el estado del menú hamburguesa
   * Controla animaciones de entrada/salida y bloqueo de scroll
   */
  function toggleMenu() {
    menuToggle.classList.toggle("active")
    navLinks.classList.toggle("active")

    const isActive = menuToggle.classList.contains("active")

    if (isActive) {
      // Estado: Menú abierto
      body.style.overflow = "hidden"

      // Animación de entrada secuencial para los enlaces
      navLinksItems.forEach((link, index) => {
        // Estado inicial para la animación
        link.style.opacity = "0"
        link.style.transform = "translateX(-100px) rotate(-5deg)"
        link.style.filter = "blur(5px)"

        // Aplicar animación con delay escalonado
        setTimeout(
          () => {
            link.style.opacity = "1"
            link.style.transform = "translateX(0) rotate(0deg)"
            link.style.filter = "blur(0px)"
          },
          150 + index * 100,
        )
      })
    } else {
      // Estado: Menú cerrado
      body.style.overflow = ""
      
      // Animación de salida para los enlaces
      navLinksItems.forEach((link, index) => {
        setTimeout(
          () => {
            link.style.opacity = "0"
            link.style.transform = "translateX(100px) rotate(5deg)"
            link.style.filter = "blur(5px)"
          },
          index * 50,
        )
      })
    }
  }

  /**
   * Event Listeners para la navegación
   */
  
  // Toggle del menú con click en el botón hamburguesa
  menuToggle.addEventListener("click", (e) => {
    e.preventDefault()
    toggleMenu()
  })

  // Cerrar menú automáticamente al hacer clic en cualquier enlace
  navLinksItems.forEach(link => {
    link.addEventListener("click", () => {
      if (menuToggle.classList.contains("active")) {
        toggleMenu()
      }
    })
  })

  // Cerrar menú con la tecla Escape (accesibilidad)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuToggle.classList.contains("active")) {
      toggleMenu()
    }
  })

  /**
   * Sistema de resaltado automático de sección activa
   * Detecta qué sección está visible durante el scroll y resalta el enlace correspondiente
   */
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""

    // Determinar qué sección está actualmente en vista
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      
      // Calcular si la sección está en el tercio superior del viewport
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    // Actualizar clases activas en los enlaces de navegación
    navLinksItems.forEach((link) => {
      link.classList.remove("active-link")
      
      // Agregar clase activa al enlace que corresponde a la sección actual
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active-link")
      }
    })
  })
})
