import { initializeNavigation } from './modules/navigation.js'
import { initializeSmoothScrolling } from './modules/smoothScroll.js'
import { initializeScrollAnimations } from './modules/scrollAnimations.js'
import { initializeScrollTopButton } from './modules/scrollToTop.js'
import { createParticles } from './modules/particles.js'

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeSmoothScrolling()
  initializeScrollAnimations()
  createParticles()
  initializeScrollTopButton()
})
