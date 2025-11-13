// ==========================
// Contact Form Handler
// ==========================
if (window.location.pathname.endsWith("contact.html")) {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formResponse");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      msg.innerHTML = `<div class="alert alert-danger">Please fill all fields.</div>`;
      return;
    }

    msg.innerHTML = `<div class="alert alert-success">Message sent successfully!</div>`;
    form.reset();
  });
}
