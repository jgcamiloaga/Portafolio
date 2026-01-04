export function initializeProjectCards() {
  const projectCards = document.querySelectorAll("#projects .project-card")

  function detectTouchDevice() {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0

    if (isTouchDevice) {
      document.body.classList.add("touch-device")
    } else {
      document.body.classList.add("no-touch-device")
    }

    return isTouchDevice
  }

  const isTouchDevice = detectTouchDevice()

  projectCards.forEach((card) => {
    const tiltContainer = card.querySelector(".project-tilt-container")
    
    if (tiltContainer) {
      card.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const percentX = (x - centerX) / centerX
        const percentY = (y - centerY) / centerY

        const container = this.querySelector(".project-tilt-container")
        
        if (container) {
          container.style.transform = `perspective(1200px) rotateX(${percentY * -16}deg) rotateY(${percentX * 16}deg) scale3d(1.035, 1.035, 1.035)`
          container.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)'
        }
      })

      card.addEventListener("mouseleave", function () {
        const container = this.querySelector(".project-tilt-container")
        if (container) {
          container.style.transform = "perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
        }
      })
    }
  })

  initializeProjectScroll()
}

function initializeProjectScroll() {
  const projectCards = document.querySelectorAll("#projects .project-card")
  const isTouchDevice = document.body.classList.contains("touch-device")

  if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")

            if (isTouchDevice) {
              const content = entry.target.querySelector(".project-content")
              const image = entry.target.querySelector(".project-image")
              const number = entry.target.querySelector(".project-number")
              const tiltContainer = entry.target.querySelector(".project-tilt-container")

              if (content) content.classList.add("animated")
              if (image) image.classList.add("animated")
              if (number) number.classList.add("animated")
              if (tiltContainer) tiltContainer.classList.add("animated")
            } else {
              const container = entry.target.querySelector(".project-tilt-container")
              const content = entry.target.querySelector(".project-content")
              const image = entry.target.querySelector(".project-image")
              const number = entry.target.querySelector(".project-number")
              const pattern = entry.target.querySelector(".project-pattern")

              if (container) container.classList.add("animated")
              if (content) content.classList.add("animated")
              if (image) image.classList.add("animated")
              if (number) number.classList.add("animated")
              if (pattern) pattern.classList.add("animated")
            }

            setupExitAnimation(entry.target)
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove("in-view")

            const elements = entry.target.querySelectorAll(".animated")
            elements.forEach((el) => {
              el.classList.remove("animated")
            })
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    projectCards.forEach((card) => {
      card.classList.add("scroll-animate")
      projectObserver.observe(card)
    })
  } else {
    projectCards.forEach((card) => {
      card.classList.add("in-view")
    })
  }
}

function setupExitAnimation(card) {
  const exitObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          card.classList.add("exit-animation")

          setTimeout(() => {
            card.classList.remove("exit-animation")
          }, 500)

          exitObserver.unobserve(card)
        }
      })
    },
    {
      threshold: 0,
      rootMargin: "-20% 0px 0px 0px",
    },
  )

  exitObserver.observe(card)
}
