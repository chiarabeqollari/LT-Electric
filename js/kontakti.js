const contactForm = document.querySelector(".contact-form");
const nameInput = document.querySelector("#contact-name");
const phoneInput = document.querySelector("#contact-phone");
const messageInput = document.querySelector("#contact-message");
const feedback = document.querySelector("#contact-feedback");

// Kontrollon emrin, telefonin dhe mesazhin
function validateContact() {
  nameInput.setCustomValidity(
    nameInput.value.trim() ? "" : "Shkruaj emrin tënd."
  );

  const phone = phoneInput.value.trim();
  const digits = phone.replace(/\D/g, "");

  const validPhone =
    /^\+?[\d\s()-]+$/.test(phone) &&
    digits.length >= 8 &&
    digits.length <= 15;

  phoneInput.setCustomValidity(
    validPhone ? "" : "Shkruaj një numër telefoni të vlefshëm."
  );

  messageInput.setCustomValidity(
    messageInput.value.trim() ? "" : "Shkruaj mesazhin tënd."
  );
}

// Perditeson kontrollin gjate shkrimit
[nameInput, phoneInput, messageInput].forEach(input => {
  input.addEventListener("input", () => {
    validateContact();
    feedback.textContent = "";
  });
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  validateContact();

  if (!contactForm.reportValidity()) return;

  feedback.style.color = "var(--primary-blue)";
  feedback.textContent =
    `${nameInput.value.trim()}, formulari u plotësua me sukses. ` +
    "Ky është një demonstrim; mesazhi nuk është dërguar.";
});