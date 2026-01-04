import { initializeNavigation } from './modules/navigation.js'
import { initializeSmoothScrolling } from './modules/smoothScroll.js'
import { initializeProjectCards } from './modules/projectCards.js'
import { initializeEducationCards } from './modules/educationCards.js'
import { initializeContactForm } from './modules/contact.js'
import { initializeScrollAnimations } from './modules/scrollAnimations.js'
import { initializeScrollTopButton } from './modules/scrollToTop.js'
import { createParticles } from './modules/particles.js'

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form")
  const modal = document.getElementById("modal-confirm")
  const closeBtn = document.getElementById("modal-close")

  if (form && modal && closeBtn) {
    form.addEventListener("submit", (e) => {
      setTimeout(() => {
        modal.style.display = "flex"
        document.body.style.overflow = "hidden"
      }, 100)
    })

    function closeModal() {
      modal.style.display = "none"
      document.body.style.overflow = ""
    }

    closeBtn.addEventListener("click", closeModal)
    closeBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") closeModal()
    })
    
    window.addEventListener("keydown", (e) => {
      if (modal.style.display === "flex" && e.key === "Escape") closeModal()
    })
    
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal()
    })
  }
})


document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeSmoothScrolling()
  initializeProjectCards()
  initializeContactForm()
  initializeScrollAnimations()
  createParticles()
  initializeScrollTopButton()
  initializeEducationCards()
})
