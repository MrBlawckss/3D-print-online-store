(() => {
  const products = Array.isArray(window.STORE_PRODUCTS) ? window.STORE_PRODUCTS : [];
  const grid = document.querySelector("#product-grid");
  const filters = document.querySelector("#filters");
  const search = document.querySelector("#product-search");
  const resultCount = document.querySelector("#result-count");
  const emptyState = document.querySelector("#empty-state");
  const resetButton = document.querySelector("#reset-filters");
  const themeToggle = document.querySelector("#theme-toggle");
  const toast = document.querySelector("#toast");
  let activeCategory = "All";
  let toastTimer;

  const money = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });
  const clean = (value) => String(value ?? "").trim();
  const escapeHtml = (value) => clean(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const validCheckout = (url) => /^https:\/\/(buy\.stripe\.com|checkout\.stripe\.com)\//i.test(clean(url));

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  function renderFilters() {
    const categories = ["All", ...new Set(products.map((product) => clean(product.category)).filter(Boolean))];
    filters.innerHTML = categories.map((category) => `<button class="filter${category === activeCategory ? " active" : ""}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("");
  }

  function productCard(product) {
    const canBuy = validCheckout(product.checkoutUrl);
    const badge = clean(product.badge) ? `<span class="badge">${escapeHtml(product.badge)}</span>` : "";
    const button = canBuy
      ? `<a class="button button-primary buy-button" href="${escapeHtml(product.checkoutUrl)}" target="_blank" rel="noopener">Buy now <span aria-hidden="true">↗</span></a>`
      : `<button class="button button-secondary buy-button setup-button" type="button" aria-disabled="true" title="Add a Stripe Payment Link in products.js">Coming soon</button>`;
    return `
      <article class="product-card">
        <div class="product-image">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt || product.name)}" loading="lazy" />
          ${badge}
        </div>
        <div class="product-body">
          <div class="product-meta">
            <h3>${escapeHtml(product.name)}</h3>
            <span class="price">${money.format(Number(product.price) || 0)}</span>
          </div>
          <p>${escapeHtml(product.description)}</p>
          <div class="product-actions">
            <span class="category-label">${escapeHtml(product.category)}</span>
            ${button}
          </div>
        </div>
      </article>`;
  }

  function renderProducts() {
    const query = clean(search.value).toLowerCase();
    const visible = products.filter((product) => {
      const categoryMatches = activeCategory === "All" || product.category === activeCategory;
      const text = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return categoryMatches && text.includes(query);
    });
    grid.innerHTML = visible.map(productCard).join("");
    resultCount.textContent = `${visible.length} ${visible.length === 1 ? "print" : "prints"}`;
    emptyState.hidden = visible.length !== 0;
    grid.hidden = visible.length === 0;
  }

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderFilters();
    renderProducts();
  });

  grid.addEventListener("click", (event) => {
    if (event.target.closest(".setup-button")) showToast("Add your Stripe Payment Link in products.js to activate checkout.");
  });

  search.addEventListener("input", renderProducts);
  resetButton.addEventListener("click", () => { activeCategory = "All"; search.value = ""; renderFilters(); renderProducts(); });
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("neonlayer-theme", next);
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
  renderFilters();
  renderProducts();
})();
