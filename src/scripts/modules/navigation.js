export function initializeNavigation() {
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  const navLinksItems = document.querySelectorAll(".nav-link")
  const body = document.body

  if (!menuToggle || !navLinks) return

  const navOverlay = document.createElement("div")
  navOverlay.className = "nav-overlay"
  navOverlay.style.position = "fixed"
  navOverlay.style.top = "0"
  navOverlay.style.left = "0"
  navOverlay.style.width = "100%"
  navOverlay.style.height = "100%"
  navOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
  navOverlay.style.zIndex = "999"
  navOverlay.style.opacity = "0"
  navOverlay.style.visibility = "hidden"
  navOverlay.style.transition = "all 0.3s ease"
  navOverlay.style.backdropFilter = "blur(3px)"
  body.appendChild(navOverlay)

  function toggleMenu() {
    menuToggle.classList.toggle("active")
    const isExpanded = menuToggle.classList.contains("active")

    if (isExpanded) {
      menuToggle.setAttribute("aria-expanded", "true")
      menuToggle.setAttribute("aria-label", "Cerrar menú de navegación")

      navOverlay.style.visibility = "visible"
      setTimeout(() => {
        navOverlay.style.opacity = "1"
      }, 10)

      navLinks.classList.add("active")

      body.style.overflow = "hidden"

      navLinksItems.forEach((link, index) => {
        link.style.opacity = "0"
        link.style.transform = "translateY(-20px)"

        void link.offsetWidth

        setTimeout(
          () => {
            link.style.opacity = "1"
            link.style.transform = "translateY(0)"
          },
          100 + index * 50,
        )
      })
    } else {
      menuToggle.setAttribute("aria-expanded", "false")
      menuToggle.setAttribute("aria-label", "Abrir menú de navegación")

      navOverlay.style.opacity = "0"
      setTimeout(() => {
        navOverlay.style.visibility = "hidden"
      }, 300)

      navLinks.classList.remove("active")

      body.style.overflow = ""

      navLinksItems.forEach((link, index) => {
        setTimeout(
          () => {
            link.style.opacity = "0"
            link.style.transform = "translateY(-10px)"
          },
          (navLinksItems.length - index - 1) * 30,
        )
      })

      setTimeout(() => {
        if (!menuToggle.classList.contains("active")) {
          navLinksItems.forEach((link) => {
            link.style.opacity = ""
            link.style.transform = ""
          })
        }
      }, 300)
    }
  }

  menuToggle.addEventListener("click", toggleMenu)

  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu()
    })

    link.style.opacity = "0"
    link.style.transform = "translateY(-20px)"
    link.style.transition = "all 0.5s ease"
  })

  navOverlay.addEventListener("click", toggleMenu)

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuToggle.classList.contains("active")) {
      toggleMenu()
    }
  })

  setTimeout(() => {
    animateSequentially(navLinksItems)
  }, 1000)

  initializeActiveSection(navLinksItems)
}

function initializeActiveSection(navLinks) {
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active-link")
      link.removeAttribute("aria-current")
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active-link")
        link.setAttribute("aria-current", "page")
      }
    })
  })
}

function animateSequentially(elements, delayBetween = 200) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, index * delayBetween)
  })
}
