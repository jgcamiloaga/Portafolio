/**
 * Script principal de animaciones del portafolio
 * 
 * Gestiona todas las animaciones e interacciones del sitio:
 * - Modal de confirmación del formulario de contacto
 * - Smooth scrolling entre secciones
 * - Efectos 3D en tarjetas de proyectos (desktop) y táctiles (móvil)
 * - Animaciones de skills con logos interactivos
 * - Tarjetas de educación con efectos hover/touch
 * - Sistema avanzado de scroll animations con IntersectionObserver
 * - Partículas de fondo animadas
 * - Botón scroll-to-top con feedback
 * - Detección automática de dispositivos táctiles
 * - Responsive design y optimización de rendimiento
 */

/**
 * Modal de confirmación para formulario de contacto
 * Sistema simple de modal con backdrop y accesibilidad
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form")
  const modal = document.getElementById("modal-confirm")
  const closeBtn = document.getElementById("modal-close")

  if (form && modal && closeBtn) {
    form.addEventListener("submit", (e) => {
      // Mostrar modal con pequeño delay para mejor UX
      setTimeout(() => {
        modal.style.display = "flex"
        document.body.style.overflow = "hidden"
      }, 100)
    })

    /**
     * Función para cerrar la modal
     * Restaura el scroll del body y oculta la modal
     */
    function closeModal() {
      modal.style.display = "none"
      document.body.style.overflow = ""
    }

    // Event listeners para cerrar la modal
    closeBtn.addEventListener("click", closeModal)
    closeBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") closeModal()
    })
    
    // Cerrar con Escape desde cualquier lugar
    window.addEventListener("keydown", (e) => {
      if (modal.style.display === "flex" && e.key === "Escape") closeModal()
    })
    
    // Cerrar haciendo click en el backdrop
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal()
    })
  }
})

/**
 * Inicialización principal de componentes
 * Se ejecuta cuando el DOM está completamente cargado
 */
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar todos los componentes del portafolio
  initializeNavigation()
  initializeSmoothScrolling()
  initializeProjectCards()
  initializeSkillsAnimation()
  initializeContactForm()
  initializeScrollAnimations()
  createParticles()
  initializeScrollTopButton()
  initializeEducationCards()
})

// ===== NAVEGACIÓN =====
function initializeNavigation() {
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

    // Si el menú se está abriendo
    if (menuToggle.classList.contains("active")) {
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

// Resaltado de sección activa durante el scroll
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
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active-link")
      }
    })
  })
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
  try {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        if (targetId === "#") return // Evitar errores con enlaces vacíos

        const target = document.querySelector(targetId)
        if (target) {
          // Aplicar opacidad al contenido durante el desplazamiento
          document.body.classList.add("scrolling")

          // Calcular la posición de destino
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset

          // Obtener la posición actual
          const startPosition = window.pageYOffset

          // Calcular la distancia a recorrer
          const distance = targetPosition - startPosition

          // Duración de la animación en milisegundos
          const duration = 800

          // Tiempo de inicio
          let startTime = null

          // Función de animación
          function animation(currentTime) {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / duration, 1)

            // Función de easing para suavizar el movimiento
            const ease = easeInOutCubic(progress)

            window.scrollTo(0, startPosition + distance * ease)

            // Continuar la animación si no ha terminado
            if (timeElapsed < duration) {
              requestAnimationFrame(animation)
            } else {
              // Restaurar la opacidad cuando se completa el desplazamiento
              document.body.classList.remove("scrolling")

              // Asegurarse de que estamos exactamente en la posición correcta
              window.scrollTo(0, targetPosition)
            }
          }

          // Función de easing
          function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
          }

          // Iniciar la animación
          requestAnimationFrame(animation)
        }
      })
    })

    // Agregar estilos para la transición de opacidad
    const style = document.createElement("style")
    style.textContent = `
      body.scrolling section {
        transition: opacity 0.3s ease;
        opacity: 0.7;
      }
      section {
        transition: opacity 0.5s ease;
      }
    `
    document.head.appendChild(style)
  } catch (error) {
    // Fallback silencioso en caso de errores
    return
  }
}

/**
 * Sistema de tarjetas de proyectos con efectos interactivos
 * 
 * Características:
 * - Detección automática de dispositivos táctiles vs no-táctiles
 * - Efecto tilt 3D para desktop con seguimiento del mouse
 * - Interacciones táctiles optimizadas para móviles
 * - Animaciones de scroll con IntersectionObserver
 * - Efectos de entrada y salida basados en viewport
 */
function initializeProjectCards() {
  const projectCards = document.querySelectorAll("#projects .project-card")

  /**
   * Detecta dispositivos táctiles y aplica clases CSS apropiadas
   * Permite diferentes comportamientos según el tipo de dispositivo
   */
  function detectTouchDevice() {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0

    // Agregar clases CSS específicas para dispositivos táctiles/no táctiles
    if (isTouchDevice) {
      document.body.classList.add("touch-device")
    } else {
      document.body.classList.add("no-touch-device")
    }

    return isTouchDevice
  }

  // Llamar a esta función al inicio y guardar el resultado
  const isTouchDevice = detectTouchDevice()

  projectCards.forEach((card, index) => {
    const tiltContainer = card.querySelector(".project-tilt-container")
    
      if (tiltContainer) {
      // DISEÑO DESKTOP - Efecto tilt 3D
      card.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const percentX = (x - centerX) / centerX
        const percentY = (y - centerY) / centerY

        const container = this.querySelector(".project-tilt-container")
        
        if (container) {
          // Inclinación y escala más sutil
          container.style.transform = `perspective(1200px) rotateX(${percentY * -16}deg) rotateY(${percentX * 16}deg) scale3d(1.035, 1.035, 1.035)`;
          container.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
        }
      })

      card.addEventListener("mouseleave", function () {
        const container = this.querySelector(".project-tilt-container")
        if (container) {
          container.style.transform = "perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
        }
      })
      }
      // En móvil NO aplicar animación 3D, solo mostrar contenido normalmente
  })

  // Inicializar las animaciones de scroll para las tarjetas de proyectos
  initializeProjectScroll()
}

// Función mejorada para las animaciones de scroll de proyectos
function initializeProjectScroll() {
  const projectCards = document.querySelectorAll("#projects .project-card")
  const isTouchDevice = document.body.classList.contains("touch-device")

  // Verificar si hay soporte para IntersectionObserver
  if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Añadir clase para la animación de entrada
            entry.target.classList.add("in-view")

            if (isTouchDevice) {
              // Para dispositivos móviles, animar elementos de la estructura Astro
              const content = entry.target.querySelector(".project-content")
              const image = entry.target.querySelector(".project-image")
              const number = entry.target.querySelector(".project-number")
              const tiltContainer = entry.target.querySelector(".project-tilt-container")

              if (content) content.classList.add("animated")
              if (image) image.classList.add("animated")
              if (number) number.classList.add("animated")
              if (tiltContainer) tiltContainer.classList.add("animated")
            } else {
              // Para desktop, animar elementos del diseño tilt 3D
              const container = entry.target.querySelector(".project-tilt-container")
              const content = entry.target.querySelector(".project-content")
              const image = entry.target.querySelector(".project-image")
              const number = entry.target.querySelector(".project-number")
              const pattern = entry.target.querySelector(".project-pattern")

              if (container) container.classList.add("animated")
              if (content) content.classList.add("animated")
              if (image) image.classList.add("animated")
              if (number) number.classList.add("animated")
              if (pattern) pattern.classList.add("animated")
            }

            // Configurar animación de salida cuando se hace scroll hacia arriba
            setupExitAnimation(entry.target)
          } else if (entry.boundingClientRect.top > 0) {
            // Si la tarjeta sale por la parte superior, activar animación de salida
            entry.target.classList.remove("in-view")

            const elements = entry.target.querySelectorAll(".animated")
            elements.forEach((el) => {
              el.classList.remove("animated")
            })
          }
        })
      },
      {
        threshold: 0.15, // Empezar animación cuando 15% de la tarjeta sea visible
        rootMargin: "0px 0px -100px 0px", // Ajuste para anticipar la animación
      },
    )

    projectCards.forEach((card) => {
      // Preparar la tarjeta para animación
      card.classList.add("scroll-animate")
      projectObserver.observe(card)
    })
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    projectCards.forEach((card) => {
      card.classList.add("in-view")
    })
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
          card.classList.add("exit-animation")

          // Quitar la clase después de que termine la animación
          setTimeout(() => {
            card.classList.remove("exit-animation")
          }, 500)

          // Dejar de observar
          exitObserver.unobserve(card)
        }
      })
    },
    {
      threshold: 0,
      rootMargin: "-20% 0px 0px 0px", // Activar cuando el 20% superior de la tarjeta sale del viewport
    },
  )

  exitObserver.observe(card)
}

/**
 * Sistema de habilidades técnicas con diseño neobrutalist
 * 
 * Características:
 * - Grid responsivo de tarjetas de skills con logos
 * - Ajuste automático de tamaños según viewport
 * - Interacciones táctiles y de hover diferenciadas
 * - Animaciones de scroll escalonadas (alternando izquierda/derecha)
 * - Logos optimizados con lazy loading implícito
 * - Responsive design con breakpoints adaptativos
 */
function initializeSkillsAnimation() {
  const skillsSection = document.querySelector("#skills")
  if (!skillsSection) return

  // Crear nuevas tarjetas de habilidades con logos
  const skillsGrid = skillsSection.querySelector(".skills-grid")
  if (!skillsGrid) return

  // Limpiar el grid existente
  skillsGrid.innerHTML = ""

  // Definir las habilidades con sus logos y niveles
  const skills = [
    {
      name: "HTML",
      level: 90,
      logo: "resources/img/skills/html-icon.png",
    },
    {
      name: "CSS",
      level: 85,
      logo: "resources/img/skills/css-icon.png",
    },
    {
      name: "JAVASCRIPT",
      level: 80,
      logo: "resources/img/skills/javascript-icon.png",
    },
    {
      name: "REACT",
      level: 60,
      logo: "resources/img/skills/react-icon.png",
    },
    {
      name: "PYTHON",
      level: 75,
      logo: "resources/img/skills/python-icon.png",
    },
    {
      name: "FLASK",
      level: 60,
      logo: "resources/img/skills/flask-icon.png",
    },
    {
      name: "MYSQL",
      level: 75,
      logo: "resources/img/skills/mysql-icon.png",
    },
    {
      name: "FIGMA",
      level: 80,
      logo: "resources/img/skills/figma-icon.png",
    },
    {
      name: "TAILWIND",
      level: 65,
      logo: "resources/img/skills/tailwind-icon.png",
    },
    {
      name: "JAVA",
      level: 80,
      logo: "resources/img/skills/java-icon.png",
    },
  ]

  // Función para ajustar el tamaño de los logos según el ancho de la ventana
  function adjustLogoSize() {
    const windowWidth = window.innerWidth
    let logoSize = 48 // Tamaño predeterminado

    if (windowWidth <= 400) {
      logoSize = 32
    } else if (windowWidth <= 576) {
      logoSize = 36
    } else if (windowWidth <= 768) {
      logoSize = 40
    } else if (windowWidth <= 992) {
      logoSize = 44
    }

    return logoSize
  }

  // Obtener el tamaño de logo adecuado
  const logoSize = adjustLogoSize()

  skills.forEach((skill, index) => {
    const skillCard = document.createElement("div")
    skillCard.className = `skill-card scroll-animation ${
      index % 2 === 0 ? "from-left" : "from-right"
    } delay-${(index % 5) + 1}`

    // Crear el logo
    const skillLogo = document.createElement("div")
    skillLogo.className = "skill-logo"
    const logoImg = document.createElement("img")
    logoImg.src = skill.logo
    logoImg.alt = `${skill.name} logo`
    logoImg.width = logoSize
    logoImg.height = logoSize
    skillLogo.appendChild(logoImg)

    // Crear el nombre de la habilidad
    const skillName = document.createElement("div")
    skillName.className = "skill-name"
    skillName.textContent = skill.name

    // Ensamblar la tarjeta con el nuevo diseño
    skillCard.appendChild(skillLogo)
    skillCard.appendChild(skillName)

    // Añadir la tarjeta al grid
    skillsGrid.appendChild(skillCard)
  })

  // Añadir interactividad a las tarjetas
  const allSkillCards = skillsGrid.querySelectorAll(".skill-card")
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  if (isTouchDevice) {
    // Para dispositivos táctiles
    allSkillCards.forEach((card) => {
      card.addEventListener("click", function () {
        // Cerrar otras tarjetas
        allSkillCards.forEach((otherCard) => {
          if (otherCard !== this) {
            otherCard.classList.remove("touch-active")
          }
        })

        // Alternar clase activa
        this.classList.toggle("touch-active")
      })
    })
  }

  // Inicializar animaciones de scroll para las tarjetas de habilidades
  initializeSkillsScroll()

  // Ajustar el tamaño de las tarjetas cuando cambia el tamaño de la ventana
  window.addEventListener("resize", () => {
    const logoSize = adjustLogoSize()
    const logoImgs = skillsGrid.querySelectorAll(".skill-logo img")

    logoImgs.forEach((img) => {
      img.width = logoSize
      img.height = logoSize
    })
  })
}

// Nueva función para las animaciones de scroll de las tarjetas de habilidades
function initializeSkillsScroll() {
  const skillCards = document.querySelectorAll("#skills .skill-card")

  if ("IntersectionObserver" in window) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")

            // Dejar de observar después de la animación
            // skillsObserver.unobserve(entry.target);
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    skillCards.forEach((card) => {
      card.classList.add("scroll-animate")
      skillsObserver.observe(card)
    })
  } else {
    // Fallback
    skillCards.forEach((card) => {
      card.classList.add("in-view")
    })
  }
}

/**
 * Sistema de tarjetas de educación interactivas
 * 
 * Características:
 * - Efectos hover sofisticados para desktop (elevación, animación de texto)
 * - Interacciones táctiles simplificadas para móviles
 * - Animaciones escalonadas en la entrada
 * - Feedback visual diferenciado según tipo de dispositivo
 * - Estados activos con transiciones suaves
 * - Control de z-index para overlays temporales
 */
function initializeEducationCards() {
  const educationCards = document.querySelectorAll("#education .education-card")

  // Detectar si es un dispositivo táctil
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  educationCards.forEach((card, index) => {
    // Añadir un pequeño retraso inicial para crear un efecto escalonado
    card.style.transitionDelay = `${index * 0.05}s`

    // Para dispositivos no táctiles
    if (!isTouchDevice) {
      // Animación al pasar el mouse
      card.addEventListener("mouseenter", () => {
        // Efecto de elevación
        card.style.zIndex = "10"

        // Animar elementos internos
        const title = card.querySelector(".education-title")
        const year = card.querySelector(".education-year")
        const school = card.querySelector(".education-school")
        const description = card.querySelector(".education-description")

        if (title) title.style.transform = "translateX(5px)"
        if (year) year.style.backgroundColor = "black"
        if (year) year.style.color = "white"
        if (school) school.style.transform = "translateX(-5px)"
        if (description) {
          description.style.transform = "translateY(-3px)"
          description.style.opacity = "1"
        }
      })

      card.addEventListener("mouseleave", () => {
        // Restaurar z-index
        setTimeout(() => {
          card.style.zIndex = ""
        }, 300)

        // Restaurar elementos internos
        const title = card.querySelector(".education-title")
        const year = card.querySelector(".education-year")
        const school = card.querySelector(".education-school")
        const description = card.querySelector(".education-description")

        if (title) title.style.transform = ""
        if (year) year.style.backgroundColor = ""
        if (year) year.style.color = ""
        if (school) school.style.transform = ""
        if (description) {
          description.style.transform = ""
          description.style.opacity = ""
        }
      })
    } else {
      // Simplificar la interacción táctil para evitar conflictos con el scroll
      card.addEventListener("click", function (e) {
        // Cerrar otras tarjetas
        educationCards.forEach((otherCard) => {
          if (otherCard !== this) {
            otherCard.classList.remove("active-touch")

            // Resetear estilos
            const title = otherCard.querySelector(".education-title")
            const year = otherCard.querySelector(".education-year")
            const school = otherCard.querySelector(".education-school")
            const description = otherCard.querySelector(".education-description")

            if (title) title.style.transform = ""
            if (year) {
              year.style.backgroundColor = ""
              year.style.color = ""
            }
            if (school) school.style.transform = ""
            if (description) {
              description.style.transform = ""
              description.style.opacity = ""
            }
          }
        })

        // Alternar estado de la tarjeta actual
        this.classList.toggle("active-touch")

        // Aplicar o quitar estilos según el estado
        const isActive = this.classList.contains("active-touch")
        const title = this.querySelector(".education-title")
        const year = this.querySelector(".education-year")
        const school = this.querySelector(".education-school")
        const description = this.querySelector(".education-description")

        if (isActive) {
          this.style.transform = "translateY(-8px)"
          this.style.boxShadow = "12px 12px 0 rgba(0, 0, 0, 0.2)"
          this.style.zIndex = "10"

          if (title) title.style.transform = "translateX(5px)"
          if (year) {
            year.style.backgroundColor = "black"
            year.style.color = "white"
          }
          if (school) school.style.transform = "translateX(-5px)"
          if (description) {
            description.style.transform = "translateY(-3px)"
            description.style.opacity = "1"
          }
        } else {
          this.style.transform = ""
          this.style.boxShadow = ""
          this.style.zIndex = ""

          if (title) title.style.transform = ""
          if (year) {
            year.style.backgroundColor = ""
            year.style.color = ""
          }
          if (school) school.style.transform = ""
          if (description) {
            description.style.transform = ""
            description.style.opacity = ""
          }
        }
      })

      // Añadir efecto de feedback táctil
      card.addEventListener("touchstart", function () {
        this.style.transition = "transform 0.2s ease"
      })

      card.addEventListener("touchend", function () {
        this.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      })
    }
  })

  // Inicializar animaciones de scroll para las tarjetas de educación
  initializeEducationScroll()
}

// Nueva función para las animaciones de scroll de las tarjetas de educación
function initializeEducationScroll() {
  const educationCards = document.querySelectorAll("#education .education-card")

  if ("IntersectionObserver" in window) {
    const educationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")

            // Dejar de observar después de la animación
            // educationObserver.unobserve(entry.target);
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    educationCards.forEach((card) => {
      card.classList.add("scroll-animate")
      educationObserver.observe(card)
    })
  } else {
    // Fallback
    educationCards.forEach((card) => {
      card.classList.add("in-view")
    })
  }
}

/**
 * Sistema de formulario de contacto con animaciones
 * 
 * Características:
 * - Animaciones de campos con floating labels
 * - Envío asíncrono a Formspree con validación
 * - Modal de confirmación integrada
 * - Animaciones de scroll para elementos del formulario
 * - Soporte táctil mejorado para móviles
 * - Feedback visual durante estados focus/blur
 * - Manejo de errores con fallbacks elegantes
 */
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form")
  if (!contactForm) return

  // Añadir clases de animación al formulario
  contactForm.classList.add("scroll-animation", "from-bottom")

  // Mejorar la animación de los campos del formulario
  const formGroups = contactForm.querySelectorAll(".form-group")

  formGroups.forEach((group, index) => {
    // Añadir clases de animación a cada grupo
    group.classList.add("scroll-animation", "from-left", `delay-${index + 1}`)

    const input = group.querySelector("input, textarea")
    const label = group.querySelector("label")

    if (input && label) {
      // Verificar si el campo ya tiene valor al cargar
      if (input.value.trim() !== "") {
        label.classList.add("active")
      }

      // Eventos para la animación
      input.addEventListener("focus", () => {
        label.classList.add("active")
        input.classList.add("active")
      })

      input.addEventListener("blur", () => {
        if (input.value.trim() === "") {
          label.classList.remove("active")
        }
        input.classList.remove("active")
      })

      // Añadir evento para dispositivos móviles para mejorar la experiencia táctil
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        input.addEventListener("touchstart", () => {
          // Añadir un pequeño retraso para evitar problemas con el scroll
          setTimeout(() => {
            label.classList.add("active")
          }, 100)
        })
      }
    }
  })

  // Añadir clase de animación al botón de envío
  const submitButton = contactForm.querySelector(".submit-button")
  if (submitButton) {
    submitButton.classList.add("scroll-animation", "from-bottom", "delay-4")
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const myForm = e.target
    const formData = new FormData(myForm)
    // Cambia 'your-form-id' por el ID real de tu formulario Formspree
    fetch("https://formspree.io/f/mzzvvgog", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          myForm.reset()
          formGroups.forEach((group) => {
            const label = group.querySelector("label")
            if (label) label.classList.remove("active")
          })
          var modal = document.getElementById("modal-confirm")
          if (modal) {
            modal.style.display = "flex"
            document.body.style.overflow = "hidden"
          }
        } else {
          return response.json().then((data) => {
            throw new Error(data.error || "Error al enviar el formulario.")
          })
        }
      })
      .catch(() => {
        alert("Hubo un problema al enviar el formulario. Intenta nuevamente.")
      })
  })

  // Inicializar animaciones de scroll para el formulario
  initializeContactScroll()
}

// Nueva función para las animaciones de scroll del formulario
function initializeContactScroll() {
  const contactForm = document.querySelector("#contact .contact-form")
  const formGroups = document.querySelectorAll("#contact .form-group")
  const submitButton = document.querySelector("#contact .submit-button")

  if ("IntersectionObserver" in window) {
    const contactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (contactForm) contactObserver.observe(contactForm)
    formGroups.forEach((group) => contactObserver.observe(group))
    if (submitButton) contactObserver.observe(submitButton)
  } else {
    // Fallback
    if (contactForm) contactForm.classList.add("active")
    formGroups.forEach((group) => group.classList.add("active"))
    if (submitButton) submitButton.classList.add("active")
  }
}

/**
 * Sistema avanzado de animaciones de scroll
 * 
 * Utiliza IntersectionObserver para detectar elementos en viewport
 * y aplicar animaciones de entrada/salida con mejor rendimiento
 */
function initializeScrollAnimations() {
  // Inicializar animaciones de fade-in
  const fadeInSections = document.querySelectorAll(".fade-in-section")

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.1 },
  )

  fadeInSections.forEach((section) => {
    fadeObserver.observe(section)
  })

  // Inicializar animaciones avanzadas de scroll
  handleScrollAnimations()

  // Escuchar eventos de scroll
  window.addEventListener("scroll", () => {
    handleScrollAnimations()
  })

  // También ejecutar en resize para manejar cambios de orientación
  window.addEventListener("resize", () => {
    handleScrollAnimations()
  })
}

// Función mejorada para manejar las animaciones de scroll
function handleScrollAnimations() {
  const scrollAnimations = document.querySelectorAll(".scroll-animation")
  const sections = document.querySelectorAll(".section")

  // Verificar si un elemento está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    // Elemento está parcialmente visible
    const isVisible = rect.top <= windowHeight * 0.85 && rect.bottom >= windowHeight * 0.15

    // Elemento está completamente fuera de la vista (para animaciones de salida)
    const isCompletelyOutOfView = rect.bottom <= 0 || rect.top >= windowHeight

    return { isVisible, isCompletelyOutOfView }
  }

  // Aplicar animaciones a elementos
  scrollAnimations.forEach((animation) => {
    const { isVisible, isCompletelyOutOfView } = isInViewport(animation)

    if (isVisible) {
      animation.classList.add("active")
    } else if (animation.classList.contains("exit-enabled") && isCompletelyOutOfView) {
      animation.classList.remove("active")
      animation.classList.add("exit-active")
    } else if (animation.classList.contains("exit-enabled") && !isCompletelyOutOfView) {
      animation.classList.remove("exit-active")
    }
  })

  // Aplicar clase a secciones en vista
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
      section.classList.add("in-view")
    } else {
      section.classList.remove("in-view")
    }
  })
}

/**
 * Botón scroll-to-top con animaciones y feedback táctil
 * 
 * Aparece/desaparece según la posición del scroll
 * Incluye feedback táctil para dispositivos móviles
 */
function initializeScrollTopButton() {
  const scrollTopButton = document.querySelector(".scroll-top-button")
  if (!scrollTopButton) return

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopButton.style.display = "block"
      setTimeout(() => {
        scrollTopButton.classList.add("active")
      }, 10)
    } else {
      scrollTopButton.classList.remove("active")
      setTimeout(() => {
        if (!scrollTopButton.classList.contains("active")) {
          scrollTopButton.style.display = "none"
        }
      }, 300)
    }
  })

  scrollTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Añadir feedback táctil
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    scrollTopButton.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.9)"
    })

    scrollTopButton.addEventListener("touchend", function () {
      this.style.transform = ""
    })
  }
}

// Iniciar animaciones de la página después de la carga
function startPageAnimations() {
  // Animar títulos de la sección inicial
  const titles = document.querySelectorAll(".animate-title")
  titles.forEach((title, index) => {
    setTimeout(() => {
      title.classList.add("show")
    }, 500 * index)
  })

  // Activar efecto glitch
  const glitchText = document.querySelector(".glitch")
  if (glitchText) {
    glitchText.classList.add("show")
  }
}

/**
 * Sistema de partículas de fondo animadas
 * 
 * Crea elementos decorativos flotantes en todas las secciones
 * con posiciones, tamaños y duraciones aleatorias para dinamismo visual
 */
function createParticles() {
  const sections = document.querySelectorAll(".section")

  sections.forEach((section) => {
    // Crear contenedor de partículas si no existe
    if (!section.querySelector(".particles")) {
      const particles = document.createElement("div")
      particles.className = "particles"
      section.appendChild(particles)

      // Crear partículas
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("span")
        particle.className = "particle"

        // Posición aleatoria
        const posX = Math.random() * 100
        const posY = Math.random() * 100

        // Tamaño aleatorio
        const size = Math.random() * 10 + 5

        // Duración y retraso aleatorios
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 5

        // Aplicar estilos
        particle.style.left = `${posX}%`
        particle.style.top = `${posY}%`
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.animationDuration = `${duration}s`
        particle.style.animationDelay = `${delay}s`

        particles.appendChild(particle)
      }
    }
  })
}

// Función para animar secuencialmente los elementos
function animateSequentially(elements, delayBetween = 200) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, index * delayBetween)
  })
}
