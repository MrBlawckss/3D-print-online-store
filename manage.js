(() => {
  const originalProducts = JSON.parse(JSON.stringify(window.STORE_PRODUCTS || []));
  const savedProducts = localStorage.getItem("neonlayer-draft-products");
  let products = savedProducts ? JSON.parse(savedProducts) : JSON.parse(JSON.stringify(originalProducts));
  const form = document.querySelector("#product-form");
  const list = document.querySelector("#manager-products");
  const count = document.querySelector("#manager-count");

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const save = () => localStorage.setItem("neonlayer-draft-products", JSON.stringify(products));

  function render() {
    count.textContent = `${products.length} ${products.length === 1 ? "product" : "products"} in this draft`;
    list.innerHTML = products.length ? products.map((product, index) => `
      <article class="manager-product">
        <img src="${escapeHtml(product.image)}" alt="" />
        <div><h3>${escapeHtml(product.name)}</h3><p>$${Number(product.price).toFixed(2)} · ${escapeHtml(product.category)}</p></div>
        <button class="remove-product" type="button" data-remove="${index}" aria-label="Remove ${escapeHtml(product.name)}">×</button>
      </article>`).join("") : "<p>No products in this draft yet.</p>";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    products.push({
      id: `${slugify(values.name)}-${Date.now().toString().slice(-5)}`,
      name: values.name.trim(),
      price: Number(values.price),
      category: values.category.trim(),
      description: values.description.trim(),
      image: values.image.trim(),
      imageAlt: values.imageAlt.trim(),
      badge: values.badge.trim(),
      checkoutUrl: values.checkoutUrl.trim()
    });
    save(); render(); form.reset();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove]");
    if (!button) return;
    products.splice(Number(button.dataset.remove), 1);
    save(); render();
  });

  document.querySelector("#restore-products").addEventListener("click", () => {
    products = JSON.parse(JSON.stringify(originalProducts));
    save(); render();
  });

  document.querySelector("#download-products").addEventListener("click", () => {
    const content = `window.STORE_PRODUCTS = ${JSON.stringify(products, null, 2)};\n`;
    const blob = new Blob([content], { type: "text/javascript" });
    const link = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "products.js" });
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  });

  render();
})();
