/**
 * Script de funcionalidad del formulario de contacto
 * 
 * Gestiona:
 * - Animaciones de los campos del formulario (labels flotantes)
 * - Envío asíncrono del formulario a través de Formspree
 * - Modal de confirmación con animaciones de entrada
 * - Accesibilidad completa (teclado, focus, ARIA)
 * - Responsive design y experiencia de usuario optimizada
 */

document.addEventListener("DOMContentLoaded", () => {
  // Obtener elementos del DOM
  const contactForm = document.getElementById("contact-form")
  const modal = document.getElementById("modal-confirm")
  const closeBtn = document.getElementById("modal-close")

  // Verificar que todos los elementos necesarios existan
  if (!contactForm || !modal || !closeBtn) return

  // Obtener todos los grupos de campos del formulario
  const formGroups = contactForm.querySelectorAll(".form-group")

  /**
   * Configurar animaciones de los campos del formulario
   * Implementa el patrón de "floating labels" con animaciones suaves
   */
  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea")
    const label = group.querySelector("label")

    if (input && label) {
      // Verificar estado inicial del campo (si ya tiene contenido)
      if (input.value.trim() !== "") {
        label.classList.add("active")
      }

      /**
       * Evento focus: Activar label y campo cuando recibe foco
       */
      input.addEventListener("focus", () => {
        label.classList.add("active")
        input.classList.add("active")
      })

      /**
       * Evento blur: Desactivar animaciones si el campo está vacío
       */
      input.addEventListener("blur", () => {
        if (input.value.trim() === "") {
          label.classList.remove("active")
        }
        input.classList.remove("active")
      })
    }
  })

  /**
   * Manejar el envío del formulario
   * Utiliza fetch API para envío asíncrono a Formspree
   */
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(contactForm)

    // Envío asíncrono del formulario
    fetch("https://formspree.io/f/mzzvvgog", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Resetear formulario y estados visuales
          contactForm.reset()
          formGroups.forEach((group) => {
            const label = group.querySelector("label")
            if (label) label.classList.remove("active")
          })

          // Mostrar modal de confirmación
          showModal()
        } else {
          // Manejar errores de respuesta del servidor
          showErrorMessage()
        }
      })
      .catch(() => {
        // Manejar errores de red o conexión
        showErrorMessage()
      })
  })

  /**
   * Mostrar modal de confirmación exitosa
   * Incluye bloqueo del scroll de fondo
   */
  function showModal() {
    modal.style.display = "flex"
    document.body.style.overflow = "hidden"
    
    // Enfocar el botón de cerrar para accesibilidad
    closeBtn.focus()
  }

  /**
   * Mostrar mensaje de error al usuario
   * Fallback simple para errores de envío
   */
  function showErrorMessage() {
    alert("Hubo un problema al enviar el formulario. Por favor, intenta nuevamente.")
  }

  /**
   * Cerrar modal de confirmación
   * Restaura el scroll y oculta la modal
   */
  function closeModal() {
    modal.style.display = "none"
    document.body.style.overflow = ""
  }

  /**
   * Event Listeners para cerrar la modal
   */
  
  // Cerrar con click en el botón X
  closeBtn.addEventListener("click", closeModal)
  
  // Cerrar con teclado (Enter, Espacio, Escape)
  closeBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
      closeModal()
    }
  })

  // Cerrar con Escape desde cualquier lugar cuando la modal está abierta
  window.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex" && e.key === "Escape") {
      closeModal()
    }
  })

  // Cerrar haciendo click fuera del contenido de la modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })
})