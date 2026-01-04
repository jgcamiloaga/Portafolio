/**
 * Módulo de partículas
 * Crea elementos decorativos animados en el fondo de las secciones
 */

/**
 * Crea partículas de fondo animadas
 */
export function createParticles() {
  const sections = document.querySelectorAll(".section")

  sections.forEach((section) => {
    // Crear contenedor de partículas si no existe
    if (!section.querySelector(".particles")) {
      const particles = document.createElement("div")
      particles.className = "particles"
      section.appendChild(particles)

      // Crear partículas individuales
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
