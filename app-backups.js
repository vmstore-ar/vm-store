let selectedImage = "";

let currency =
  localStorage.getItem("currency")
  || "USD";

const exchangeRate = 1300;

let currentCategory = "iphones";
let editingProductId = null;
let favorites =
  JSON.parse(localStorage.getItem("favorites"))
  || [];


let products =
  JSON.parse(localStorage.getItem("products"))
  || {

  iphones: [

    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "iphones",
      description: "256GB • Titanio • Batería 100%",
      fullDescription:
        "Equipo original, libre de fábrica, batería al 100%, excelente rendimiento y cámaras profesionales.",
      price: 1100,
      oldPrice: 1250,
      installments: "12 cuotas",
      stock: 5,
      badge: "DESTACADO",
      image: "imagenes/iphone15.jpg"
    },

    {
      id: 2,
      name: "iPhone 14 Pro Max",
      category: "iphones",
      description: "256GB • Negro Espacial",
      fullDescription:
        "Pantalla Super Retina XDR, cámaras avanzadas y batería excelente.",
      price: 980,
      oldPrice: 1100,
      installments: "9 cuotas",
      stock: 10,
      badge: "OFERTA",
      image: "imagenes/iphone14.jpg"
    },

    {
      id: 3,
      name: "iPhone 13",
      category: "iphones",
      description: "128GB • Blue",
      fullDescription:
        "Gran rendimiento, cámaras duales y batería duradera.",
      price: 700,
      oldPrice: 780,
      installments: "6 cuotas",
      stock: 10,
      badge: "HOT",
      image: "imagenes/iphone13.jpg"
    }

  ],

  componentes: [

    {
      id: 4,
      name: "RTX 4060",
      category: "componentes",
      description: "8GB GDDR6 • DLSS 3",
      fullDescription:
        "Ideal para gaming competitivo y edición profesional.",
      price: 350,
      oldPrice: 420,
      installments: "12 cuotas",
      stock: 8,
      badge: "OFERTA",
      image: "imagenes/rtx4060.jpg"
    },

    {
      id: 5,
      name: "Ryzen 7 7800X3D",
      category: "componentes",
      description: "8 núcleos • Gaming CPU",
      fullDescription:
        "Procesador premium para gaming extremo y multitarea.",
      price: 520,
      oldPrice: 580,
      installments: "9 cuotas",
      stock: 4,
      badge: "TOP",
      image: "imagenes/ryzen7.jpg"
    }

  ],

  notebooks: [

    {
      id: 6,
      name: "ASUS TUF Gaming",
      category: "notebooks",
      description: "Intel i7 • RTX 4060 • 16GB",
      fullDescription:
        "Notebook gamer potente con pantalla de alta tasa de refresco.",
      price: 1400,
      oldPrice: 1600,
      installments: "12 cuotas",
      stock: 2,
      badge: "TOP",
      image: "imagenes/notebook.jpg"
    },

    {
      id: 7,
      name: "MacBook Air M2",
      category: "notebooks",
      description: "13” • 256GB • 8GB RAM",
      fullDescription:
        "Ligera, rápida y perfecta para productividad profesional.",
      price: 1350,
      oldPrice: 1490,
      installments: "12 cuotas",
      stock: 6,
      badge: "APPLE",
      image: "imagenes/macbook.jpg"
    }

  ],

  pcs: [],

perifericos: [],

};

function renderProducts(category = "iphones") {

  currentCategory = category;

  const container =
    document.getElementById("productsContainer");

  container.innerHTML = "";



  const list = products[category] || [];

  const resultsCount =
  document.getElementById("resultsCount");

if(resultsCount) {

  resultsCount.innerText =
    `${list.length} productos disponibles`;

}

  list.forEach(product => {

    container.innerHTML += `
      <div
        class="product-card"
        onclick="openProductModal(${product.id})"
      >

        <div
          class="favorite-btn ${
            favorites.includes(product.name)
              ? "active"
              : ""
          }"
          onclick="toggleFavorite(event, '${product.name}')"
        >
          ❤
        </div>

        <div class="badge">
  ${product.badge}
</div>

${isAdmin ? `
  <button
    class="delete-product-btn"
    onclick="deleteProduct(event, ${product.id})"
  >
    🗑
  </button>

  <button
    class="edit-product-btn"
    onclick="editProduct(event, ${product.id})"
  >
    ✏️
  </button>
` : ""}

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="product-info">

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.description}
          </p>

          <div class="stock-status ${
  product.stock <= 0
    ? "out"
    : product.stock <= 3
    ? "low"
    : "ok"
}">
  ${
    product.stock <= 0
      ? "Sin stock"
      : product.stock <= 3
      ? `Últimas ${product.stock} unidades`
      : `Stock disponible (${product.stock})`
  }
</div>

          <div class="price">

            <div>

              <small
                style="
                  text-decoration: line-through;
                  color: #94a3b8;
                  display:block;
                "
              >
                USD ${product.oldPrice}
              </small>

              <span>
                ${formatPrice(product.price)}
              </span>

            </div>

            ${product.stock > 0 ? `

<button
  class="buy-btn"
  onclick="event.stopPropagation(); addToCartFromData(
    '${product.name}',
    ${product.price},
    '${product.image}'
  )"
>
  Agregar
</button>

` : `

<button
  class="buy-btn out-stock"
  disabled
>
  Sin stock
</button>

`}

          </div>

        </div>

      </div>
    `;

  });

  initLucideIcons();

}

function searchProducts() {

  const input =
    document.getElementById("searchInput").value.toLowerCase().trim();

  let allProducts = [];

  Object.values(products).forEach(category => {
    allProducts = allProducts.concat(category);
  });

  const filtered = allProducts.filter(product => {

    return (
      product.name.toLowerCase().includes(input) ||
      product.description.toLowerCase().includes(input) ||
      product.category.toLowerCase().includes(input) ||
      product.badge.toLowerCase().includes(input)
    );

  });

  if(input === "") {
    renderProducts(currentCategory);
  } else {
    renderFilteredProducts(filtered);
  }

}

function applyFilters() {

  const category =
    document.getElementById("categoryFilter").value;

  const sort =
    document.getElementById("sortFilter").value;

    const minPrice =
  Number(document.getElementById("minPrice").value) || 0;

const maxPrice =
  Number(document.getElementById("maxPrice").value) || Infinity;

  let filteredProducts = [];

  if(category === "all") {

    Object.keys(products).forEach(categoryName => {

  if(categoryName !== "iphones") {

    filteredProducts =
      filteredProducts.concat(products[categoryName]);

  }

});

  } else {

    filteredProducts = products[category];

  }

  if(sort === "low") {

    filteredProducts.sort((a, b) =>
      a.price - b.price
    );

  }

  if(sort === "high") {

    filteredProducts.sort((a, b) =>
      b.price - a.price
    );

  }

  filteredProducts = filteredProducts.filter(product => {

  return (
    product.price >= minPrice &&
    product.price <= maxPrice
  );

});

  renderFilteredProducts(filteredProducts);

}

function renderFilteredProducts(list) {

  const container =
    document.getElementById("productsContainer");

  container.innerHTML = "";

  const resultsCount =
  document.getElementById("resultsCount");

if(resultsCount) {

  resultsCount.innerText =
    `${list.length} productos encontrados`;

}

  if(list.length === 0) {

    container.innerHTML = `

      <div class="empty-search">

        <h3>
          🔍 No encontramos productos
        </h3>

        <p>
          Probá con otro nombre o categoría.
        </p>

      </div>

    `;

    return;

    initLucideIcons();

  }

  list.forEach(product => {

    container.innerHTML += `
      <div
        class="product-card"
        onclick="openProductModal(${product.id})"
      >

        <div class="favorite-btn ${
          favorites.includes(product.name)
            ? "active"
            : ""
        }"
        onclick="toggleFavorite(event, '${product.name}')"
        >
          ❤
        </div>

        <div class="badge">
          ${product.badge}
        </div>

        ${isAdmin ? `

          <button
            class="delete-product-btn"
            onclick="deleteProduct(event, ${product.id})"
          >
            🗑
          </button>

          <button
            class="edit-product-btn"
            onclick="editProduct(event, ${product.id})"
          >
            ✏️
          </button>

        ` : ""}

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>${product.description}</p>
          <div class="stock-status ${
  product.stock <= 0
    ? "out"
    : product.stock <= 3
    ? "low"
    : "ok"
}">
  ${
    product.stock <= 0
      ? "Sin stock"
      : product.stock <= 3
      ? `Últimas ${product.stock} unidades`
      : `Stock disponible (${product.stock})`
  }
</div>

          <div class="price">

            <span>
              ${formatPrice(product.price)}
            </span>

            ${product.stock > 0 ? `

              <button
                class="buy-btn"
                onclick="event.stopPropagation(); addToCartFromData(
                  '${product.name}',
                  ${product.price},
                  '${product.image}'
                )"
              >
                Agregar
              </button>

            ` : `

              <button
                class="buy-btn out-stock"
                disabled
              >
                Sin stock
              </button>

            `}

          </div>

        </div>

      </div>
    `;

  });

}

function updateTotal() {

  const fields = [
  'cpu',
  'gpu',
  'ram',
  'storage',
  'case',
  'psu',
  'motherboard',
  'cooler',
  'monitor',
  'peripherals'
];

  let total = 0;

  fields.forEach(field => {

    const select =
      document.getElementById(field);

    const value = Number(select.value);

    total += value;

    const selectedText =
      select.options[select.selectedIndex].text;

    document.getElementById(field + 'Text').innerText =
      value > 0
        ? selectedText.split(' - ')[0]
        : '-';

  });

  document.getElementById("total").innerText =
  formatPrice(total);

    updateBuilderImage();
checkCompatibility();

let level = "Básico";
let usage = "Oficina";

const gpu =
  document.getElementById("gpu").value;

const cpu =
  document.getElementById("cpu").value;

if(gpu.includes("4060") || cpu.includes("Ryzen 7")) {

  level = "Alto";

  usage = "Gaming";

}

if(gpu.includes("4070") || gpu.includes("4080")) {

  level = "Extremo";

  usage = "Gaming / Streaming";

}

if(gpu.includes("4090")) {

  level = "Ultra Enthusiast";

  usage = "4K / IA / Profesional";

}

document.getElementById("performanceLevel")
  .innerText = level;

document.getElementById("usageLevel")
  .innerText = usage;

}

let cart =
  JSON.parse(localStorage.getItem("cart")) || [];

  function checkCompatibility() {

  const messages = [];

  const cpu =
    document.getElementById("cpu").value;

  const gpu =
    document.getElementById("gpu").value;

  const psu =
    document.getElementById("psu").value;

  const cooler =
    document.getElementById("cooler").value;

  /* PSU */

  if(Number(gpu) >= 850 && Number(psu) < 140) {

    messages.push(`
      <p class="compatibility-error">
        ❌ Fuente insuficiente para GPU de alta gama
      </p>
    `);

  }

  /* COOLER */

  if(Number(cpu) >= 420 && Number(cooler) < 95) {

    messages.push(`
      <p class="compatibility-warning">
        ⚠️ Recomendamos mejor refrigeración para este procesador
      </p>
    `);

  }

  /* TODO OK */

  if(messages.length === 0) {

    messages.push(`
      <p class="compatibility-ok">
        ✅ Configuración compatible
      </p>
    `);

  }

  document.getElementById(
    "compatibilityMessages"
  ).innerHTML = messages.join("");

}

function addToCartFromData(name, price, image) {

  let allProducts = [];

Object.values(products).forEach(category => {
  allProducts = allProducts.concat(category);
});

const currentProduct =
  allProducts.find(product => product.name === name);

if(currentProduct && currentProduct.stock <= 0) {

  showToast("Producto sin stock");

  return;
}

  const existingProduct =
    cart.find(item => item.name === name);

  if (existingProduct) {

    existingProduct.quantity++;

  } else {

    cart.push({
      name: name,
      price: price,
      quantity: 1,
      image: image
    });

  }

  updateCart();

  showToast("Producto agregado al carrito");

  document
    .getElementById("cartPanel")
    .classList.add("active");

}

function updateCart() {

  document.getElementById("cart-count").innerText =
    cart.reduce((acc, item) => acc + item.quantity, 0);

  let cartItems =
    document.getElementById("cart-items");

  let total = 0;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    cartItems.innerHTML += `

      <div class="cart-item">

        <div class="cart-product-info">

          <img
            src="${item.image}"
            class="cart-product-image"
          >

          <div>

            <strong>${item.name}</strong>

            <p>USD ${item.price}</p>

            <div class="quantity-controls">

              <button onclick="decreaseQuantity(${index})">
                −
              </button>

              <span>${item.quantity}</span>

              <button onclick="increaseQuantity(${index})">
                +
              </button>

            </div>

          </div>

        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${index})"
        >
          ✕
        </button>

      </div>

    `;

  });

  document.getElementById("cart-total").innerText =
    `Total: USD ${total}`;

  let message =
    "Hola! Quiero comprar:%0A%0A";

  cart.forEach(item => {

    message +=
      `• ${item.name} x${item.quantity} - USD ${item.price}%0A`;

  });

  message += `%0ATotal: USD ${total}`;

  document.getElementById("checkoutBtn").href =
    `https://wa.me/541165937718?text=${message}`;

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
  initLucideIcons();

}

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();

}

function clearCart() {

  const confirmClear =
    confirm("¿Vaciar carrito completo?");

  if(!confirmClear) return;

  cart = [];

  updateCart();

  showToast("Carrito vaciado");

}

function increaseQuantity(index) {

  cart[index].quantity++;

  updateCart();

}

function decreaseQuantity(index) {

  if (cart[index].quantity > 1) {

    cart[index].quantity--;

  } else {

    cart.splice(index, 1);

  }

  updateCart();

}

function toggleCart() {

  document
    .getElementById("cartPanel")
    .classList.toggle("active");

}

const menuToggle =
  document.getElementById("menuToggle");

const navMenu =
  document.getElementById("navMenu");

if(menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

  });

}

function openProductModal(productId) {

  let allProducts = [];

  Object.values(products).forEach(category => {

    allProducts =
      allProducts.concat(category);

  });

  const product =
    allProducts.find(p => p.id === productId);

  if(!product) return;

  document.getElementById("modalTitle").innerText =
    product.name;

  document.getElementById("modalDescription").innerText =
    product.fullDescription;

  document.getElementById("modalPrice").innerHTML =
    `
      <small
        style="
          display:block;
          font-size:1.2rem;
          text-decoration:line-through;
          color:#94a3b8;
          margin-bottom:5px;
        "
      >
        USD ${product.oldPrice}
      </small>

      ${formatPrice(product.price)}
    `;

  document.getElementById("modalImage").src =
    product.image;

  document.getElementById("modalBadge").innerText =
    product.badge;

  document.getElementById("modalExtra").innerHTML =
    `
      <p>
        💳 ${product.installments}
      </p>

      <p>
        📦 Stock disponible:
        ${product.stock}
      </p>
    `;

  const addBtn =
    document.getElementById("modalAddBtn");

  addBtn.onclick = () => {

    addToCartFromData(
      product.name,
      product.price,
      product.image
    );

  };

  document
    .getElementById("productModal")
    .classList.add("active");

}

function closeProductModal() {

  document
    .getElementById("productModal")
    .classList.remove("active");

}

const slides =
  document.getElementById("slides");

if(slides) {

  let currentSlide = 0;

  function autoSlide() {

    currentSlide++;

    if(currentSlide > 2) {

      currentSlide = 0;

    }

    slides.style.transform =
      `translateX(-${currentSlide * 100}%)`;

  }

  setInterval(autoSlide, 4000);

}



function renderFavorites() {

  const container =
    document.getElementById("favoritesContainer");

  if (!container) return;

  container.innerHTML = "";

  let allProducts = [];

  Object.values(products).forEach(category => {

    allProducts =
      allProducts.concat(category);

  });

  const favProducts =
    allProducts.filter(product =>
      favorites.includes(product.name)
    );

  favProducts.forEach(product => {

    container.innerHTML += `
      <div
        class="product-card"
        onclick="openProductModal(${product.id})"
      >

        <div
          class="favorite-btn active"
          onclick="toggleFavorite(event, '${product.name}')"
        >
          ❤
        </div>

        <div class="badge">
          ${product.badge}
        </div>

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>
            ${product.description}
          </p>

          <div class="price">

            <span>
              ${formatPrice(product.price)}
            </span>

            <button
              class="buy-btn"
              onclick="event.stopPropagation(); addToCartFromData(
                '${product.name}',
                ${product.price},
                '${product.image}'
              )"
            >
              Agregar
            </button>

          </div>

        </div>

      </div>
    `;

  });

}
function toggleFavorite(event, productName) {

  event.stopPropagation();

  if (favorites.includes(productName)) {
    favorites = favorites.filter(item => item !== productName);
  } else {
    favorites.push(productName);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  renderProducts(currentCategory);      // 🔥 refresca productos
  renderFavorites();     // 🔥 refresca favoritos
}

function showToast(message) {

  const toast =
    document.getElementById("toast");

  const toastText =
    document.getElementById("toastText");

  toastText.innerText = message;

  toast.classList.add("active");

  setTimeout(() => {

    toast.classList.remove("active");

  }, 2500);

}

/* =========================
   DARK MODE
========================= */

function toggleTheme() {

  document.body.classList.toggle("light-mode");

  const isLight =
    document.body.classList.contains("light-mode");

  localStorage.setItem(
    "theme",
    isLight ? "light" : "dark"
  );

  const themeBtn =
    document.querySelector(".theme-toggle");

  if(themeBtn) {
    themeBtn.innerText = isLight ? "☀️" : "🌙";
  }

}

/* GUARDAR TEMA */

window.addEventListener("DOMContentLoaded", () => {

  const savedTheme =
    localStorage.getItem("theme");

  if(savedTheme === "light") {

    document.body.classList.add("light-mode");

  }

  const themeBtn =
    document.querySelector(".theme-toggle");

  if(themeBtn) {

    themeBtn.innerText =
      document.body.classList.contains("light-mode")
        ? "☀️"
        : "🌙";

  }

});

/* =========================
   SMART NAVBAR
========================= */

window.addEventListener("scroll", () => {

  const header =
    document.querySelector("header");

  if(window.scrollY > 40) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

});

renderFavorites();

/* =========================
   IMAGE PREVIEW
========================= */

const adminImageInput = document.getElementById("adminImage");

if(adminImageInput) {

  adminImageInput.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {

      selectedImage = e.target.result;

      const preview = document.getElementById("imagePreview");

      if(preview) {
        preview.src = selectedImage;
        preview.style.display = "block";
      }

    };

    reader.readAsDataURL(file);

  });

}

/* =========================
   ADMIN PANEL
========================= */

function addNewProduct() {

  const name = document.getElementById("adminName").value;
  const description = document.getElementById("adminDescription").value;
  const price = Number(document.getElementById("adminPrice").value);
  const category = document.getElementById("adminCategory").value;
  const imageUrl = document.getElementById("adminImageUrl").value;

  let productToSave = null;

  if(!name || !description || !price) {
    showToast("Completá todos los campos");
    return;
  }

  if(!editingProductId && !selectedImage && !imageUrl) {
    showToast("Seleccioná una imagen");
    return;
  }

  if(editingProductId) {

    Object.keys(products).forEach(cat => {
      products[cat] = products[cat].map(product => {
        if(product.id === editingProductId) {

          productToSave = {
            ...product,
            name: name,
            description: description,
            price: price,
            image: selectedImage || imageUrl || product.image
          };

          return productToSave;
        }

        return product;
      });
    });

    showToast("Producto actualizado");

  } else {

    productToSave = {
      id: Date.now(),
      name: name,
      category: category,
      description: description,
      fullDescription: description,
      price: price,
      oldPrice: price,
      installments: "Consultar",
      stock: 10,
      badge: "NUEVO",
      image: selectedImage || imageUrl
    };

    products[category].push(productToSave);

    showToast("Producto agregado");
  }

  localStorage.setItem("products", JSON.stringify(products));

  if(window.saveProductToFirebase && productToSave) {
    saveProductToFirebase(productToSave);
  }

  editingProductId = null;
  selectedImage = "";

  document.getElementById("adminName").value = "";
  document.getElementById("adminDescription").value = "";
  document.getElementById("adminPrice").value = "";
  document.getElementById("adminImage").value = "";
  document.getElementById("imagePreview").style.display = "none";
  document.getElementById("adminImageUrl").value = "";

  document.getElementById("adminSubmitBtn").innerText =
    "Agregar Producto";

  renderProducts(currentCategory);
  renderAdminProducts();
  renderFavorites();
}

  /* =========================
   DELETE PRODUCT
========================= */

function deleteProduct(event, productId) {

  event.stopPropagation();

  const confirmDelete =
    confirm("¿Eliminar producto?");

  if(!confirmDelete) return;

  Object.keys(products).forEach(category => {

    products[category] =
      products[category].filter(product =>
        product.id !== productId
      );

  });

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );

  renderProducts(currentCategory);

  renderFavorites();

  showToast("Producto eliminado");

}

/* =========================
   EDIT PRODUCT
========================= */

function editProduct(event, productId) {

  event.stopPropagation();

  let productToEdit = null;

  Object.keys(products).forEach(category => {

    products[category].forEach(product => {

      if(product.id === productId) {

        productToEdit = product;

      }

    });

  });

  if(!productToEdit) return;

  editingProductId = productId;

  document.getElementById("adminSubmitBtn").innerText =
  "Guardar cambios";

  document.getElementById("adminName").value =
    productToEdit.name;

  document.getElementById("adminDescription").value =
    productToEdit.description;

  document.getElementById("adminPrice").value =
    productToEdit.price;

  showToast("Editando producto");

  window.scrollTo({
    top: document.querySelector(".admin-panel").offsetTop - 80,
    behavior: "smooth"
  });

}

/* =========================
   ADMIN PRODUCTS RENDER
========================= */

function renderAdminProducts() {

  const container =
    document.getElementById("adminProductsList");

  if(!container) return;

  container.innerHTML = "";

  let allProducts = [];

  Object.values(products).forEach(category => {

    allProducts =
      allProducts.concat(category);

  });

  allProducts.forEach(product => {

    container.innerHTML += `

      <div class="admin-product-card">

        <img src="${product.image}">

        <div class="admin-product-info">

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.description}
          </p>

          <div class="admin-product-price">
            ${formatPrice(product.price)}
          </div>

          <div class="admin-product-actions">

            <button
              class="btn btn-primary"
              onclick="editProduct(event, ${product.id})"
            >
              Editar
            </button>

            <button
              class="btn"
              style="background:#ef4444;color:white;"
              onclick="deleteProduct(event, ${product.id})"
            >
              Eliminar
            </button>

          </div>

        </div>

      </div>

    `;

  });

}

/* =========================
   LOGIN ADMIN
========================= */

let isAdmin =
  localStorage.getItem("isAdmin") === "true";

  updateAdminVisibility();

function openLoginModal() {

  document
    .getElementById("loginModal")
    .classList.add("active");

}

function updateAdminVisibility() {

  const adminPanel =
    document.querySelector(".admin-panel");

  if(!adminPanel) return;

  if(isAdmin) {

    adminPanel.style.display = "block";

  } else {

    adminPanel.style.display = "none";

  }

}

function closeLoginModal() {

  document
    .getElementById("loginModal")
    .classList.remove("active");

}

function loginAdmin() {

  const password =
    document.getElementById("adminPassword").value;

  if(password === "1234") {

    isAdmin = true;

    localStorage.setItem("isAdmin", "true");

    updateAdminVisibility();

    renderProducts(currentCategory);

    renderAdminProducts();

    updateAdminButtons();

    updateAdminButton();

    closeLoginModal();

    showToast("Bienvenido administrador");
    openAdminPanel();

  } else {

    showToast("Contraseña incorrecta");

  }

}

function logoutAdmin() {

  isAdmin = false;

  localStorage.removeItem("isAdmin");

  closeAdminPanel();

  updateAdminVisibility();

  renderProducts(currentCategory);

  renderAdminProducts();

  updateAdminButtons();

  updateAdminButton();

  showToast("Sesión cerrada");

}

function openAdminPanel() {

  const adminModal =
    document.getElementById("adminModal");

  const adminPanel =
    adminModal
      ? adminModal.querySelector(".admin-panel")
      : null;

  if(adminModal) {

    adminModal.classList.add("active");

    if(adminPanel) {
      adminPanel.style.display = "block";
    }

    renderAdminProducts();

  } else {

    window.location.href = "tienda.html";

  }

}

function closeAdminPanel() {

  const adminModal =
    document.getElementById("adminModal");

  if(adminModal) {
    adminModal.classList.remove("active");
  }

}

function handleAdminAccess() {

  if(isAdmin) {
    openAdminPanel();
  } else {
    openLoginModal();
  }

}

function updateAdminButton() {

  const adminBtn =
    document.getElementById("adminAccessBtn");

  const panelBtn =
    document.getElementById("openAdminPanelBtn");

  if(isAdmin) {

    adminBtn.innerText = "🚪 Salir";

    adminBtn.onclick = logoutAdmin;

    if(panelBtn) {
      panelBtn.style.display = "inline-block";
    }

  } else {

    adminBtn.innerText = "🔐 Admin";

    adminBtn.onclick = openLoginModal;

    if(panelBtn) {
      panelBtn.style.display = "none";
    }

  }

}

function updateAdminButtons() {

  const deleteButtons =
    document.querySelectorAll(".delete-product-btn");

  const editButtons =
    document.querySelectorAll(".edit-product-btn");

  deleteButtons.forEach(button => {

    button.style.display =
      isAdmin
        ? "flex"
        : "none";

  });

  editButtons.forEach(button => {

    button.style.display =
      isAdmin
        ? "flex"
        : "none";

  });

}

updateAdminButtons();

updateAdminButton();

function getBuilderData() {

  const fields = [
    { id: "cpu", label: "Procesador" },
    { id: "gpu", label: "Placa de video" },
    { id: "ram", label: "Memoria RAM" },
    { id: "storage", label: "Almacenamiento" },
    { id: "case", label: "Gabinete" },
    { id: "psu", label: "Fuente" }
  ];

  let items = [];
  let total = 0;

  fields.forEach(field => {

    const select = document.getElementById(field);

    const value = Number(select.value);

    const text = select.options[select.selectedIndex].text;

    if(value > 0) {

      items.push({
        label: field.label,
        name: text.split(" - ")[0],
        price: value
      });

      total += value;

    }

  });

  return {
    items,
    total
  };

}

function finishPcOrder() {

  const budget = getBuilderData();

  if(budget.items.length === 0) {
    showToast("Seleccioná al menos un componente");
    return;
  }

  let message = "Hola! Quiero finalizar este pedido:%0A%0A";

  budget.items.forEach(item => {
    message += `• ${item.label}: ${item.name} - USD ${item.price}%0A`;
  });

  message += `%0ATotal estimado: USD ${budget.total}`;

  window.open(
    `https://wa.me/541165937718?text=${message}`,
    "_blank"
  );

}

function printBudget() {

  const budget = getBuilderData();

  if(budget.items.length === 0) {
    showToast("Seleccioná al menos un componente");
    return;
  }

  const date = new Date().toLocaleDateString("es-AR");

  let rows = "";

  budget.items.forEach(item => {

    rows += `
      <tr>
        <td>${item.label}</td>
        <td>${item.name}</td>
        <td>${formatPrice(item.price)}</td>
      </tr>
    `;

  });

  const budgetWindow = window.open("", "_blank");

  budgetWindow.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Presupuesto VM Store</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #0f172a;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 35px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo img {
          width: 80px;
          height: auto;
        }

        .logo h1 {
          margin: 0;
          color: #2563eb;
        }

        .info {
          text-align: right;
          font-size: 14px;
        }

        h2 {
          margin-bottom: 10px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 25px;
        }

        th {
          background: #0f172a;
          color: white;
          padding: 14px;
          text-align: left;
        }

        td {
          padding: 14px;
          border-bottom: 1px solid #e2e8f0;
        }

        .total {
          margin-top: 30px;
          text-align: right;
          font-size: 26px;
          font-weight: bold;
          color: #2563eb;
        }

        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #cbd5e1;
          font-size: 14px;
          color: #475569;
        }

        @media print {
          button {
            display: none;
          }
        }
      </style>
    </head>

    <body>

      <div class="header">

        <div class="logo">
          <img src="imagenes/logo.png">
          <div>
            <h1>VM STORE</h1>
            <p>Tecnología & PC Builder</p>
          </div>
        </div>

        <div class="info">
          <strong>Presupuesto</strong><br>
          Fecha: ${date}<br>
          WhatsApp: +54 11 6593-7718<br>
          Email: vmstore@gmail.com
        </div>

      </div>

      <h2>Presupuesto de PC personalizada</h2>

      <p>
        Detalle de componentes seleccionados para el armado del equipo.
      </p>

      <table>
        <thead>
          <tr>
            <th>Componente</th>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>

        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="total">
        Total estimado: ${formatPrice(budget.total)}
      </div>

      <div class="footer">
        <p>
          Este presupuesto es estimativo y puede variar según stock, disponibilidad
          y actualización de precios.
        </p>

        <p>
          Gracias por confiar en VM Store.
        </p>
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      <\/script>

    </body>
    </html>
  `);

  budgetWindow.document.close();

}

function updateBuilderImage() {

  const cpu = document.getElementById("cpu").value;
  const gpu = document.getElementById("gpu").value;
  const pcImage = document.getElementById("builderPcImage");

  if(!pcImage) return;

  if(Number(gpu) >= 620) {

    pcImage.src = "imagenes/pc-gamer-premium.jpg";

  } else if(Number(gpu) >= 350) {

    pcImage.src = "imagenes/pc-gamer-media.jpg";

  } else if(Number(cpu) > 0) {

    pcImage.src = "imagenes/pc-oficina.jpg";

  } else {

    pcImage.src = "imagenes/slider2.jpg";

  }

}

function checkCompatibility() {

  const gpu =
    Number(document.getElementById("gpu").value);

  const psu =
    Number(document.getElementById("psu").value);

  const ram =
    Number(document.getElementById("ram").value);

  const cpu =
    Number(document.getElementById("cpu").value);

  const compatBox =
    document.getElementById("builderCompatibility");

  if(!compatBox) return;

  let messages = [];

  /* GPU + FUENTE */

  if(gpu >= 850 && psu < 140) {

    messages.push(`
      <div class="compat-danger">
        ⚠️ La fuente seleccionada podría ser insuficiente para esta GPU.
      </div>
    `);

  }

  /* SETUP EXTREMO */

  if(cpu >= 420 && gpu >= 620 && ram >= 150) {

    messages.push(`
      <div class="compat-ok">
        🚀 Setup gamer de alto rendimiento ideal para 1440p / 4K.
      </div>
    `);

  }

  /* OFICINA */

  if(cpu > 0 && gpu === 0) {

    messages.push(`
      <div class="compat-warning">
        💼 Configuración ideal para oficina, estudio y productividad.
      </div>
    `);

  }

  /* BALANCEADO */

  if(cpu >= 250 && gpu >= 350) {

    messages.push(`
      <div class="compat-ok">
        🎮 Configuración equilibrada para gaming competitivo.
      </div>
    `);

  }

  /* RAM */

  if(ram >= 260) {

    messages.push(`
      <div class="compat-ok">
        ⚡ Excelente capacidad multitarea y edición profesional.
      </div>
    `);

  }

  /* SIN MENSAJES */

  if(messages.length === 0) {

    compatBox.innerHTML =
      "Seleccioná componentes para analizar compatibilidad.";

    return;

  }

  compatBox.innerHTML =
    messages.join("");

}

function downloadBudgetPDF() {

  const budget = getBuilderData();

  if(budget.items.length === 0) {
    alert("Seleccioná al menos un componente");
    return;
  }

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  const logo = new Image();

logo.src = "imagenes/logo.png";

  const date =
    new Date().toLocaleDateString("es-AR");

  const budgetNumber =
    "VM-" + Date.now();

  // HEADER

doc.setFillColor(15, 23, 42);

doc.rect(0, 0, 210, 40, "F");

// LOGO

try {

  doc.addImage(
    logo,
    "PNG",
    15,
    7,
    22,
    22
  );

} catch(error) {

  console.log("Logo no cargado");

}

  doc.setTextColor(255,255,255);

  doc.setFontSize(24);

  doc.text("VM STORE", 45, 18);

  doc.setFontSize(11);

  doc.text(
  "Tecnología & PC Builder",
  45,
  27
);

  doc.setFontSize(10);

  doc.text(
    `Presupuesto Nº ${budgetNumber}`,
    135,
    18
  );

  doc.text(
    `Fecha: ${date}`,
    135,
    27
  );

  // TITULO

  doc.setTextColor(15,23,42);

  doc.setFontSize(20);

  doc.text(
    "Presupuesto de PC personalizada",
    15,
    58
  );

  doc.setFontSize(11);

  doc.setTextColor(71,85,105);

  doc.text(
    "Detalle de componentes seleccionados.",
    15,
    66
  );

  // TABLA

  let y = 85;

  doc.setFillColor(37,99,235);

  doc.rect(15, y, 180, 12, "F");

  doc.setTextColor(255,255,255);

  doc.setFontSize(10);

  doc.text("Componente", 20, y + 8);

  doc.text("Producto", 80, y + 8);

  doc.text("Precio", 165, y + 8);

  y += 18;

  budget.items.forEach(item => {

    doc.setTextColor(15,23,42);

    doc.setFontSize(10);

    doc.text(item.label, 20, y);

    doc.text(item.name, 80, y);

    doc.text(`USD ${item.price}`, 165, y);

    doc.setDrawColor(226,232,240);

    doc.line(15, y + 5, 195, y + 5);

    y += 14;

  });

  // TOTAL

  y += 12;

  doc.setFillColor(219,234,254);

  doc.roundedRect(
    110,
    y,
    85,
    18,
    4,
    4,
    "F"
  );

  doc.setTextColor(37,99,235);

  doc.setFontSize(17);

  doc.text(
    `TOTAL: USD ${budget.total}`,
    118,
    y + 12
  );

  // FOOTER

  doc.setFillColor(15,23,42);

  doc.rect(0, 270, 210, 27, "F");

  doc.setTextColor(255,255,255);

  doc.setFontSize(10);

  doc.text(
    "WhatsApp: +54 11 6593-7718",
    15,
    282
  );

  doc.text(
    "Instagram: @vm_store.ok",
    15,
    289
  );

  doc.text(
    "Gracias por confiar en VM STORE",
    115,
    286
  );

  doc.save(
    `presupuesto-${budgetNumber}.pdf`
  );

}

function getBuilderData() {

  const fields = [
    { id: "cpu", label: "Procesador" },
    { id: "gpu", label: "Placa de video" },
    { id: "ram", label: "Memoria RAM" },
    { id: "storage", label: "Almacenamiento" },
    { id: "case", label: "Gabinete" },
    { id: "psu", label: "Fuente" }
  ];

  let items = [];
  let total = 0;

  fields.forEach(field => {

    const select =
      document.getElementById(field.id);

    const value =
      Number(select.value);

    const text =
      select.options[
        select.selectedIndex
      ].text;

    if(value > 0) {

      items.push({
        label: field.label,
        name: text.split(" - ")[0],
        price: value
      });

      total += value;

    }

  });

  return {
    items,
    total
  };

}

/* =========================
   CURRENCY SYSTEM
========================= */

function formatPrice(price) {

  if(currency === "ARS") {

    return "$ " +
      (price * exchangeRate).toLocaleString("es-AR");

  }

  return "USD " + price;

}

function setCurrency(newCurrency) {

  currency = newCurrency;

  localStorage.setItem("currency", currency);

  document
    .getElementById("usdBtn")
    .classList.remove("active");

  document
    .getElementById("arsBtn")
    .classList.remove("active");

  if(currency === "USD") {

    document
      .getElementById("usdBtn")
      .classList.add("active");

  } else {

    document
      .getElementById("arsBtn")
      .classList.add("active");

  }

  renderProducts(currentCategory);

  renderFavorites();

  updateCart();

  updateTotal();

}

window.addEventListener("DOMContentLoaded", () => {

  if(currency === "ARS") {

    document
      .getElementById("arsBtn")
      .classList.add("active");

    document
      .getElementById("usdBtn")
      .classList.remove("active");

  }

});

function updateShopHero(category) {

  const hero = document.getElementById("shopHero");
  const title = document.getElementById("shopHeroTitle");
  const text = document.getElementById("shopHeroText");

  if(!hero || !title || !text) return;

  const data = {
    componentes: {
      title: "Componentes Gamer",
      text: "Hardware, GPUs, memorias RAM, SSD y componentes de alto rendimiento.",
      bg: "linear-gradient(135deg,#020617,#1e3a8a)"
    },
    notebooks: {
      title: "Notebooks",
      text: "Equipos para oficina, estudio, gaming y productividad.",
      bg: "linear-gradient(135deg,#0f172a,#334155)"
    },
    pcs: {
      title: "PCs Armadas",
      text: "Computadoras listas para gaming, streaming y trabajo profesional.",
      bg: "linear-gradient(135deg,#111827,#2563eb)"
    },
    perifericos: {
      title: "Periféricos",
      text: "Mouse, teclados, monitores, auriculares y accesorios.",
      bg: "linear-gradient(135deg,#1e293b,#475569)"
    }
  };

  hero.style.background = data[category].bg;
  title.textContent = data[category].title;
  text.textContent = data[category].text;
}

document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".category-tab");

  tabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const category = tab.dataset.category;

      tabs.forEach(btn => btn.classList.remove("active"));

      tab.classList.add("active");

      renderProducts(category);

      updateShopHero(category);

    });

  });

});

function initLucideIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

function resetProductsStorage() {
  localStorage.removeItem("products");
  location.reload();
}

function openAccountModal() {
  alert("Próximamente: perfil de cliente");
}

function toggleFavorites() {
  const panel = document.getElementById("favoritesPanel");

  if (!panel) return;

  renderFavoritesPanel();

  panel.classList.toggle("active");
}

window.addEventListener("DOMContentLoaded", () => {
  initLucideIcons();
});

function renderFavoritesPanel() {
  const container = document.getElementById("favorites-panel-items");

  if (!container) return;

  container.innerHTML = "";

  let allProducts = [];

  Object.values(products).forEach(category => {
    allProducts = allProducts.concat(category);
  });

  const favProducts = allProducts.filter(product =>
    favorites.includes(product.name)
  );

  if (favProducts.length === 0) {
    container.innerHTML = `
      <div class="empty-search">
        <h3>No tenés favoritos</h3>
        <p>Marcá productos con el corazón para guardarlos acá.</p>
      </div>
    `;
    return;
  }

  favProducts.forEach(product => {
    container.innerHTML += `
      <div class="favorite-panel-item">

        <img src="${product.image}" alt="${product.name}">

        <div class="favorite-panel-info">

          <strong>${product.name}</strong>

          <p>${formatPrice(product.price)}</p>

          <div class="favorite-panel-actions">

            <button
              class="favorite-add-btn"
              onclick="addToCartFromData(
                '${product.name}',
                ${product.price},
                '${product.image}'
              )"
            >
              Agregar
            </button>

            <button
              class="favorite-remove-btn"
              onclick="removeFavoriteFromPanel('${product.name}')"
            >
              Quitar
            </button>

          </div>

        </div>

      </div>
    `;
  });
}

function removeFavoriteFromPanel(productName) {
  favorites = favorites.filter(item => item !== productName);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  renderProducts(currentCategory);
  renderFavorites();
  renderFavoritesPanel();
}

const savedTheme =
  localStorage.getItem("theme");

if(savedTheme === "light") {

  document.body.classList.add("light-mode");

}

function setActiveSubHeader() {

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const links =
    document.querySelectorAll(".sub-link");

  links.forEach(link => {

    const href =
      link.getAttribute("href");

    if(href === currentPage) {

      link.classList.add("active");

    }

  });

}

setActiveSubHeader();

window.addEventListener("scroll", () => {

  const header =
    document.querySelector("header");

  if(window.scrollY > 40) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

});