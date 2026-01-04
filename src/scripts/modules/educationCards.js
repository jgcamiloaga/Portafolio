/**
 * Módulo de tarjetas de educación
 * Maneja interacciones hover/touch y animaciones de scroll
 */

/**
 * Inicializa las tarjetas de educación con efectos interactivos
 */
export function initializeEducationCards() {
  const educationCards = document.querySelectorAll("#education .education-card")

  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  educationCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`

    if (!isTouchDevice) {
      // Para desktop - efectos hover
      card.addEventListener("mouseenter", () => {
        card.style.zIndex = "10"

        const title = card.querySelector(".education-title")
        const year = card.querySelector(".education-year")
        const school = card.querySelector(".education-school")
        const description = card.querySelector(".education-description")

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
      })

      card.addEventListener("mouseleave", () => {
        setTimeout(() => {
          card.style.zIndex = ""
        }, 300)

        const title = card.querySelector(".education-title")
        const year = card.querySelector(".education-year")
        const school = card.querySelector(".education-school")
        const description = card.querySelector(".education-description")

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
      })
    } else {
      // Para móvil - interacciones táctiles
      card.addEventListener("click", function (e) {
        educationCards.forEach((otherCard) => {
          if (otherCard !== this) {
            otherCard.classList.remove("active-touch")

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

        this.classList.toggle("active-touch")

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

      card.addEventListener("touchstart", function () {
        this.style.transition = "transform 0.2s ease"
      })

      card.addEventListener("touchend", function () {
        this.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      })
    }
  })

  initializeEducationScroll()
}

/**
 * Animaciones de scroll para las tarjetas de educación
 */
function initializeEducationScroll() {
  const educationCards = document.querySelectorAll("#education .education-card")

  if ("IntersectionObserver" in window) {
    const educationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
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
    educationCards.forEach((card) => {
      card.classList.add("in-view")
    })
  }
}
