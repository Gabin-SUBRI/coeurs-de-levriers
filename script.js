// Mobile Menu Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

//formulaire
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const result = document.getElementById("formResult");

    btn.disabled = true;
    btn.textContent = "Envoi en cours…";

    const data = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
    }).then((r) => r.json());

    if (data.success) {
      result.textContent =
        "✅ Message envoyé ! Nous vous répondrons rapidement.";
      result.classList.add("success");
      contactForm.reset();
    } else {
      result.textContent =
        "❌ Erreur lors de l'envoi. Merci de réessayer ou de nous appeler.";
      result.style.color = "var(--accent)";
    }

    btn.disabled = false;
    btn.textContent = "Envoyer le message";
  });
}
