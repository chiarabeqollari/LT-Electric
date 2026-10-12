const portfolioFilters = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

portfolioFilters.forEach(button => {
  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );

  button.addEventListener("click", () => {
    const category = button.dataset.category;

    // Shenon kategorine e zgjedhur
    portfolioFilters.forEach(filter => {
      const isActive = filter === button;

      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    // Shfaq punimet e kategorise perkatese
    portfolioItems.forEach(item => {
      const matches =
        category === "all" ||
        item.dataset.category === category;

      item.classList.toggle("d-none", !matches);
    });
  });
});