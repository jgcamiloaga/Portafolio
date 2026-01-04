export function initializeSmoothScrolling() {
  try {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        if (targetId === "#") return 

        const target = document.querySelector(targetId)
        if (target) {
          document.body.classList.add("scrolling")

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
              document.body.classList.remove("scrolling")

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
    return
  }
}
