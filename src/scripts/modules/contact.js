export function initializeContactForm() {
  const contactForm = document.getElementById("contact-form")
  if (!contactForm) return

  contactForm.classList.add("scroll-animation", "from-bottom")

  const formGroups = contactForm.querySelectorAll(".form-group")

  formGroups.forEach((group, index) => {
    group.classList.add("scroll-animation", "from-left", `delay-${index + 1}`)

    const input = group.querySelector("input, textarea")
    const label = group.querySelector("label")

    if (input && label) {
      if (input.value.trim() !== "") {
        label.classList.add("active")
      }

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

      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        input.addEventListener("touchstart", () => {
          setTimeout(() => {
            label.classList.add("active")
          }, 100)
        })
      }
    }
  })

  const submitButton = contactForm.querySelector(".submit-button")
  if (submitButton) {
    submitButton.classList.add("scroll-animation", "from-bottom", "delay-4")
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const myForm = e.target
    const formData = new FormData(myForm)

    fetch(import.meta.env.PUBLIC_FORMSPREE_URL, {
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
          const modal = document.getElementById("modal-confirm")
          if (modal) {
            modal.style.display = "flex"
            document.body.style.overflow = "hidden"
            
            const closeBtn = document.getElementById("modal-close")
            if (closeBtn) closeBtn.focus()
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

  initializeModalClose()
  initializeContactScroll()
}

function initializeModalClose() {
  const modal = document.getElementById("modal-confirm")
  const closeBtn = document.getElementById("modal-close")
  
  if (!modal || !closeBtn) return

  function closeModal() {
    modal.style.display = "none"
    document.body.style.overflow = ""
  }

  closeBtn.addEventListener("click", closeModal)
  
  closeBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
      e.preventDefault()
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
}

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
    if (contactForm) contactForm.classList.add("active")
    formGroups.forEach((group) => group.classList.add("active"))
    if (submitButton) submitButton.classList.add("active")
  }
}
