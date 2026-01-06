import { initializeContactForm } from '../modules/contact.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("modal-confirm");
  const closeBtn = document.getElementById("modal-close");

  if (form && modal && closeBtn) {
    form.addEventListener("submit", (e) => {
      setTimeout(() => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }, 100);
    });

    function closeModal() {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);
    closeBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") closeModal();
    });

    window.addEventListener("keydown", (e) => {
      if (modal.style.display === "flex" && e.key === "Escape") closeModal();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  initializeContactForm();
});