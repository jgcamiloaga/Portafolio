export function initializeScrollTopButton() {
  const scrollTopButton = document.querySelector(".scroll-top-button")
  if (!scrollTopButton) return

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopButton.style.display = "block"
      setTimeout(() => {
        scrollTopButton.classList.add("active")
      }, 10)
    } else {
      scrollTopButton.classList.remove("active")
      setTimeout(() => {
        if (!scrollTopButton.classList.contains("active")) {
          scrollTopButton.style.display = "none"
        }
      }, 300)
    }
  })

  scrollTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    scrollTopButton.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.9)"
    })

    scrollTopButton.addEventListener("touchend", function () {
      this.style.transform = ""
    })
  }
}
