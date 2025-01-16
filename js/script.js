// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Project card tilt effect
function moveCard(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(-8px, -8px)`;
  card.style.boxShadow = "8px 8px 0 black";
}

// Reset card position when mouse leaves
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

// Animate skill levels on scroll
const skillLevels = document.querySelectorAll(".skill-level");

function animateSkillLevels() {
  skillLevels.forEach((skill) => {
    const level = skill.getAttribute("data-level");
    skill.style.width = "0%";
    setTimeout(() => {
      skill.style.transition = "width 1s ease-in-out";
      skill.style.width = `${level}%`;
    }, 200);
  });
}

// Intersection Observer for skill levels animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillLevels();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document
  .querySelector("#skills")
  .querySelectorAll(".skill-card")
  .forEach((card) => {
    observer.observe(card);
  });

// Form submission handling
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Add your form submission logic here
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    console.log("Form submitted:", formData);
    // You would typically send this data to a server here

    // Reset form
    this.reset();
    alert("Gracias por tu mensaje! Te responderé pronto.");
  });

// Active section highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.backgroundColor = "";
    if (link.getAttribute("href").slice(1) === current) {
      link.style.backgroundColor = "black";
      link.style.color = "white";
    } else {
      link.style.backgroundColor = "";
      link.style.color = "black";
    }
  });
});
