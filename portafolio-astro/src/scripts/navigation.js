// Navegación mejorada
document.addEventListener("DOMContentLoaded", () => {
  console.log("🔧 Inicializando navegación...");
  
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  const navLinksItems = document.querySelectorAll(".nav-link")
  const body = document.body

  console.log("📋 Elementos encontrados:", {
    menuToggle: !!menuToggle,
    navLinks: !!navLinks,
    navLinksItems: navLinksItems.length
  });

  if (!menuToggle || !navLinks) {
    console.error("❌ Elementos de navegación no encontrados")
    return
  }

  console.log("✅ Navegación inicializada correctamente");

  // Función para alternar el menú
  function toggleMenu() {
    console.log("🍔 Toggle menú llamado");
    
    menuToggle.classList.toggle("active")
    navLinks.classList.toggle("active")

    const isActive = menuToggle.classList.contains("active");
    console.log("📱 Estado del menú:", isActive ? "ABIERTO" : "CERRADO");

    if (isActive) {
      // Menú abierto
      body.style.overflow = "hidden"

      // Animar enlaces secuencialmente con efectos mejorados
      navLinksItems.forEach((link, index) => {
        link.style.opacity = "0"
        link.style.transform = "translateX(-100px) rotate(-5deg)"
        link.style.filter = "blur(5px)"

        setTimeout(
          () => {
            link.style.opacity = "1"
            link.style.transform = "translateX(0) rotate(0deg)"
            link.style.filter = "blur(0px)"
          },
          150 + index * 100,
        )
      })
    } else {
      // Menú cerrado
      body.style.overflow = ""
      
      // Animar salida de enlaces
      navLinksItems.forEach((link, index) => {
        setTimeout(
          () => {
            link.style.opacity = "0"
            link.style.transform = "translateX(100px) rotate(5deg)"
            link.style.filter = "blur(5px)"
          },
          index * 50,
        )
      })
    }
  }

  // Event listeners
  console.log("🎯 Agregando event listeners...");
  menuToggle.addEventListener("click", (e) => {
    console.log("🖱️ Click en botón hamburguesa detectado");
    e.preventDefault();
    toggleMenu();
  });

  // Cerrar menú al hacer clic en cualquier enlace
  navLinksItems.forEach(link => {
    link.addEventListener("click", () => {
      if (menuToggle.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Cerrar menú con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuToggle.classList.contains("active")) {
      toggleMenu()
    }
  })

  // Resaltado de sección activa
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

    navLinksItems.forEach((link) => {
      link.classList.remove("active-link")
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active-link")
      }
    })
  })
})
