/**
 * Módulo de smooth scrolling
 * Maneja el desplazamiento suave entre secciones
 */

/**
 * Inicializa el sistema de smooth scrolling
 */
export function initializeSmoothScrolling() {
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
