export function initializeSmoothScrolling() {
  try {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        if (targetId === "#") return 

        const target = document.querySelector(targetId)
        if (target) {
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset

          const startPosition = window.pageYOffset

          const distance = targetPosition - startPosition

          const duration = 800

          let startTime = null

          function animation(currentTime) {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / duration, 1)

            const ease = easeInOutCubic(progress)

            window.scrollTo(0, startPosition + distance * ease)

            if (timeElapsed < duration) {
              requestAnimationFrame(animation)
            } else {
              window.scrollTo(0, targetPosition)
            }
          }

          function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
          }

          requestAnimationFrame(animation)
        }
      })
    })
  } catch (error) {
    return
  }
}
