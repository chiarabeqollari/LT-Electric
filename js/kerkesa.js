const summary = document.querySelector("#request-summary");
const requestForm = document.querySelector(".request-form");
const requestMessage = document.querySelector("#request-message");
const phoneInput = document.querySelector("#request-phone");
const dateInput = document.querySelector("#request-date");

// Lexon kerkesen e ruajtur nga faqja Konfiguro
let request = null;

try {
  const saved = JSON.parse(sessionStorage.getItem("serviceRequest"));

  if (saved && typeof saved === "object" && saved.title) {
    request = saved;
  }
} catch {
  request = null;
}

if (request) {
  const lines = [
    request.title,
    `Sasia: ${request.quantity} ${request.unit}`,
    `Çmimi total: ${request.total}`,
    request.duration
  ];

  lines.forEach(text => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    summary.append(paragraph);
  });
} else {
  summary.textContent = "Nuk ke zgjedhur ende një shërbim.";
}

// Data e preferuar nuk mund te jete ne te kaluaren
const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dateInput.min = today.toISOString().split("T")[0];

// Kontrollon numrin e telefonit (si te faqja Kontakti)
function validatePhone() {
  const phone = phoneInput.value.trim();
  const digits = phone.replace(/\D/g, "");

  const validPhone =
    /^\+?[\d\s()-]+$/.test(phone) &&
    digits.length >= 8 &&
    digits.length <= 15;

  phoneInput.setCustomValidity(
    validPhone ? "" : "Shkruaj një numër telefoni të vlefshëm."
  );
}

phoneInput.addEventListener("input", () => {
  validatePhone();
  requestMessage.textContent = "";
});

requestForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!request) {
    requestMessage.textContent =
      "Zgjidh fillimisht një shërbim nga faqja Shërbimet.";
    return;
  }

  validatePhone();

  if (!requestForm.reportValidity()) return;

  const name = document.querySelector("#request-name").value.trim();

  if (!name) {
    requestMessage.textContent = "Shkruaj emrin tënd.";
    return;
  }

  requestMessage.textContent =
    `${name}, formulari u plotësua me sukses. ` +
    "Ky është një demonstrim; kërkesa nuk është dërguar.";
});