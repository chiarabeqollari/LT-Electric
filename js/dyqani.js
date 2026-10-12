// ===== KERKIMI DHE KATEGORITE =====

const productSearch = document.querySelector("#product-search");
const shopFilters = document.querySelectorAll(".shop-filter");
const shopItems = document.querySelectorAll(".shop-item");

let selectedCategory = "all";

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function filterProducts() {
  const searchText = normalizeText(productSearch.value);

  shopItems.forEach(item => {
    const title = normalizeText(item.querySelector("h2").textContent);

    const matchesSearch = title.includes(searchText);
    const matchesCategory =
      selectedCategory === "all" ||
      item.dataset.category === selectedCategory;

    item.classList.toggle(
      "d-none",
      !matchesSearch || !matchesCategory
    );
  });
}

productSearch.addEventListener("input", filterProducts);

shopFilters.forEach(button => {
  button.setAttribute(
    "aria-pressed",
    String(button.dataset.category === selectedCategory)
  );

  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    shopFilters.forEach(filter => {
      const isActive = filter === button;

      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    filterProducts();
  });
});

filterProducts();


// ===== FUNKSIONE NDIHMESE =====

function formatPrice(value) {
  return `${value.toLocaleString("en-US")} lekë`;
}

const MAX_QUANTITY = 999;

function getQuantity(input) {
  const value = Number(input.value);

  return Number.isFinite(value)
    ? Math.min(MAX_QUANTITY, Math.max(1, Math.floor(value)))
    : 1;
}


// ===== PRODUKTET =====

// Lexon emrin dhe cmimin nga cdo karte
const products = Array.from(shopItems, (item, index) => ({
  id: index,
  name: item.querySelector("h2").textContent.trim(),
  price: Number(
    item.querySelector(".product-price").textContent
      .replace(/[^\d]/g, "")
  )
}));


// ===== SHPORTA =====

const cartItems = document.querySelector(".shop-cart-items");
const cartTotal = document.querySelector(
  ".shop-cart-total strong:last-child"
);
const checkoutButton = document.querySelector(".shop-cart-checkout");
const cartElement = document.querySelector("#shopCart");

let cart = [];

// Lexon shporten e ruajtur dhe kontrollon te dhenat
try {
  const savedCart = JSON.parse(localStorage.getItem("shopCart"));

  if (Array.isArray(savedCart)) {
    savedCart.forEach(savedItem => {
      if (!savedItem || typeof savedItem !== "object") return;

      const product = products.find(product =>
        product.id === savedItem.id &&
        product.name === savedItem.name
      );

      const quantity = Number(savedItem.quantity);

      if (
        product &&
        Number.isSafeInteger(quantity) &&
        quantity > 0
      ) {
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.push({ ...product, quantity });
        }
      }
    });
  }
} catch {
  cart = [];
}

function saveCart() {
  try {
    localStorage.setItem("shopCart", JSON.stringify(cart));
  } catch {
    // Shporta vazhdon te punoje nese ruajtja nuk lejohet
  }
}

function renderCart() {
  cartItems.replaceChildren();
  let total = 0;

  if (cart.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Shporta është bosh.";
    cartItems.append(emptyMessage);
  }

  cart.forEach(product => {
    const subtotal = product.price * product.quantity;
    total += subtotal;

    const row = document.createElement("div");
    row.className = "mb-3";

    const description = document.createElement("p");
    description.className = "mb-2";
    description.textContent =
      `${product.name} — ${product.quantity} × ` +
      `${formatPrice(product.price)} = ${formatPrice(subtotal)}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "btn btn-sm btn-outline-danger";
    removeButton.textContent = "Hiq";
    removeButton.setAttribute(
      "aria-label",
      `Hiq ${product.name} nga shporta`
    );

    removeButton.addEventListener("click", () => {
      cart = cart.filter(item => item.id !== product.id);
      renderCart();
    });

    row.append(description, removeButton);
    cartItems.append(row);
  });

  cartTotal.textContent = formatPrice(total);
  checkoutButton.disabled = cart.length === 0;

  const cartCount = document.querySelector("#cart-count");

  if (cartCount) {
    cartCount.textContent = cart.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  }

  saveCart();
}


// ===== SASIA DHE SHTIMI NE SHPORTE =====

shopItems.forEach((item, index) => {
  const picker = item.querySelector(".quantity-picker");
  const input = picker.querySelector("input");
  const minusButton = picker.querySelector("button:first-child");
  const plusButton = picker.querySelector("button:last-child");
  const addButton = item.querySelector(".add-to-cart");

  input.step = "1";

  minusButton.addEventListener("click", () => {
    input.value = Math.max(1, getQuantity(input) - 1);
  });

  plusButton.addEventListener("click", () => {
    input.value = Math.min(MAX_QUANTITY, getQuantity(input) + 1);
  });

  input.addEventListener("change", () => {
    input.value = getQuantity(input);
  });

  addButton.addEventListener("click", () => {
    const quantity = getQuantity(input);
    input.value = quantity;

    const product = products[index];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity = Math.min(
        MAX_QUANTITY,
        existingProduct.quantity + quantity
      );
    } else {
      cart.push({ ...product, quantity });
    }

    renderCart();

    bootstrap.Offcanvas.getOrCreateInstance(cartElement).show();
  });
});


// ===== PERFUNDIMI I POROSISE =====

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) return;

  alert(
    "Porosia u përgatit. Ky është një demonstrim; " +
    "porosia nuk është dërguar."
  );
});


// Shfaq shporten kur hapet faqja
renderCart();

shopItems.forEach((item, index) => {
  item.id = `product-${index}`;
});

function scrollToProduct() {
  const target = document.getElementById(
    window.location.hash.slice(1)
  );

  if (target && target.classList.contains("shop-item")) {
    productSearch.value = "";

    document.querySelector(
      '.shop-filter[data-category="all"]'
    ).click();

    target.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}

window.addEventListener("hashchange", scrollToProduct);
scrollToProduct();