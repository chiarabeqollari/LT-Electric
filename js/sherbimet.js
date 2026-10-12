const searchInput = document.querySelector("#service-search");
const filterButtons = document.querySelectorAll(".service-filter");
const serviceItems = document.querySelectorAll(".service-item");

let selectedCategory = "all";

// Lejon kerkimin edhe pa ë ose ç
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Shfaq kartat qe perputhen me kerkimin dhe kategorine
function filterServices() {
  const searchText = normalizeText(searchInput.value);

  serviceItems.forEach((item) => {
    const cardText = normalizeText(
      item.querySelector(".service-card").textContent
    );

    const matchesSearch = cardText.includes(searchText);
    const matchesCategory =
      selectedCategory === "all" ||
      item.dataset.category === selectedCategory;

    item.classList.toggle(
      "d-none",
      !matchesSearch || !matchesCategory
    );
  });
}

// Perditeson rezultatet sa here shkruan
searchInput.addEventListener("input", filterServices);

// Ndryshon kategorine dhe butonin aktiv
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    filterButtons.forEach((filter) => {
      const isSelected = filter === button;
      filter.classList.toggle("active", isSelected);
      filter.setAttribute("aria-pressed", String(isSelected));
    });

    filterServices();
  });

  button.setAttribute(
    "aria-pressed",
    String(button.dataset.category === selectedCategory)
  );
});

filterServices();