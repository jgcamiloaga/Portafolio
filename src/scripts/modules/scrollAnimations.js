export function initializeScrollAnimations() {
  const fadeInSections = document.querySelectorAll(".fade-in-section")

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.1 },
  )

  fadeInSections.forEach((section) => {
    fadeObserver.observe(section)
  })

  handleScrollAnimations()

  window.addEventListener("scroll", () => {
    handleScrollAnimations()
  })

  window.addEventListener("resize", () => {
    handleScrollAnimations()
  })
}

function handleScrollAnimations() {
  const scrollAnimations = document.querySelectorAll(".scroll-animation")
  const sections = document.querySelectorAll(".section")

  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    const isVisible = rect.top <= windowHeight * 0.85 && rect.bottom >= windowHeight * 0.15
    const isCompletelyOutOfView = rect.bottom <= 0 || rect.top >= windowHeight

    return { isVisible, isCompletelyOutOfView }
  }

  scrollAnimations.forEach((animation) => {
    const { isVisible, isCompletelyOutOfView } = isInViewport(animation)

    if (isVisible) {
      animation.classList.add("active")
    } else if (animation.classList.contains("exit-enabled") && isCompletelyOutOfView) {
      animation.classList.remove("active")
      animation.classList.add("exit-active")
    } else if (animation.classList.contains("exit-enabled") && !isCompletelyOutOfView) {
      animation.classList.remove("exit-active")
    }
  })

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
      section.classList.add("in-view")
    } else {
      section.classList.remove("in-view")
    }
  })
}
