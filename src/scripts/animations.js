/**
 * Script principal de animaciones del portafolio
 * 
 * Este archivo orquesta todos los módulos de interacción y animación del sitio.
 * Cada funcionalidad está separada en su propio módulo para mejor mantenibilidad.
 * 
 * Módulos:
 * - navigation: Menú hamburguesa y navegación móvil
 * - smoothScroll: Desplazamiento suave entre secciones
 * - projectCards: Tarjetas de proyectos con efectos 3D
 * - educationCards: Tarjetas de educación interactivas
 * - contact: Formulario de contacto con validación
 * - scrollAnimations: Sistema de animaciones basado en scroll
 * - scrollToTop: Botón flotante para volver arriba
 * - particles: Partículas decorativas de fondo
 */

// Importar todos los módulos
import { initializeNavigation } from './modules/navigation.js'
import { initializeSmoothScrolling } from './modules/smoothScroll.js'
import { initializeProjectCards } from './modules/projectCards.js'
import { initializeEducationCards } from './modules/educationCards.js'
import { initializeContactForm } from './modules/contact.js'
import { initializeScrollAnimations } from './modules/scrollAnimations.js'
import { initializeScrollTopButton } from './modules/scrollToTop.js'
import { createParticles } from './modules/particles.js'

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
  initializeContactForm()
  initializeScrollAnimations()
  createParticles()
  initializeScrollTopButton()
  initializeEducationCards()
})
