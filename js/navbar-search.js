(() => {
  const wrapper = document.querySelector(".navbar-search");
  if (!wrapper) return;

  const searchBox = wrapper.querySelector("#searchBox");
  const input = wrapper.querySelector("#navbar-search-input");
  const form = wrapper.querySelector("#navbar-search-form");
  const results = wrapper.querySelector("#navbar-search-results");

  const entries = [
    // Sherbimet
    {
      name: "Instalim Prizë e Re",
      type: "Shërbim",
      url: "konfiguro.html?sherbimi=prize"
    },
    {
      name: "Instalim Çelës Drite",
      type: "Shërbim",
      url: "konfiguro.html?sherbimi=celes"
    },
    {
      name: "Vendosje Kamera Sigurie",
      type: "Shërbim",
      url: "konfiguro.html?sherbimi=kamera"
    },
    {
      name: "Instalim Ndriçimi",
      type: "Shërbim",
      url: "konfiguro.html?sherbimi=ndricim"
    },
    {
      name: "Instalim Tabllo Elektrike",
      type: "Shërbim",
      url: "konfiguro.html?sherbimi=tabllo"
    },
    {
      name: "Instalim i Plotë Elektrik",
      type: "Shërbim",
      url: "konfiguro.html?sherbimi=instalim"
    },

    // Produktet
    {
      name: "Kabllo 3×2.5mm²",
      type: "Produkt",
      url: "dyqani.html#product-0"
    },
    {
      name: "Kabllo 3×1.5mm²",
      type: "Produkt",
      url: "dyqani.html#product-1"
    },
    {
      name: "Prizë standarde",
      type: "Produkt",
      url: "dyqani.html#product-2"
    },
    {
      name: "Çelës drite i thjeshtë",
      type: "Produkt",
      url: "dyqani.html#product-3"
    },
    {
      name: "Llambë LED 9W",
      type: "Produkt",
      url: "dyqani.html#product-4"
    },
    {
      name: "Llambadar LED i rrumbullakët",
      type: "Produkt",
      url: "dyqani.html#product-5"
    },
    {
      name: "Kamera sigurie WiFi",
      type: "Produkt",
      url: "dyqani.html#product-6"
    },
    {
      name: "Automat 16A",
      type: "Produkt",
      url: "dyqani.html#product-7"
    },
    {
      name: "Automat diferencial 25A",
      type: "Produkt",
      url: "dyqani.html#product-8"
    },
    {
      name: "Kanal kabllosh PVC",
      type: "Produkt",
      url: "dyqani.html#product-9"
    }
  ];

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function showResults() {
    const query = normalize(input.value);
    results.replaceChildren();

    // Kur hapet search-i bosh, shfaq te gjitha
    const matches = entries.filter(entry =>
      normalize(entry.name).includes(query)
    );

    if (matches.length === 0) {
      const message = document.createElement("p");
      message.textContent = "Nuk u gjet asnjë rezultat.";
      results.append(message);
    }

    matches.forEach(entry => {
      const link = document.createElement("a");
      link.href = entry.url;

      const name = document.createElement("span");
      name.textContent = entry.name;

      const type = document.createElement("small");
      type.textContent = entry.type;

      link.append(name, type);
      results.append(link);
    });

    results.hidden = false;
  }

  input.addEventListener("input", showResults);
  input.addEventListener("focus", showResults);

  searchBox.addEventListener("shown.bs.collapse", () => {
    input.focus();
    showResults();
  });

  searchBox.addEventListener("hide.bs.collapse", () => {
    results.hidden = true;
  });

  // Enter hap rezultatin e pare
  form.addEventListener("submit", event => {
    event.preventDefault();

    const firstResult = results.querySelector("a");

    if (firstResult) {
      window.location.href = firstResult.href;
    }
  });

  // Klikimi jashte dhe Escape mbyllin kerkimin
  function closeSearch() {
    results.hidden = true;
    bootstrap.Collapse.getOrCreateInstance(
      searchBox,
      { toggle: false }
    ).hide();
  }

  document.addEventListener("click", event => {
    if (!wrapper.contains(event.target)) {
      closeSearch();
    }
  });

  wrapper.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeSearch();
      wrapper.querySelector(".search-icon").focus();
    }
  });
})();