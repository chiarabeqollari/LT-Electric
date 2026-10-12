// Vlera provë për shërbimet.
// Çmimet e materialeve përputhen me çmimet e Dyqanit.
const services = {
  prize: {
    title: "Instalim Prizë e Re",
    description: "Shtim ose zëvendësim prize, përfshirë kabllim dhe kanal.",
    icon: "fa-plug",
    question: "Sa priza të reja dëshiron?",
    unit: "copë prizë",
    labor: 1700,
    minutes: 70,
    materials: [
      { name: "Prizë standarde", quantity: 1, unit: "copë", price: 600 },
      { name: "Kabllo 3×2.5mm²", quantity: 3, unit: "m", price: 150 },
      { name: "Kanal plastik", quantity: 2, unit: "m", price: 80 }
    ]
  },

  celes: {
    title: "Instalim Çelës Drite",
    description: "Vendosje ose ndërrim çelësi ndriçimi.",
    icon: "fa-toggle-on",
    question: "Sa çelësa drite dëshiron?",
    unit: "copë çelës",
    labor: 1400,
    minutes: 60,
    materials: [
      { name: "Çelës drite i thjeshtë", quantity: 1, unit: "copë", price: 550 },
      { name: "Kabllo 3×1.5mm²", quantity: 2, unit: "m", price: 120 },
      { name: "Kuti montimi", quantity: 1, unit: "copë", price: 150 }
    ]
  },

  kamera: {
    title: "Vendosje Kamera Sigurie",
    description: "Instalim kamerash sigurie me kabllim dhe lidhje në rrjet.",
    icon: "fa-camera",
    question: "Sa kamera dëshiron?",
    unit: "copë kamera",
    labor: 3500,
    minutes: 105,
    materials: [
      { name: "Kamera sigurie", quantity: 1, unit: "copë", price: 4500 },
      { name: "Kabllo rrjeti", quantity: 10, unit: "m", price: 70 },
      { name: "Konektor RJ45", quantity: 2, unit: "copë", price: 50 }
    ]
  },

  ndricim: {
    title: "Instalim Ndriçimi",
    description: "Vendosje pikash ndriçimi LED.",
    icon: "fa-lightbulb",
    question: "Sa pika ndriçimi dëshiron?",
    unit: "pikë ndriçimi",
    labor: 1400,
    minutes: 55,
    materials: [
      { name: "Spot LED", quantity: 1, unit: "copë", price: 800 },
      { name: "Kabllo 3×1.5mm²", quantity: 3, unit: "m", price: 120 },
      { name: "Konektor lidhjeje", quantity: 2, unit: "copë", price: 50 }
    ]
  },

  tabllo: {
    title: "Instalim Tabllo Elektrike",
    description: "Vendosje tablloje me automatë dhe mbrojtje diferenciale.",
    icon: "fa-bolt",
    question: "Sa tabllo elektrike dëshiron?",
    unit: "copë tabllo",
    labor: 4400,
    minutes: 140,
    materials: [
      { name: "Tabllo elektrike", quantity: 1, unit: "copë", price: 2500 },
      { name: "Automat 16A", quantity: 6, unit: "copë", price: 350 },
      { name: "Automat diferencial 25A", quantity: 1, unit: "copë", price: 1500 }
    ]
  },

  instalim: {
    title: "Instalim i Plotë Elektrik",
    description: "Paketë provë instalimi për një ambient të vogël.",
    icon: "fa-house",
    question: "Sa ambiente dëshiron të konfigurosh?",
    unit: "ambient",
    labor: 7400,
    minutes: 275,
    materials: [
      { name: "Kabllo 3×2.5mm²", quantity: 50, unit: "m", price: 150 },
      { name: "Prizë standarde", quantity: 6, unit: "copë", price: 600 },
      { name: "Çelës drite i thjeshtë", quantity: 4, unit: "copë", price: 550 },
      { name: "Kanal plastik", quantity: 20, unit: "m", price: 80 }
    ]
  }
};

// Lexon shërbimin nga adresa e faqes
const params = new URLSearchParams(window.location.search);
const serviceKey = params.get("sherbimi");

const service = Object.hasOwn(services, serviceKey)
  ? services[serviceKey]
  : services.prize;

const quantityPicker = document.querySelector(
  ".configure-quantity .quantity-picker"
);
const quantityInput = quantityPicker.querySelector("input");
const minusButton = quantityPicker.querySelector("button:first-child");
const plusButton = quantityPicker.querySelector("button:last-child");

const materialsList = document.querySelector(".configure-materials-card ul");
const summaryList = document.querySelector(".configure-summary-list");
const totalElement = document.querySelector(".configure-total");
const durationElement = document.querySelector("#duration-text");

// Vendos titullin, përshkrimin dhe ikonën e shërbimit
document.querySelector(".configure-heading h1").textContent = service.title;
document.querySelector(".configure-heading p").textContent = service.description;

document.querySelector(".configure-heading-icon i").className =
  `fa-solid ${service.icon}`;

document.querySelector(".configure-quantity label").textContent =
  service.question;

document.querySelector(".configure-quantity-row > span").textContent =
  service.unit;

minusButton.setAttribute("aria-label", "Ul sasinë");
plusButton.setAttribute("aria-label", "Rrit sasinë");
quantityInput.step = "1";
quantityInput.max = "50";

// Formatimi i çmimeve
function formatPrice(value) {
  return `${value.toLocaleString("en-US")} lekë`;
}

// Sasia duhet të jetë numër i plotë, nga 1 deri në MAX_QUANTITY
const MAX_QUANTITY = 50;

function getQuantity() {
  const value = Number(quantityInput.value);

  return Number.isFinite(value)
    ? Math.min(MAX_QUANTITY, Math.max(1, Math.floor(value)))
    : 1;
}

function updateTotal() {
  const quantity = getQuantity();
  let materialsTotal = 0;

  // Pastron listat përpara se t'i krijojë përsëri
  materialsList.replaceChildren();
  summaryList.replaceChildren();

  service.materials.forEach((material) => {
    const amount = material.quantity * quantity;
    const cost = amount * material.price;
    materialsTotal += cost;

    // Rreshti i materialit në listën majtas
    const row = document.createElement("li");
    const name = document.createElement("span");
    const details = document.createElement("span");
    const price = document.createElement("strong");

    name.textContent = material.name;
    details.textContent =
      `${amount} ${material.unit} × ${formatPrice(material.price)} = `;
    price.textContent = formatPrice(cost);

    details.append(price);
    row.append(name, details);
    materialsList.append(row);

    // Rreshti i materialit në përmbledhjen djathtas
    const summaryRow = document.createElement("li");
    const summaryName = document.createElement("span");
    const summaryAmount = document.createElement("span");

    summaryName.textContent = material.name;
    summaryAmount.textContent = `${amount} ${material.unit}`;

    summaryRow.append(summaryName, summaryAmount);
    summaryList.append(summaryRow);
  });

  // Shton çmimin e punës
  const laborCost = service.labor * quantity;
  const laborRow = document.createElement("li");
  const laborName = document.createElement("span");
  const laborPrice = document.createElement("strong");

  laborName.textContent = "Puna e elektricistit";
  laborPrice.textContent = formatPrice(laborCost);

  laborRow.append(laborName, laborPrice);
  materialsList.append(laborRow);

  totalElement.textContent = formatPrice(materialsTotal + laborCost);

  // Përditëson kohëzgjatjen
  const totalMinutes = service.minutes * quantity;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const duration = [
    hours > 0 ? `${hours} orë` : "",
    minutes > 0 ? `${minutes} min` : ""
  ].filter(Boolean).join(" ");

  durationElement.textContent =
    `Kohëzgjatja e përafërt: ${duration}`;
}

minusButton.addEventListener("click", () => {
  quantityInput.value = Math.max(1, getQuantity() - 1);
  updateTotal();
});

plusButton.addEventListener("click", () => {
  quantityInput.value = Math.min(MAX_QUANTITY, getQuantity() + 1);
  updateTotal();
});

quantityInput.addEventListener("input", updateTotal);

quantityInput.addEventListener("change", () => {
  quantityInput.value = getQuantity();
  updateTotal();
});

updateTotal();
const nextButton = document.querySelector(".configure-next");

nextButton.addEventListener("click", () => {
  const request = {
    title: service.title,
    quantity: getQuantity(),
    unit: service.unit,
    total: totalElement.textContent,
    duration: durationElement.textContent
  };

  try {
    sessionStorage.setItem("serviceRequest", JSON.stringify(request));
  } catch {
    // Faqja vazhdon edhe nëse ruajtja nuk lejohet
  }
});