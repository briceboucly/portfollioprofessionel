// Gestion simple du formulaire de contact (simulation)
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const msg = document.getElementById("form-msg");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Simulation d'envoi
        msg.textContent = "Merci pour votre message, Brice vous répondra rapidement !";
        msg.style.color = "#2b354a";
        form.reset();
    });
});
