// Funcionalidad del formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  const modal = document.getElementById("modal-confirm")
  const closeBtn = document.getElementById("modal-close")

  if (!contactForm || !modal || !closeBtn) return

  // Mejorar la animación de los campos del formulario
  const formGroups = contactForm.querySelectorAll(".form-group")

  formGroups.forEach((group) => {
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
    }
  })

  // Manejar envío del formulario
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(contactForm)

    fetch("https://formspree.io/f/mzzvvgog", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          contactForm.reset()
          formGroups.forEach((group) => {
            const label = group.querySelector("label")
            if (label) label.classList.remove("active")
          })

          // Mostrar modal
          modal.style.display = "flex"
          document.body.style.overflow = "hidden"
        } else {
          throw new Error("Error al enviar el formulario")
        }
      })
      .catch((error) => {
        alert("Hubo un problema al enviar el formulario. Intenta nuevamente.")
        console.error(error)
      })
  })

  // Cerrar modal
  function closeModal() {
    modal.style.display = "none"
    document.body.style.overflow = ""
  }

  closeBtn.addEventListener("click", closeModal)
  closeBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
      closeModal()
    }
  })

  window.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex" && e.key === "Escape") {
      closeModal()
    }
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })
})
