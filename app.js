let selectedImage = "";

const fallbackProductImage = "imagenes/logo.png";

const brokenDemoImages = [
  "imagenes/iphone14.jpg",
  "imagenes/iphone15.jpg",
  "imagenes/iphone13.jpg",
  "imagenes/iphone16-pink.png",
  "imagenes/rtx4060.jpg",
  "imagenes/ryzen7.jpg",
  "imagenes/notebook.jpg",
  "imagenes/macbook.jpg"
];

function cleanBrokenProductImages() {

  if(!products) return;

  let changed = false;

  Object.keys(products).forEach(category => {

    products[category].forEach(product => {

      if(
        product.image &&
        brokenDemoImages.includes(product.image)
      ) {
        product.image = fallbackProductImage;
        changed = true;
      }

      if(product.variants && product.variants.length > 0) {

        product.variants.forEach(variant => {

          if(
            variant.image &&
            brokenDemoImages.includes(variant.image)
          ) {
            variant.image = fallbackProductImage;
            changed = true;
          }

          if(variant.images && variant.images.length > 0) {

            variant.images = variant.images.map(img => {

              if(brokenDemoImages.includes(img)) {
                changed = true;
                return fallbackProductImage;
              }

              return img;

            });

          }

        });

      }

    });

  });

  if(changed) {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }

}

let currentSubCategory = "all";

function getSafeLocalStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);

    if (!data || data === "undefined" || data === "null") {
      return fallback;
    }

    return JSON.parse(data);
  } catch (error) {
    localStorage.removeItem(key);
    return fallback;
  }
}

let currency =
  localStorage.getItem("currency")
  || "USD";

let exchangeRate =
  Number(
    localStorage.getItem("exchangeRate")
  ) || 1300;


let currentAccessoryType = "all";
let currentAccessoryModel = "all";
let currentCategory = "all";
let selectedPaymentMethod = "WhatsApp";
let editingProductId = null;
let favorites =
  getSafeLocalStorage("favorites", []);




let products =
  getSafeLocalStorage("products", {

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
      image: "imagenes/logo.png"
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
      image: "imagenes/logo.png"
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
      image: "imagenes/logo.png"
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
  image: "imagenes/rtx4060.jpg",

  specs: [
    "Memoria: 8GB GDDR6",
    "Tecnologías: DLSS 3, Ray Tracing",
    "Resolución ideal: 1080p / 1440p",
    "Consumo recomendado: fuente 550W o superior"
  ],

  compatibility: [
    "Compatible con motherboards PCI Express x16",
    "Compatible con procesadores Intel y AMD",
    "Recomendado gabinete con buen flujo de aire",
    "Ideal para PCs gamer de gama media"
  ]
  
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
      image: "imagenes/ryzen7.jpg",

specs: [
  "Procesador AMD Ryzen serie 7000",
  "Tecnología 3D V-Cache ideal para gaming",
  "Excelente rendimiento en juegos competitivos",
  "Recomendado para setups gamer de alto rendimiento"
],

compatibility: [
  "Compatible con motherboards AM5",
  "Requiere memoria DDR5",
  "Recomendado usar cooler de buen rendimiento",
  "Ideal para combinar con GPUs RTX / RX de gama media y alta"
]
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
      image: "imagenes/notebook.jpg",

specs: [
  "Notebook gamer de alto rendimiento",
  "Procesador Intel i7",
  "Placa de video RTX 4060",
  "Ideal para gaming, edición, streaming y trabajo pesado"
],

compatibility: [
  "Compatible con monitores externos HDMI/USB-C según modelo",
  "Compatible con periféricos gamer",
  "Recomendada para juegos actuales en 1080p",
  "Ideal para usuarios que necesitan potencia portátil"
]
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

"accesorios-apple": [],

});

cleanBrokenProductImages();

function renderProducts(category = "iphones") {

  currentCategory = category;

  const container =
  document.getElementById("productsContainer");

if (!container) return;

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
  data-product-name="${product.name}"
  onclick="toggleFavorite(event, '${product.name}')"
>
  ${favorites.includes(product.name) ? "♥" : "♡"}
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

${product.specs ? `
<div class="product-specs">
  ${product.specs.slice(0,3).map(spec => `
    <span>✓ ${spec}</span>
  `).join("")}
</div>
` : ""}

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
                ${formatPrice(product.price, product.originalCurrency || product.productCurrency || "USD")}
              </span>

            </div>

            ${product.stock > 0 ? `

<button
  class="buy-btn"
  onclick="event.stopPropagation(); addToCartFromData(
  '${product.name}',
  ${product.price},
  '${product.image}',
  '${product.productCurrency || product.originalCurrency || "USD"}'
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

const currentPage =
  window.location.pathname.split("/").pop();

if(currentPage === "iphones.html") {

  allProducts = [
    ...(products.iphones || []),
    ...(products["accesorios-apple"] || [])
  ];

} else if(currentPage === "tienda.html") {

  allProducts = [
    ...(products.componentes || []),
    ...(products.notebooks || []),
    ...(products.pcs || []),
    ...(products.perifericos || [])
  ];

} else {

  Object.values(products).forEach(category => {
    allProducts = allProducts.concat(category);
  });

}

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

  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");

  const category = categoryFilter ? categoryFilter.value : "all";
  const sort = sortFilter ? sortFilter.value : "default";

  let filteredProducts = [];

  if(category === "all") {

    Object.keys(products).forEach(categoryName => {

      if(categoryName !== "iphones" && categoryName !== "accesorios-apple") {
        filteredProducts = filteredProducts.concat(products[categoryName]);
      }

    });

  } else {

    filteredProducts = products[category] || [];

  }

  if(currentSubCategory && currentSubCategory !== "all") {
    filteredProducts = filteredProducts.filter(product =>
      product.subCategory === currentSubCategory
    );
  }

  if(sort === "low") {
    filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if(sort === "high") {
    filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  renderFilteredProducts(filteredProducts);

}

function setSubGroup(group, button) {

  document.querySelectorAll("#subcategoryTabs .subcategory-tab")
    .forEach(tab => tab.classList.remove("active"));

  if (button) {
    button.classList.add("active");
  }

  const subLevelTabs = document.getElementById("subLevelTabs");

  if (!subLevelTabs) return;

  const groups = {
    all: [],
    procesadores: [
      { label: "AMD", value: "procesadores-amd" },
      { label: "Intel", value: "procesadores-intel" }
    ],
    motherboards: [
      { label: "AMD", value: "motherboards-amd" },
      { label: "Intel", value: "motherboards-intel" }
    ],
    ram: [
      { label: "Desktop", value: "memorias-ram" },
      { label: "Notebook", value: "ram-notebook" }
    ],
    almacenamiento: [
      { label: "SSD", value: "ssd" },
      { label: "HDD", value: "hdd" }
    ],
    "placas-video": [
      { label: "NVIDIA", value: "placas-nvidia" },
      { label: "Radeon AMD", value: "placas-amd" },
      { label: "Intel Arc", value: "placas-intel" }
    ],
    fuentes: [
      { label: "Fuentes", value: "fuentes" }
    ],
    gabinetes: [
      { label: "Gabinetes", value: "gabinetes" }
    ]
  };

  if (group === "all") {

  currentSubCategory = "all";

  subLevelTabs.innerHTML = "";

  subLevelTabs.style.display = "none";

  applyFilters();

  return;
}

  const options = groups[group] || [];

  currentSubCategory = "all";

  subLevelTabs.style.display = "flex";
  subLevelTabs.innerHTML = `
    <button class="subcategory-tab active" onclick="setSubCategory('all', this)">
      Todo
    </button>

    ${options.map(option => `
      <button class="subcategory-tab" onclick="setSubCategory('${option.value}', this)">
        ${option.label}
      </button>
    `).join("")}
  `;

  applyFilters();

}

function setSubCategory(subCategory, button) {

  currentSubCategory = subCategory;

  document
    .querySelectorAll("#subLevelTabs .subcategory-tab")
    .forEach(tab => {
      tab.classList.remove("active");
    });

  if(button) {
    button.classList.add("active");
  }

  applyFilters();

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

        <div
  class="favorite-btn ${
    favorites.includes(product.name)
      ? "active"
      : ""
  }"
  data-product-name="${product.name}"
  onclick="toggleFavorite(event, '${product.name}')"
>
  ${favorites.includes(product.name) ? "♥" : "♡"}
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
              ${formatPrice(product.price, product.productCurrency || product.originalCurrency || "USD")}
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

function toggleSidebarGroup(button) {

  const group = button.closest(".sidebar-group");

  if (!group) return;

  group.classList.toggle("open");

}

function setShopSubCategory(subCategory, button) {

  currentSubCategory = subCategory;

  document.querySelectorAll(".sidebar-subcategories button").forEach(btn => {
    btn.classList.remove("active");
  });

  if(button) {
    button.classList.add("active");
  }

  applyFilters();

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

    const select = document.getElementById(field);

    if (!select) return;

    const value = Number(select.value);

    total += value;

    const selectedText =
      select.options[select.selectedIndex].text;

    const fieldText =
      document.getElementById(field + 'Text');

    if (fieldText) {
      fieldText.innerText =
        value > 0
          ? selectedText.split(' - ')[0]
          : '-';
    }

  });

  document.getElementById("total").innerText =
    formatPrice(total);

  updateBuilderImage();
  checkCompatibility();

  let level = "Básico";
  let usage = "Oficina";

  const gpuSelect = document.getElementById("gpu");
  const cpuSelect = document.getElementById("cpu");

  const gpuText =
    gpuSelect.options[gpuSelect.selectedIndex].text;

  const cpuText =
    cpuSelect.options[cpuSelect.selectedIndex].text;

    console.log("GPU:", gpuText);
console.log("CPU:", cpuText);

  if (
    gpuText.includes("4060") ||
    gpuText.includes("7600") ||
    cpuText.includes("Ryzen 7")
  ) {
    level = "Alto";
    usage = "Gaming";
  }

  if (
    gpuText.includes("4070") ||
    gpuText.includes("4080")
  ) {
    level = "Extremo";
    usage = "Gaming / Streaming";
  }

  if (
    gpuText.includes("4090") ||
    cpuText.includes("Ryzen 9")
  ) {
    level = "Ultra Enthusiast";
    usage = "4K / IA / Profesional";
  }

  document.getElementById("performanceLevel").innerText =
    level;

  document.getElementById("usageLevel").innerText =
    usage;

  updateBuilderProStats();
}

function updateBuilderProStats() {

  const cpu = Number(document.getElementById("cpu").value);
  const gpu = Number(document.getElementById("gpu").value);
  const ram = Number(document.getElementById("ram").value);
  const storage = Number(document.getElementById("storage").value);

  let consumption = 180;

  consumption += cpu * 0.35;
  consumption += gpu * 0.55;
  consumption += ram * 0.15;
  consumption += storage * 0.10;

  consumption = Math.round(consumption);

  let recommendedPsu = "500W Bronze";
  let fps = "60 - 90 FPS";

  if (gpu >= 330) {
    recommendedPsu = "650W Bronze";
    fps = "100 - 160 FPS";
  }

  if (gpu >= 520) {
    recommendedPsu = "750W Gold";
    fps = "160 - 220 FPS";
  }

  if (gpu >= 850) {
    recommendedPsu = "850W Gold";
    fps = "220 - 300 FPS";
  }

  if (gpu >= 1100) {
    recommendedPsu = "1000W Gold";
    fps = "300+ FPS";
  }

  document.getElementById("powerConsumption").innerText =
    consumption + "W";

  document.getElementById("recommendedPsu").innerText =
    recommendedPsu;

  document.getElementById("estimatedFps").innerText =
    fps;
}

let cart =
  getSafeLocalStorage("cart", []);

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

function addToCartFromData(
  name,
  price,
  image,
  productCurrency = "USD"
) {

  let allProducts = [];

  Object.values(products).forEach(category => {
    allProducts = allProducts.concat(category);
  });

  const currentProduct =
    allProducts.find(product => product.name === name);

  const realPrice =
    currentProduct
      ? Number(currentProduct.price)
      : Number(price);

  const realCurrency =
    currentProduct
      ? currentProduct.productCurrency ||
        currentProduct.originalCurrency ||
        productCurrency ||
        "USD"
      : productCurrency || "USD";

  const productImage =
    currentProduct && currentProduct.image
      ? currentProduct.image
      : image;

  if(currentProduct && currentProduct.stock <= 0) {
    showToast("Producto sin stock");
    return;
  }

  if(!realPrice || realPrice <= 0) {
    showToast("El producto no tiene precio válido");
    return;
  }

  const existingProduct =
    cart.find(item => item.name === name);

  if(existingProduct) {

    existingProduct.quantity++;

  } else {

    cart.push({
      name: name,
      price: realPrice,
      quantity: 1,
      image: productImage,
      productCurrency: realCurrency
    });

  }

  updateCart();

  showToast("Producto agregado al carrito");

  const cartPanel =
    document.getElementById("cartPanel");

  if(cartPanel) {
    cartPanel.classList.add("active");
  }

}

function updateCart() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartCount || !cartItems || !cartTotal) return;

  cartCount.innerText =
    cart.reduce((acc, item) => acc + item.quantity, 0);

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const itemCurrency =
      item.productCurrency || "USD";

    if(itemCurrency === "ARS") {
      total += item.price * item.quantity;
    } else {
      total += item.price * item.quantity * exchangeRate;
    }

    cartItems.innerHTML += `
      <div class="cart-item">

        <div class="cart-product-info">

          <img
            src="${item.image}"
            class="cart-product-image"
          >

          <div>
            <strong>${item.name}</strong>

            <p>${formatPrice(item.price, item.productCurrency || "USD")} x ${item.quantity}</p>

            <div class="quantity-controls">
              <button onclick="decreaseQuantity(${index})">−</button>
              <span>${item.quantity}</span>
              <button onclick="increaseQuantity(${index})">+</button>
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

  const totalARS =
    cart.reduce((sum, item) => {

      const itemCurrency =
        item.productCurrency || "USD";

      if(itemCurrency === "ARS") {
        return sum + item.price * item.quantity;
      }

      return sum + item.price * item.quantity * exchangeRate;

    }, 0);

  const finalTotalARS =
    totalARS + shippingCost;

  cartTotal.innerHTML = `
    <span style="display:block;font-size:.85rem;color:#94a3b8;">
      Total a pagar
    </span>

    ${
      shippingCost > 0
        ? `
          <small style="display:block;color:#94a3b8;margin:4px 0;">
            Envío estimado: ARS ${shippingCost.toLocaleString("es-AR")}
          </small>
        `
        : ""
    }

    <strong>
      ARS ${Math.round(finalTotalARS).toLocaleString("es-AR")}
    </strong>
  `;

  let message =
    "Hola! Quiero comprar:%0A%0A";

  cart.forEach(item => {
    message +=
      `• ${item.name} x${item.quantity} - ${formatPrice(item.price, item.productCurrency || "USD")}%0A`;
  });

  if(shippingCost > 0) {
    message += `%0AEnvío estimado: ARS ${shippingCost.toLocaleString("es-AR")}`;
  }

  message += `%0ATotal: ARS ${Math.round(finalTotalARS).toLocaleString("es-AR")}`;

  window.cartCheckoutMessage = message;
  window.cartCheckoutTotal = finalTotalARS;

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  if (window.saveCartToFirebase) {
    saveCartToFirebase(cart);
  }

  initLucideIcons();
}

async function finishCartOrder(
  paymentMethod = "WhatsApp",
  paymentStatus = "Pendiente de pago"
) {
  const currentCart =
    getSafeLocalStorage("cart", []);

  if (!currentCart || currentCart.length === 0) {
    showToast("El carrito está vacío");
    return;
  }

  const customer =
    JSON.parse(localStorage.getItem("customer")) || null;

  if (!customer) {
    showToast("Iniciá sesión para generar el pedido");
    openAccountModal();
    return;
  }

  const deliveryMethod =
    document.querySelector('input[name="deliveryMethod"]:checked')?.value || "pickup";

  const shippingZip =
    document.getElementById("shippingZip")?.value || "";

  const total = currentCart.reduce((sum, item) => {
    const itemCurrency =
      item.productCurrency || item.originalCurrency || "USD";

    const itemPrice =
      itemCurrency === "ARS"
        ? Number(item.price) / exchangeRate
        : Number(item.price);

    return sum + itemPrice * item.quantity;
  }, 0);

  const order = {
    id: Date.now(),
    customerId: customer.uid || customer.id || "",
    date: new Date().toLocaleString("es-AR"),

    customerName: customer.name || "Cliente",
    customerEmail: customer.email || "",
    customerPhone: customer.phone || "",

    items: [...currentCart],
    total: total,
    currency: "USD",
    displayCurrency: currency,

    status: "Pendiente",
    paymentMethod: paymentMethod,
    paymentStatus: paymentStatus,
    receiptUrl: "",

    deliveryMethod: deliveryMethod,
    shippingZip: shippingZip,
    shippingCost: shippingCost || 0,

    shippingCompany: "",
    trackingCode: "",
    trackingUrl: ""
  };

  try {
    if (window.saveOrderToFirebase) {
      await window.saveOrderToFirebase(order);
    } else {
      throw new Error("saveOrderToFirebase no está disponible");
    }

    let orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("lastOrder", JSON.stringify(order));

    customer.orders = customer.orders || [];
    customer.orders.push(order);

    localStorage.setItem(
      "customer",
      JSON.stringify(customer)
    );

    if (typeof renderCustomerOrders === "function") {
      await renderCustomerOrders();
    }

    if (typeof window.loadAllOrdersForAdmin === "function") {
      await window.loadAllOrdersForAdmin();
    }

    showToast("Pedido generado correctamente");

    let message = "Hola! Quiero comprar:\n\n";

    currentCart.forEach(item => {
      message +=
        `• ${item.name} x${item.quantity} - ${formatPrice(item.price, item.productCurrency || "USD")}\n`;
    });

    message += `\nMétodo de entrega: ${
      deliveryMethod === "shipping"
        ? "Envío a domicilio"
        : "Retiro / coordinar"
    }`;

    if (deliveryMethod === "shipping" && shippingZip) {
      message += `\nCódigo postal: ${shippingZip}`;
    }

    if (shippingCost > 0) {
      message += `\nEnvío estimado: ARS ${shippingCost.toLocaleString("es-AR")}`;
    }

    message += `\nTotal: ${formatPrice(total, currency)}`;

    window.open(
      `https://api.whatsapp.com/send?phone=5491165937718&text=${encodeURIComponent(message)}`,
      "_blank"
    );

  } catch (error) {
    console.error("Error guardando pedido:", error);
    showToast("No se pudo guardar el pedido en Firebase");
  }
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
    allProducts = allProducts.concat(category);
  });

  const product =
    allProducts.find(p => p.id === productId);

  if(!product) return;

  let selectedVariant = null;

  if(product.variants && product.variants.length > 0) {
    selectedVariant = product.variants[0];
  }

  const finalPrice =
    selectedVariant
      ? selectedVariant.price
      : product.price;

  const finalImage =
    selectedVariant && selectedVariant.image
      ? selectedVariant.image
      : product.image;

  document.getElementById("modalTitle").innerText =
    product.name;

  document.getElementById("modalDescription").innerText =
    "";

  document.getElementById("modalPrice").innerHTML =
    `
      ${
        product.oldPrice
          ? `
            <small
              style="
                display:block;
                font-size:1.2rem;
                text-decoration:line-through;
                color:#94a3b8;
                margin-bottom:5px;
              "
            >
              ${formatPrice(product.oldPrice, product.productCurrency || product.originalCurrency || "USD")}
            </small>
          `
          : ""
      }

      <div class="modal-current-price">
        ${formatPrice(finalPrice, product.productCurrency || product.originalCurrency || "USD")}
      </div>

      <div class="payment-methods">

        <div class="payment-pill">
          💳 Mercado Pago
        </div>

        <div class="payment-pill">
          🏦 Transferencia ARS
        </div>

        <div class="payment-pill">
          💵 Transferencia USD
        </div>

      </div>
    `;

  document.getElementById("modalImage").src =
    finalImage;

    setTimeout(() => {
  renderVariantGallery(selectedVariant, product);
}, 100);

  document.getElementById("modalBadge").innerText =
    product.badge || "";

  document.getElementById("modalExtra").innerHTML = `
    ${
      product.variants && product.variants.length > 0
        ? `
          <div class="variant-box">

            <h4>Elegí tu variante</h4>

            <div class="variant-group">
              <span>Color</span>

              <div class="variant-options">
                ${
                  [...new Set(product.variants.map(v => v.color))]
                    .map((color, index) => `
                      <button
                        class="variant-btn ${index === 0 ? "active" : ""}"
                        onclick="selectProductVariant(${product.id}, 'color', '${color}', this)"
                      >
                        ${color}
                      </button>
                    `).join("")
                }
              </div>
            </div>

            <div class="variant-group">
              <span>Capacidad</span>

              <div class="variant-options">
                ${
                  [...new Set(product.variants.map(v => v.storage))]
                    .map((storage, index) => `
                      <button
                        class="variant-btn ${index === 0 ? "active" : ""}"
                        onclick="selectProductVariant(${product.id}, 'storage', '${storage}', this)"
                      >
                        ${storage}
                      </button>
                    `).join("")
                }
              </div>
            </div>

            <div id="modalVariantGallery" class="variant-gallery"></div>

          </div>
        `
        : ""
    }

    <div class="modal-tabs clean-tabs">

      <button class="modal-tab active" onclick="showModalTab(event, 'descriptionTab')">
        Descripción
      </button>

      <button class="modal-tab" onclick="showModalTab(event, 'specsTab')">
        Características
      </button>

    </div>

    <div class="modal-tab-content active" id="descriptionTab">
      <div class="product-clean-description">
        <p>
          ${product.fullDescription || product.description || "Producto disponible en VM STORE."}
        </p>
      </div>
    </div>

    <div class="modal-tab-content" id="specsTab">
      <div class="product-clean-description">
        ${
          product.specs && product.specs.length > 0
            ? `<ul class="clean-list">${product.specs.map(item => `<li>${item}</li>`).join("")}</ul>`
            : `<p>No hay características cargadas para este producto.</p>`
        }
      </div>
    </div>
  `;

  window.currentModalProduct = product;
window.currentSelectedVariant = selectedVariant;

window.selectedVariantColor =
  selectedVariant ? selectedVariant.color : null;

window.selectedVariantStorage =
  selectedVariant ? selectedVariant.storage : null;

  const addBtn =
    document.getElementById("modalAddBtn");

  addBtn.onclick = () => {

  const selected =
    window.currentSelectedVariant;

  const selectedName =
    selected
      ? `${product.name} ${selected.storage || ""} ${selected.color || ""}`.trim()
      : product.name;

  const selectedPrice =
    selected
      ? selected.price
      : product.price;

  const selectedImage =
    selected && selected.images && selected.images.length > 0
      ? selected.images[0]
      : selected && selected.image
      ? selected.image
      : product.image;

  const selectedCurrency =
    product.productCurrency ||
    product.originalCurrency ||
    "USD";

  addToCartFromData(
    selectedName,
    selectedPrice,
    selectedImage,
    selectedCurrency
  );

};

  const whatsappBtn =
    document.getElementById("modalWhatsappBtn");

  if(whatsappBtn) {

    const storeWhatsapp =
      localStorage.getItem("storeWhatsapp")
      || "541165937718";

    const selected =
      window.currentSelectedVariant;

    const message =
      encodeURIComponent(
        selected
          ? `Hola! Me interesa ${product.name} ${selected.storage} ${selected.color}`
          : `Hola! Me interesa ${product.name}`
      );

    whatsappBtn.href =
      `https://wa.me/${storeWhatsapp.replace(/\D/g, "")}?text=${message}`;

  }

  document
    .getElementById("productModal")
    .classList.add("active");

}

function renderVariantGallery(variant, product) {

  const images =
    variant && variant.images && variant.images.length > 0
      ? variant.images
      : variant && variant.image
      ? [variant.image]
      : [product.image];

  document.getElementById("modalImage").src = images[0];

  const galleryContainer =
    document.getElementById("modalVariantGallery");

  if(!galleryContainer) return;

  galleryContainer.innerHTML = images.map((img, index) => `
    <img
      src="${img}"
      class="variant-gallery-thumb ${index === 0 ? "active" : ""}"
      onclick="changeVariantMainImage('${img}', this)"
    >
  `).join("");
}

function changeVariantMainImage(image, thumb) {

  document.getElementById("modalImage").src = image;

  document.querySelectorAll(".variant-gallery-thumb")
    .forEach(item => item.classList.remove("active"));

  thumb.classList.add("active");
}

function selectProductVariant(productId, type, value, button) {

  const product =
    window.currentModalProduct;

  if(!product || !product.variants) return;

  if(type === "color") {
    window.selectedVariantColor = value;
  }

  if(type === "storage") {
    window.selectedVariantStorage = value;
  }

  if(!window.selectedVariantColor) {
    window.selectedVariantColor = product.variants[0].color;
  }

  if(!window.selectedVariantStorage) {
    window.selectedVariantStorage = product.variants[0].storage;
  }

  const selected =
    product.variants.find(variant =>
      variant.color === window.selectedVariantColor &&
      variant.storage === window.selectedVariantStorage
    );

  if(!selected) return;

  window.currentSelectedVariant = selected;

  const selectedCurrency =
  product.productCurrency ||
  product.originalCurrency ||
  "USD";

document.getElementById("modalPrice").innerHTML = `
  <div class="modal-current-price">
    ${formatPrice(selected.price, selectedCurrency)}
  </div>

  <div class="payment-methods">

    <div class="payment-pill">
      💳 Mercado Pago
    </div>

    <div class="payment-pill">
      🏦 Transferencia ARS
    </div>

    <div class="payment-pill">
      💵 Transferencia USD
    </div>

  </div>
`;

  renderVariantGallery(selected, product);

  document.getElementById("modalDescription").innerHTML =
`
Color: ${selected.color}
<br>
Capacidad: ${selected.storage}
<br>
🔋 Batería: ${selected.battery || "-"}%
`;

  const group =
    button.parentElement;

  group.querySelectorAll(".variant-btn")
    .forEach(btn => btn.classList.remove("active"));

  button.classList.add("active");

}

function closeProductModal() {

  document
    .getElementById("productModal")
    .classList.remove("active");

}

function showModalTab(event, tabId) {

  const modal =
    event.target.closest(".modal-info");

  if (!modal) return;

  const tabs =
    modal.querySelectorAll(".modal-tab");

  const contents =
    modal.querySelectorAll(".modal-tab-content");

  tabs.forEach(tab => {
    tab.classList.remove("active");
  });

  contents.forEach(content => {
    content.classList.remove("active");
  });

  event.target.classList.add("active");

  const selectedContent =
    modal.querySelector("#" + tabId);

  if (selectedContent) {
    selectedContent.classList.add("active");
  }
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
              ${formatPrice(
  product.price,
  product.productCurrency || product.originalCurrency || "USD"
)}
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

  if (window.saveFavoritesToFirebase) {
    saveFavoritesToFirebase(favorites);
  }

  updateFavoriteButtons();
  renderFavorites();
}

function updateFavoriteButtons() {
  const buttons = document.querySelectorAll(".favorite-btn");

  buttons.forEach(button => {
    const productName = button.dataset.productName;

    if (favorites.includes(productName)) {
      button.classList.add("active");
      button.innerHTML = "♥";
    } else {
      button.classList.remove("active");
      button.innerHTML = "♡";
    }
  });
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

  if (!header) return;

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

function getDataUrlSizeInBytes(dataUrl) {

  if(!dataUrl || !dataUrl.includes(",")) {
    return 0;
  }

  const base64 =
    dataUrl.split(",")[1];

  return Math.ceil((base64.length * 3) / 4);

}

function compressImageFile(
  file,
  maxWidth = 750,
  quality = 0.6,
  maxBytes = 450 * 1024
) {

  return new Promise(resolve => {

    if(!file || !file.type || !file.type.startsWith("image/")) {
      resolve("");
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {

      const image = new Image();

      image.onload = () => {

        let currentWidth =
          Math.min(maxWidth, image.width);

        let currentQuality =
          quality;

        let finalImage = "";

        for(let attempt = 0; attempt < 12; attempt++) {

          const scale =
            Math.min(1, currentWidth / image.width);

          const width =
            Math.round(image.width * scale);

          const height =
            Math.round(image.height * scale);

          const canvas =
            document.createElement("canvas");

          canvas.width = width;
          canvas.height = height;

          const ctx =
            canvas.getContext("2d");

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);

          ctx.drawImage(image, 0, 0, width, height);

          finalImage =
            canvas.toDataURL("image/jpeg", currentQuality);

          const finalSize =
            getDataUrlSizeInBytes(finalImage);

          console.log(
            "Imagen comprimida:",
            Math.round(finalSize / 1024) + "KB",
            "Ancho:",
            width,
            "Calidad:",
            currentQuality
          );

          if(finalSize <= maxBytes) {
            resolve(finalImage);
            return;
          }

          if(currentQuality > 0.35) {
            currentQuality -= 0.08;
          } else {
            currentWidth *= 0.82;
          }

        }

        resolve(finalImage);

      };

      image.onerror = () => {
        resolve("");
      };

      image.src = event.target.result;

    };

    reader.onerror = () => {
      resolve("");
    };

    reader.readAsDataURL(file);

  });

}

let tempVariants = [];

function addVariantToTempList() {

  const color = document.getElementById("variantColor").value.trim();
  const storage = document.getElementById("variantStorage").value.trim();
  const price = Number(document.getElementById("variantPrice").value);

  const battery =
  Number(document.getElementById("variantBattery").value);

  const imageInput = document.getElementById("variantImages");
  const files = Array.from(imageInput.files);

  if(!color || !storage || !price) {
    showToast("Completá color, capacidad y precio");
    return;
  }

  if(files.length === 0) {
    showToast("Seleccioná al menos una imagen");
    return;
  }

  const readers = files.map(file => {
  return compressImageFile(
    file,
    550,
    0.5,
    250 * 1024
  );
});

  Promise.all(readers).then(images => {

    tempVariants.push({
  color,
  storage,
  battery,
  price,
  image: images[0],
  images
});

    document.getElementById("variantColor").value = "";
    document.getElementById("variantStorage").value = "";
    document.getElementById("variantPrice").value = "";
    document.getElementById("variantBattery").value = "";
    imageInput.value = "";

    renderTempVariants();
  });
}

function renderTempVariants() {

  const container = document.getElementById("variantList");

  if(!container) return;

  container.innerHTML = "";

  tempVariants.forEach((variant, index) => {
    container.innerHTML += `
      <div class="variant-admin-item">
        <span>
          ${variant.color} /
${variant.storage} /
🔋 ${variant.battery || "-"}% / ${formatPrice(variant.price)}
          <br>
          <small>${variant.images ? variant.images.length : 1} fotos cargadas</small>
        </span>

        <button onclick="removeTempVariant(${index})">
          ✕
        </button>
      </div>
    `;
  });
}

function removeTempVariant(index) {
  tempVariants.splice(index, 1);
  renderTempVariants();
}

/* =========================
   ADMIN PANEL
========================= */

function generateProductSpecs(productName, category) {

  const name = productName.toLowerCase();

  if (name.includes("5600g")) {
    return [
      "6 núcleos y 12 hilos",
      "Frecuencia hasta 4.4 GHz",
      "Gráficos Radeon integrados",
      "Socket AM4",
      "Compatible con memorias DDR4"
    ];
  }

  if (name.includes("5800g")) {
    return [
      "8 núcleos y 16 hilos",
      "Frecuencia hasta 4.6 GHz",
      "Gráficos Radeon integrados",
      "Socket AM4",
      "Ideal para gaming y multitarea"
    ];
  }

  if (name.includes("3200g")) {
    return [
      "4 núcleos y 4 hilos",
      "Gráficos Radeon Vega",
      "Socket AM4",
      "Ideal para oficina y uso diario",
      "Compatible con memorias DDR4"
    ];
  }

  if (category === "iphones") {
    return [
      "Equipo original",
      "Face ID funcional",
      "Compatible con iOS actual",
      "Excelente rendimiento",
      "Ideal para uso diario"
    ];
  }

  if (
    name.includes("rtx") ||
    name.includes("rx ")
  ) {
    return [
      "Placa de video dedicada",
      "Ideal para gaming",
      "Compatible con PCI Express",
      "Excelente rendimiento gráfico",
      "Lista para juegos modernos"
    ];
  }

  if (
    name.includes("ryzen") ||
    name.includes("intel") ||
    name.includes("i3") ||
    name.includes("i5") ||
    name.includes("i7")
  ) {
    return [
      "Procesador de alto rendimiento",
      "Ideal para multitarea",
      "Compatible con configuraciones gamer",
      "Excelente eficiencia",
      "Gran rendimiento general"
    ];
  }

  if (name.includes("ssd")) {
    return [
      "Almacenamiento sólido",
      "Mayor velocidad de carga",
      "Menor consumo energético",
      "Sin partes mecánicas",
      "Ideal para actualizar equipos"
    ];
  }

  return [
    "Producto disponible en VM STORE",
    "Calidad verificada",
    "Excelente rendimiento",
    "Garantía de funcionamiento",
    "Consultar detalles"
  ];
}

function generateProductDescription(productName, category) {

  const name = productName.toLowerCase();

  if (name.includes("5600g")) {
    return "AMD Ryzen 5 5600G con gráficos Radeon integrados. Excelente opción para oficina, estudio, multitarea y gaming ligero sin necesidad de placa de video dedicada.";
  }

  if (name.includes("5800g")) {
    return "AMD Ryzen 7 5800G con 8 núcleos y gráficos Radeon integrados. Ideal para usuarios exigentes, multitarea avanzada y gaming.";
  }

  if (name.includes("3200g")) {
    return "AMD Ryzen 3 3200G con gráficos Radeon Vega integrados. Excelente alternativa económica para oficina, navegación y uso diario.";
  }

  if (category === "iphones") {
    return `${productName} original, libre para todas las compañías y listo para usar. Ideal para redes sociales, fotos, videos, trabajo y uso diario. Equipo probado antes de la entrega.`;
  }

  if (
    name.includes("rtx") ||
    name.includes("rx ")
  ) {
    return `${productName} ideal para gaming, edición y uso exigente. Excelente opción para armar o actualizar una PC gamer con buen rendimiento gráfico.`;
  }

  if (
    name.includes("ryzen") ||
    name.includes("intel") ||
    name.includes("i3") ||
    name.includes("i5") ||
    name.includes("i7")
  ) {
    return `${productName} ideal para PC de oficina, estudio, multitarea y gaming según la configuración. Buena opción para armar o actualizar una computadora.`;
  }

  if (name.includes("ssd")) {
    return `${productName} ideal para mejorar la velocidad de arranque del sistema, apertura de programas y carga general del equipo.`;
  }

  return `${productName} disponible en VM STORE. Producto verificado, listo para entregar y con asesoramiento personalizado.`;
}

async function addNewProduct() {

  const name =
    document.getElementById("adminName").value.trim();

  const description =
    document.getElementById("adminDescription").value.trim();

  const price =
    Number(document.getElementById("adminPrice").value);

  const productCurrency =
    document.getElementById("adminProductCurrency")
      ? document.getElementById("adminProductCurrency").value
      : "USD";

  const condition =
    document.getElementById("adminCondition")
      ? document.getElementById("adminCondition").value
      : "NUEVO";

  const adminCategorySelect =
    document.getElementById("adminCategory");

  let category =
    adminCategorySelect
      ? adminCategorySelect.value
      : "componentes";

  const page =
    window.location.pathname.split("/").pop();

  const normalizedName =
    name.toLowerCase();

  const looksLikeIphone =
    normalizedName.includes("iphone") ||
    (
      /\b(11|12|13|14|15|16|17)\b/.test(normalizedName) &&
      /\b(pro|max|mini|plus|air|gb|128|256|512|1tb)\b/.test(normalizedName)
    );

  if(
    category === "componentes" &&
    (page === "iphones.html" || looksLikeIphone)
  ) {
    category = "iphones";

    if(adminCategorySelect) {
      adminCategorySelect.value = "iphones";
    }
  }

  const subCategory =
    document.getElementById("adminSubCategory")
      ? document.getElementById("adminSubCategory").value
      : "";

  const compatibleModelsInput =
    document.getElementById("adminCompatibleModels")
      ? document.getElementById("adminCompatibleModels").value
      : "";

  const compatibleModels =
    compatibleModelsInput
      ? compatibleModelsInput
          .split(",")
          .map(model => model.trim())
          .filter(model => model !== "")
      : [];

  const imageUrl =
    document.getElementById("adminImageUrl").value.trim();

    const adminImageInput =
  document.getElementById("adminImage");

const adminImageFile =
  adminImageInput &&
  adminImageInput.files &&
  adminImageInput.files.length > 0
    ? adminImageInput.files[0]
    : null;

if(!selectedImage && adminImageFile) {

  showToast("Procesando imagen...");

  selectedImage =
    await compressImageFile(
      adminImageFile,
      650,
      0.55,
      350 * 1024
    );

  const imagePreview =
    document.getElementById("imagePreview");

  if(imagePreview && selectedImage) {
    imagePreview.src = selectedImage;
    imagePreview.style.display = "block";
  }

}

  if(!name || !description || !price) {
    showToast("Completá todos los campos");
    return;
  }

  if(!editingProductId && !selectedImage && !imageUrl) {
    showToast("Seleccioná una imagen");
    return;
  }

  if(!products[category]) {
    products[category] = [];
  }

  let productToSave = null;

  const wasEditing =
    Boolean(editingProductId);

  if(editingProductId) {

    let oldProduct = null;

    Object.keys(products).forEach(cat => {

      products[cat].forEach(product => {

        if(String(product.id) === String(editingProductId)) {
          oldProduct = product;
        }

      });

    });

    if(!oldProduct) {
      showToast("No se encontró el producto para editar");
      return;
    }

    productToSave = {
      ...oldProduct,

      name: name,
      category: category,
      subCategory: subCategory,
      compatibleModels: compatibleModels,

      description: description,
      fullDescription:
        generateProductDescription(name, category),
      specs:
        generateProductSpecs(name, category),

      price: price,
      originalPrice: price,
      originalCurrency: productCurrency,
      productCurrency: productCurrency,
      oldPrice: "",

      badge: condition,
      condition: condition,

      image:
        selectedImage ||
        imageUrl ||
        oldProduct.image,

      variants:
        tempVariants.length > 0
          ? tempVariants
          : oldProduct.variants || []
    };

    Object.keys(products).forEach(cat => {

      products[cat] =
        products[cat].filter(product =>
          String(product.id) !== String(editingProductId)
        );

    });

    products[category].push(productToSave);

  } else {

    productToSave = {
      id: Date.now(),

      name: name,
      category: category,
      subCategory: subCategory,
      compatibleModels: compatibleModels,

      description: description,
      fullDescription:
        generateProductDescription(name, category),
      specs:
        generateProductSpecs(name, category),

      price: price,
      originalPrice: price,
      originalCurrency: productCurrency,
      productCurrency: productCurrency,
      oldPrice: "",

      badge: condition,
      condition: condition,

      installments: "Consultar",
      stock: 10,

      image:
        selectedImage ||
        imageUrl,

      variants: tempVariants
    };

    products[category].push(productToSave);

  }

  if(window.saveProductToFirebase && productToSave) {

    const result =
      await saveProductToFirebase(productToSave);

    if(result && result.success === false) {

      console.error(
        "No se pudo guardar el producto:",
        result.error
      );

      if(!wasEditing && products[category]) {

        products[category] =
          products[category].filter(product =>
            String(product.id) !== String(productToSave.id)
          );

      }

      showToast("No se guardó. Probá con una imagen más liviana");
      return;

    }

    if(result && result.firebaseId) {
      productToSave.firebaseId = result.firebaseId;
    }

  }

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );

  editingProductId = null;
  selectedImage = "";

  tempVariants = [];

  if(typeof renderTempVariants === "function") {
    renderTempVariants();
  }

  document.getElementById("adminName").value = "";
  document.getElementById("adminDescription").value = "";
  document.getElementById("adminPrice").value = "";

  if(document.getElementById("adminImage")) {
    document.getElementById("adminImage").value = "";
  }

  if(document.getElementById("imagePreview")) {
    document.getElementById("imagePreview").style.display = "none";
  }

  if(document.getElementById("adminImageUrl")) {
    document.getElementById("adminImageUrl").value = "";
  }

  if(document.getElementById("adminProductCurrency")) {
    document.getElementById("adminProductCurrency").value = "USD";
  }

  if(document.getElementById("adminCondition")) {
    document.getElementById("adminCondition").value = "NUEVO";
  }

  if(adminCategorySelect && page === "iphones.html") {
    adminCategorySelect.value = "iphones";
  }

  document.getElementById("adminSubmitBtn").innerText =
    "Agregar Producto";

  if(page === "tienda.html") {

    applyFilters();

  } else if(page === "iphones.html") {

    currentCategory =
      category === "accesorios-apple"
        ? "accesorios-apple"
        : "iphones";

    renderProducts(currentCategory);

  } else {

    renderProducts(category);

  }

  renderAdminProducts();
  renderFavorites();

  showToast(
    wasEditing
      ? "Producto actualizado"
      : "Producto agregado"
  );

}

  /* =========================
   DELETE PRODUCT
========================= */

async function deleteProduct(event, productId) {

  event.stopPropagation();

  const confirmDelete =
    confirm("¿Eliminar producto?");

  if (!confirmDelete) return;

  let productToDelete = null;

  Object.keys(products).forEach(category => {
    products[category].forEach(product => {
      if (String(product.id) === String(productId)) {
        productToDelete = product;
      }
    });
  });

  try {

    if (productToDelete && productToDelete.firebaseId) {
      await deleteProductFromFirebase(productToDelete.firebaseId);
    }

    Object.keys(products).forEach(category => {
      products[category] =
        products[category].filter(product =>
          String(product.id) !== String(productId)
        );
    });

    localStorage.setItem("products", JSON.stringify(products));

    renderAdminProducts();
    renderProducts(currentCategory);
    renderFavorites();

    showToast("Producto eliminado");

  } catch (error) {

    console.error("Error al eliminar producto:", error);
    showToast("No se pudo eliminar el producto");

  }

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
    productToEdit.name || "";

  document.getElementById("adminDescription").value =
    productToEdit.description || "";

  document.getElementById("adminPrice").value =
    productToEdit.price || "";

  if(document.getElementById("adminProductCurrency")) {
    document.getElementById("adminProductCurrency").value =
      productToEdit.originalCurrency ||
      productToEdit.productCurrency ||
      "USD";
  }

  if(document.getElementById("adminCondition")) {
    document.getElementById("adminCondition").value =
      productToEdit.condition ||
      productToEdit.badge ||
      "NUEVO";
  }

  if(document.getElementById("adminCategory")) {
    document.getElementById("adminCategory").value =
      productToEdit.category || "componentes";
  }

  if(document.getElementById("adminSubCategory")) {
    document.getElementById("adminSubCategory").value =
      productToEdit.subCategory || "";
  }

  if(document.getElementById("adminCompatibleModels")) {
    document.getElementById("adminCompatibleModels").value =
      productToEdit.compatibleModels
        ? productToEdit.compatibleModels.join(", ")
        : "";
  }

  if(document.getElementById("adminImageUrl")) {
    document.getElementById("adminImageUrl").value =
      productToEdit.image || "";
  }

  const preview =
    document.getElementById("imagePreview");

  if(preview && productToEdit.image) {
    preview.src = productToEdit.image;
    preview.style.display = "block";
  }

  tempVariants =
    productToEdit.variants
      ? [...productToEdit.variants]
      : [];

  renderTempVariants();

  showToast("Editando producto");

  const adminSection =
    document.getElementById("adminSectionProducts");

  if(adminSection) {
    window.scrollTo({
      top: adminSection.offsetTop - 80,
      behavior: "smooth"
    });
  }

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
    allProducts = allProducts.concat(category);
  });

  if(allProducts.length === 0) {
    container.innerHTML = `
      <div class="admin-empty-row">
        No hay productos cargados todavía.
      </div>
    `;
    return;
  }

  allProducts.forEach(product => {

    const productCurrency =
      product.productCurrency ||
      product.originalCurrency ||
      "USD";

    const productImage =
      product.image && product.image.trim() !== ""
        ? product.image
        : "imagenes/logo.png";

    container.innerHTML += `

      <div class="admin-product-row">

        <div>
          <img
            src="${productImage}"
            alt="${product.name}"
            onerror="this.src='imagenes/logo.png'"
          >
        </div>

        <div>
          <strong>${product.name}</strong>
          <small>${product.description || "Sin descripción"}</small>
        </div>

        <div>
          ${product.category || "-"}
        </div>

        <div>
          ${formatPrice(product.price, productCurrency)}
        </div>

        <div>
          ${
            product.stock !== undefined && product.stock !== ""
              ? product.stock
              : "-"
          }
        </div>

        <div class="admin-actions">

          <button
            title="Editar"
            onclick="editProduct(event, ${product.id})"
          >
            ✏️
          </button>

          <button
            title="Eliminar"
            onclick="deleteProduct(event, ${product.id})"
            style="background:#ef4444;color:white;"
          >
            🗑️
          </button>

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

  const wasAdmin = isAdmin;

  isAdmin = false;

  localStorage.removeItem("isAdmin");

  closeAdminPanel();

  updateAdminVisibility();

  if (document.getElementById("productsContainer")) {
    renderProducts(currentCategory);
  }

  renderAdminProducts();

  updateAdminButtons();

  updateAdminButton();

  if (wasAdmin) {
    showToast("Sesión cerrada");
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

  if(!adminBtn) return;

  if(isAdmin) {

    adminBtn.style.display = "inline-flex";
    adminBtn.innerText = "🚪 Salir";
    adminBtn.onclick = logoutAdmin;

    if(panelBtn) {
      panelBtn.style.display = "inline-flex";
    }

  } else {

    adminBtn.style.display = "none";

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

  if (budget.items.length === 0) {
    showToast("Seleccioná al menos un componente");
    return;
  }

  const customer =
    JSON.parse(localStorage.getItem("customer")) || null;

  if (!customer) {
    showToast("Iniciá sesión para finalizar el pedido");
    openAccountModal();
    return;
  }

  const order = {
    id: Date.now(),
    createdAt: new Date().toLocaleString("es-AR"),
    customerName: customer.name || "Cliente",
    customerEmail: customer.email || "",
    customerPhone: customer.phone || "",
    items: budget.items.map(item => ({
      name: item.name,
      label: item.label,
      price: item.price,
      quantity: 1
    })),
    total: budget.total,
    currency: currency,
    status: "Pendiente",
    paymentStatus: "No pagado",
    type: "PC Builder"
  };

  if (window.saveOrderToFirebase) {
    saveOrderToFirebase(order);
  }

  let message = "Hola! Quiero finalizar este pedido:%0A%0A";

  order.items.forEach(item => {
    message += `• ${item.label}: ${item.name} - ${formatPrice(item.price)}%0A`;
  });

  message += `%0ATotal estimado: ${formatPrice(order.total)}`;

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

async function downloadBudgetPDF() {

  const budget = getBuilderData();

  if (budget.items.length === 0) {
    alert("Seleccioná al menos un componente");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // CARGAR LOGO ANTES DE ARMAR EL PDF
  const logo = await loadImage("imagenes/logo.png");

  const date = new Date().toLocaleDateString("es-AR");
  const budgetNumber = "VM-" + Date.now();
  const clientName =
  document.getElementById("clientName")?.value || "Cliente no especificado";

const clientPhone =
  document.getElementById("clientPhone")?.value || "No especificado";

const validUntil = new Date();
validUntil.setDate(validUntil.getDate() + 7);

const validUntilFormatted =
  validUntil.toLocaleDateString("es-AR");

  // HEADER
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 40, "F");

  // LOGO
  if (logo) {
    doc.addImage(logo, "PNG", 15, 7, 22, 22);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("VM STORE", 45, 18);

  doc.setFontSize(11);
  doc.text("Tecnología & PC Builder", 45, 27);

  doc.setFontSize(10);
  doc.text(`Presupuesto Nº ${budgetNumber}`, 135, 18);
  doc.text(`Fecha: ${date}`, 135, 27);

  // TITULO
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(20);
  doc.text("Presupuesto de PC personalizada", 15, 58);

  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text("Detalle de componentes seleccionados.", 15, 66);

  doc.setFontSize(10);
doc.setTextColor(71, 85, 105);

doc.text(`Cliente: ${clientName}`, 15, 74);
doc.text(`Contacto: ${clientPhone}`, 15, 80);
doc.text(`Válido hasta: ${validUntilFormatted}`, 135, 74);

  // TABLA
  let y = 92;

  doc.setFillColor(37, 99, 235);
  doc.rect(15, y, 180, 12, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("Componente", 20, y + 8);
  doc.text("Producto", 80, y + 8);
  doc.text("Precio", 165, y + 8);

  y += 18;

  budget.items.forEach(item => {
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);

    doc.text(String(item.label), 20, y);
    doc.text(String(item.name), 80, y);
    doc.text(formatPrice(item.price), 165, y);

    doc.setDrawColor(226, 232, 240);
    doc.line(15, y + 5, 195, y + 5);

    y += 14;
  });

  // TOTAL
  y += 12;

  doc.setFillColor(219, 234, 254);
  doc.roundedRect(110, y, 85, 18, 4, 4, "F");

  doc.setTextColor(37, 99, 235);
  doc.setFontSize(17);
  doc.text(`TOTAL: ${formatPrice(budget.total)}`, 118, y + 12);

  // FOOTER
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 270, 210, 27, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);

  doc.text("WhatsApp: +54 11 6593-7718", 15, 282);
  doc.text("Instagram: @vm_store.ok", 15, 289);
  doc.text("Gracias por confiar en VM STORE", 115, 286);

  doc.save(`presupuesto-${budgetNumber}.pdf`);
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve(img);

    img.onerror = () => {
      console.log("No se pudo cargar el logo:", src);
      resolve(null);
    };

    img.src = src;
  });
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

function formatPrice(price, productCurrency = "USD") {

  price = Number(price);

  if (productCurrency === currency) {
    return `${currency} ${price.toLocaleString("es-AR")}`;
  }

  if (productCurrency === "USD" && currency === "ARS") {
    return `ARS ${(price * exchangeRate).toLocaleString("es-AR")}`;
  }

  if (productCurrency === "ARS" && currency === "USD") {
    return `USD ${(price / exchangeRate).toFixed(2)}`;
  }

  return `${productCurrency} ${price.toLocaleString("es-AR")}`;
}

function setCurrency(newCurrency) {

  currency = newCurrency;

  localStorage.setItem("currency", currency);

  const usdBtn =
    document.getElementById("usdBtn");

  const arsBtn =
    document.getElementById("arsBtn");

  if(usdBtn) {
    usdBtn.classList.remove("active");
  }

  if(arsBtn) {
    arsBtn.classList.remove("active");
  }

  if(currency === "USD") {

    if(usdBtn) {
      usdBtn.classList.add("active");
    }

  } else {

    if(arsBtn) {
      arsBtn.classList.add("active");
    }

  }

  const page =
    window.location.pathname.split("/").pop();

  if(page === "tienda.html") {

    currentCategory = "all";

    if(typeof applyFilters === "function") {
      applyFilters();
    }

  } else if(page === "iphones.html") {

  if(currentCategory === "accesorios-apple") {

    if(typeof renderProducts === "function") {
      renderProducts("accesorios-apple");
    }

  } else {

    currentCategory = "iphones";

    if(typeof renderProducts === "function") {
      renderProducts("iphones");
    }

  }

}

  if(typeof renderFavorites === "function") {
    renderFavorites();
  }

  if(typeof updateCart === "function") {
    updateCart();
  }

  if(typeof updateTotal === "function") {
    updateTotal();
  }

}

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

window.addEventListener("DOMContentLoaded", () => {

  const usdBtn =
    document.getElementById("usdBtn");

  const arsBtn =
    document.getElementById("arsBtn");

  if(currency === "ARS") {

    if(arsBtn) {
      arsBtn.classList.add("active");
    }

    if(usdBtn) {
      usdBtn.classList.remove("active");
    }

  } else {

    if(usdBtn) {
      usdBtn.classList.add("active");
    }

    if(arsBtn) {
      arsBtn.classList.remove("active");
    }

  }

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

          <p>
  ${formatPrice(
    product.price,
    product.productCurrency || product.originalCurrency || "USD"
  )}
</p>

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

  if (window.saveFavoritesToFirebase) {
    saveFavoritesToFirebase(favorites);
  }

  updateFavoriteButtons();
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

  if (!header) return;

  if(window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});

function openAccountModal() {

  const customer =
    JSON.parse(localStorage.getItem("customer")) || null;

  if (customer) {
    window.location.href = "cuenta.html";
    return;
  }

  const modal =
    document.getElementById("accountModal");

  if (modal) {
    modal.classList.add("active");
  }
}

function closeAccountModal() {
  const modal = document.getElementById("accountModal");
  if (!modal) return;

  modal.classList.remove("active");
}

function showAccountLogin() {
  const loginForm = document.getElementById("accountLoginForm");
  const registerForm = document.getElementById("accountRegisterForm");
  const tabs = document.querySelectorAll(".account-tab");

  if (!loginForm || !registerForm || tabs.length < 2) return;

  loginForm.classList.add("active");
  registerForm.classList.remove("active");

  tabs[0].classList.add("active");
  tabs[1].classList.remove("active");
}

function showAccountRegister() {
  const loginForm = document.getElementById("accountLoginForm");
  const registerForm = document.getElementById("accountRegisterForm");
  const tabs = document.querySelectorAll(".account-tab");

  if (!loginForm || !registerForm || tabs.length < 2) return;

  registerForm.classList.add("active");
  loginForm.classList.remove("active");

  tabs[1].classList.add("active");
  tabs[0].classList.remove("active");
}

function registerCustomerDemo() {
  const name = document.getElementById("accountRegisterName").value;
  const phone = document.getElementById("accountRegisterPhone").value;
  const email = document.getElementById("accountRegisterEmail").value;
  const password = document.getElementById("accountRegisterPassword").value;

  if (!name || !phone || !email || !password) {
    showToast("Completá todos los datos");
    return;
  }

  const customer = {
    name,
    phone,
    email
  };

  localStorage.setItem("customer", JSON.stringify(customer));

  showToast("Cuenta creada correctamente");

  loadCustomerProfile();
}

function loginCustomerDemo() {
  const email = document.getElementById("accountLoginEmail").value;
  const password = document.getElementById("accountLoginPassword").value;

  const customer =
    JSON.parse(localStorage.getItem("customer"));

  if (!customer) {
    showToast("Primero creá una cuenta");
    return;
  }

  if (email !== customer.email || !password) {
    showToast("Email o contraseña incorrectos");
    return;
  }

  showToast("Sesión iniciada");

  loadCustomerProfile();
}

function loadCustomerProfile() {
  const customer =
    JSON.parse(localStorage.getItem("customer"));

  if (!customer) return;

  const accountTitle = document.getElementById("accountTitle");
  const accountSubtitle = document.getElementById("accountSubtitle");
  const accountTabs = document.getElementById("accountTabs");
  const accountLoginForm = document.getElementById("accountLoginForm");
  const accountRegisterForm = document.getElementById("accountRegisterForm");
  const accountProfile = document.getElementById("accountProfile");

  if (!accountTitle || !accountSubtitle || !accountTabs || !accountLoginForm || !accountRegisterForm || !accountProfile) {
    return;
  }

  accountTitle.innerText =
    "Hola, " + customer.name;

  accountSubtitle.innerText =
    "Estos son tus datos guardados en VM STORE.";

  accountTabs.style.display =
    "none";

  accountLoginForm.classList.remove("active");
  accountRegisterForm.classList.remove("active");

  accountProfile.classList.add("active");

  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profilePhone = document.getElementById("profilePhone");

  if (profileName) profileName.innerText = customer.name || "";
  if (profileEmail) profileEmail.innerText = customer.email || "";
  if (profilePhone) profilePhone.innerText = customer.phone || "";

  const profileAddress = document.getElementById("profileAddress");
  const profileCity = document.getElementById("profileCity");
  const shippingAddress = document.getElementById("shippingAddress");
  const shippingCity = document.getElementById("shippingCity");

  if (profileAddress) {
    profileAddress.innerText = customer.address || "Sin cargar";
  }

  if (profileCity) {
    profileCity.innerText = customer.city || "Sin cargar";
  }

  if (shippingAddress) {
    shippingAddress.value = customer.address || "";
  }

  if (shippingCity) {
    shippingCity.value = customer.city || "";
  }

  const accountHeaderBtn =
    document.getElementById("accountHeaderBtn");

  if (accountHeaderBtn) {
    accountHeaderBtn.innerText = "👤 Mi cuenta";
  }

  fillBudgetClientData(false);
  renderCustomerOrders();
}


function toggleOrderDetail(button) {
  const detail =
    button.nextElementSibling;

  detail.classList.toggle("active");

  button.innerText =
    detail.classList.contains("active")
      ? "Ocultar detalle"
      : "Ver detalle";
}

function logoutCustomerDemo() {

  const hadCustomer =
    localStorage.getItem("customer");

  localStorage.removeItem("customer");

  document.getElementById("accountTitle").innerText =
    "Mi cuenta";

  document.getElementById("accountSubtitle").innerText =
    "Iniciá sesión o creá tu cuenta para guardar tus presupuestos.";

  document.getElementById("accountTabs").style.display =
    "grid";

  document.getElementById("accountProfile").classList.remove("active");

  showAccountLogin();

  const accountHeaderBtn =
    document.getElementById("accountHeaderBtn");

  if (accountHeaderBtn) {
    accountHeaderBtn.innerText = "👤 Mi cuenta";
  }

  if (hadCustomer) {
    showToast("Sesión cerrada");
  }

}

function fillBudgetClientData(showMessage = true) {

  const customer =
    JSON.parse(localStorage.getItem("customer"));

  if (!customer) return;

  const clientName =
    document.getElementById("clientName");

  const clientPhone =
    document.getElementById("clientPhone");

  if (clientName) {
    clientName.value = customer.name;
  }

  if (clientPhone) {
    clientPhone.value = customer.phone;
  }

  if (showMessage) {
    showToast("Datos cargados en el presupuesto");
  }

}

window.addEventListener("DOMContentLoaded", () => {
  loadCustomerProfile();
});

function saveShippingData() {
  const address =
    document.getElementById("shippingAddress")?.value;

  const city =
    document.getElementById("shippingCity")?.value;

  if (!address || !city) {
    showToast("Completá dirección y ciudad");
    return;
  }

  const customer =
    JSON.parse(localStorage.getItem("customer")) || {};

  customer.address = address;
  customer.city = city;

  localStorage.setItem("customer", JSON.stringify(customer));

  document.getElementById("profileAddress").innerText = address;
  document.getElementById("profileCity").innerText = city;

  if (window.saveShippingDataToFirebase) {
    saveShippingDataToFirebase(address, city);
  }
}

function openAdminPanel() {
  window.location.href = "admin.html";
}

function closeAdminPanel() {
  const modal = document.getElementById("adminModal");

  if (!modal) return;

  modal.classList.remove("active");

  modal.style.display = "none";
  modal.style.opacity = "0";
  modal.style.pointerEvents = "none";
}

async function payWithMercadoPago() {

  const currentCart =
    getSafeLocalStorage("cart", []);

  if (!currentCart || currentCart.length === 0) {
    showToast("El carrito está vacío");
    return;
  }

  try {

    const response = await fetch("/api/create-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
  items: currentCart,
  exchangeRate: exchangeRate
})
    });

    const data = await response.json();

    if (!data.init_point) {
      showToast("No se pudo iniciar Mercado Pago");
      return;
    }

    window.location.href = data.init_point;

  } catch (error) {

    console.log(error);
    showToast("Error conectando con Mercado Pago");

  }

}

async function saveCustomerOrder() {
  if (!cart || cart.length === 0) {
    showToast("El carrito está vacío");
    return;
  }

  const customer =
    JSON.parse(localStorage.getItem("customer")) || null;

  if (!customer) {
    showToast("Iniciá sesión para guardar el pedido");
    openAccountModal();
    return;
  }

  const order = {
    customerName: customer.name || "",
    customerEmail: customer.email || "",
    customerPhone: customer.phone || "",
    items: cart,
    total: cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0),
    currency: currency,
    status: "Pendiente",
    createdAt: new Date().toLocaleString("es-AR")
  };

  localStorage.setItem(
    "lastOrder",
    JSON.stringify(order)
  );

  showToast("Pedido generado correctamente");

  return order;
}

async function renderCustomerOrders() {
  const container = document.getElementById("customerOrdersList");
  if (!container) return;

  if (window.loadCustomerFromFirebase) {
    try {
      await window.loadCustomerFromFirebase();
    } catch (error) {
      console.log("No se pudieron actualizar los pedidos desde Firebase", error);
    }
  }

  const customer =
    JSON.parse(localStorage.getItem("customer")) || null;

  const localOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const orders =
    customer && Array.isArray(customer.orders)
      ? customer.orders
      : localOrders;

  if (orders.length === 0) {
    container.innerHTML = `
      <p class="empty-orders">
        Todavía no tenés pedidos.
      </p>
    `;
    return;
  }

  container.innerHTML = "";

  orders.slice().reverse().forEach(order => {
    const itemsHtml = (order.items || []).map(item => `
      <div class="order-product">
        <span>${item.name} x${item.quantity || 1}</span>
        <strong>
          ${formatPrice(
            Number(item.price) * Number(item.quantity || 1),
            item.productCurrency || item.originalCurrency || order.currency || "USD"
          )}
        </strong>
      </div>
    `).join("");

    const finalTotalARS =
      (order.items || []).reduce((sum, item) => {
        const itemCurrency =
          item.productCurrency || item.originalCurrency || "USD";

        if (itemCurrency === "ARS") {
          return sum + Number(item.price) * Number(item.quantity || 1);
        }

        return sum + Number(item.price) * Number(item.quantity || 1) * exchangeRate;
      }, 0) + Number(order.shippingCost || 0);

    const canUploadReceipt =
      !order.receiptUrl &&
      (order.paymentMethod || "").toLowerCase().includes("transferencia");

    const receiptHtml = order.receiptUrl
  ? `<div class="order-receipt-box">
      <span>Comprobante:</span>
      <a href="${order.receiptUrl}" target="_blank">Ver comprobante</a>
    </div>`
  : canUploadReceipt
    ? `<button class="order-receipt-btn" onclick="sendReceiptWhatsapp('${order.id}')">
        Enviar comprobante por WhatsApp
      </button>`
    : "";

    container.innerHTML += `
      <div class="order-card">

        <div class="order-card-header">
          <strong>Pedido #${order.id || "Pedido"}</strong>
          <span>${order.status || "Pendiente"}</span>
        </div>

        <div class="order-info-grid">
          <p><strong>Fecha:</strong> ${order.createdAt || order.date || "-"}</p>
          <p><strong>Pago:</strong> ${order.paymentStatus || "No pagado"}</p>
          <p><strong>Método:</strong> ${order.paymentMethod || "-"}</p>
          <p>
            <strong>Entrega:</strong>
            ${
              order.deliveryMethod === "shipping"
                ? "Envío a domicilio"
                : "Retiro / coordinar"
            }
          </p>
          <p><strong>Código postal:</strong> ${order.shippingZip || "-"}</p>
          <p><strong>Empresa:</strong> ${order.shippingCompany || "-"}</p>
          <p><strong>Seguimiento:</strong> ${order.trackingCode || "-"}</p>
        </div>

        

        <div class="order-tracker">
  <div class="order-tracker-step ${["Pendiente","Pendiente de revisión","Preparando","Enviado","Entregado"].indexOf(order.status || "Pendiente") >= 0 ? "active" : ""}">
    <div class="order-tracker-icon">✓</div>
    <span>Pendiente</span>
  </div>

  <div class="order-tracker-step ${["Pendiente","Pendiente de revisión","Preparando","Enviado","Entregado"].indexOf(order.status || "Pendiente") >= 1 ? "active" : ""}">
    <div class="order-tracker-icon">✓</div>
    <span>Revisión</span>
  </div>

  <div class="order-tracker-step ${["Pendiente","Pendiente de revisión","Preparando","Enviado","Entregado"].indexOf(order.status || "Pendiente") >= 2 ? "active" : ""}">
    <div class="order-tracker-icon">✓</div>
    <span>Preparando</span>
  </div>

  <div class="order-tracker-step ${["Pendiente","Pendiente de revisión","Preparando","Enviado","Entregado"].indexOf(order.status || "Pendiente") >= 3 ? "active" : ""}">
    <div class="order-tracker-icon">✓</div>
    <span>Enviado</span>
  </div>

  <div class="order-tracker-step ${["Pendiente","Pendiente de revisión","Preparando","Enviado","Entregado"].indexOf(order.status || "Pendiente") >= 4 ? "active" : ""}">
    <div class="order-tracker-icon">✓</div>
    <span>Entregado</span>
  </div>
</div>

        <div class="order-detail active">

          ${itemsHtml}
        </div>

        ${receiptHtml}

        <div class="order-total-box">
          <span>Total final</span>
          <strong>
            ARS ${Number(finalTotalARS).toLocaleString("es-AR")}
          </strong>
        </div>

      </div>
    `;
  });
}

window.renderCustomerOrders = renderCustomerOrders;

function setIphoneSection(category, button) {
  currentCategory = category;

  document.querySelectorAll(".iphone-tab").forEach(tab => {
    tab.classList.remove("active");
  });

  button.classList.add("active");

  const accessoryFilters =
    document.getElementById("accessoryFilters");

    const accessoryTypeFilters =
  document.getElementById("accessoryTypeFilters");

  if (accessoryFilters) {
    accessoryFilters.style.display =
  category === "accesorios-apple"
    ? "flex"
    : "none";
  }

  if (accessoryTypeFilters) {
  accessoryTypeFilters.style.display =
    category === "accesorios-apple"
      ? "flex"
      : "none";
}

  

  renderProducts(category);
}



function filterAppleAccessories(typeFilter = null, modelFilter = null, button = null) {
  if (typeFilter !== null) {
    currentAccessoryType = typeFilter;

    document.querySelectorAll(".type-tab").forEach(tab => {
      tab.classList.remove("active");
    });

    if (button) button.classList.add("active");
  }

  if (modelFilter !== null) {
    currentAccessoryModel = modelFilter;

    document.querySelectorAll(".model-tab").forEach(tab => {
      tab.classList.remove("active");
    });

    if (button) button.classList.add("active");
  }

  let accessories =
    products["accesorios-apple"] || [];

  accessories = accessories.filter(product => {
    const matchType =
      currentAccessoryType === "all" ||
      product.subCategory === currentAccessoryType;

    const matchModel =
      currentAccessoryModel === "all" ||
      (
        product.compatibleModels &&
        product.compatibleModels.includes(currentAccessoryModel)
      );

    return matchType && matchModel;
  });

  renderFilteredProducts(accessories);
}

function showAdminSection(section, button) {

  document.querySelectorAll(".admin-menu-btn")
    .forEach(btn => btn.classList.remove("active"));

  if(button) {
    button.classList.add("active");
  }

  document.querySelectorAll(".admin-section")
    .forEach(sectionBox => {
      sectionBox.classList.remove("active");
    });

    if(section === "orders" && window.loadAllOrdersForAdmin) {
  loadAllOrdersForAdmin();
}

if(section === "customers" && window.loadCustomersForAdmin) {
  loadCustomersForAdmin();
}

  const selectedSection =
    document.getElementById(
      "adminSection" +
      section.charAt(0).toUpperCase() +
      section.slice(1)
    );

  if(selectedSection) {
    selectedSection.classList.add("active");
  }

}

function saveExchangeRate() {

  const rate =
    Number(
      document.getElementById("exchangeRateInput").value
    );

  if(!rate || rate <= 0) {
    showToast("Ingresá un valor válido");
    return;
  }

  localStorage.setItem(
    "exchangeRate",
    rate
  );

  showToast(
    "Tipo de cambio actualizado"
  );

}

function saveStoreSettings() {

  const rate =
    Number(
      document.getElementById("exchangeRateInput").value
    );

  const whatsapp =
    document.getElementById("storeWhatsapp").value;

  const instagram =
    document.getElementById("storeInstagram").value;

  const email =
    document.getElementById("storeEmail").value;

  localStorage.setItem(
    "exchangeRate",
    rate || 1300
  );

  localStorage.setItem(
    "storeWhatsapp",
    whatsapp
  );

  localStorage.setItem(
    "storeInstagram",
    instagram
  );

  localStorage.setItem(
    "storeEmail",
    email
  );

  exchangeRate =
    Number(
      localStorage.getItem("exchangeRate")
    ) || 1300;

  showToast(
    "Configuración guardada"
  );

}

function applyStoreSettings() {

  const whatsapp =
    localStorage.getItem("storeWhatsapp");

  const instagram =
    localStorage.getItem("storeInstagram");

  const email =
    localStorage.getItem("storeEmail");

  const whatsappButtons =
    document.querySelectorAll(".whatsapp-float");

  whatsappButtons.forEach(button => {
    if(whatsapp) {
      button.href =
        `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
    }
  });

  const instagramLinks =
    document.querySelectorAll("[data-store-instagram]");

  instagramLinks.forEach(link => {
    if(instagram) {
      link.href =
        `https://instagram.com/${instagram.replace("@", "")}`;
    }
  });

  const emailLinks =
    document.querySelectorAll("[data-store-email]");

  emailLinks.forEach(link => {
    if(email) {
      link.href = `mailto:${email}`;
      link.innerText = email;
    }
  });

}

function filterAdminProducts() {

  const input =
    document.getElementById("adminSearchInput");

  if(!input) return;

  const search =
    input.value.toLowerCase().trim();

  const rows =
    document.querySelectorAll(".admin-product-row");

  rows.forEach(row => {

    const text =
      row.innerText.toLowerCase();

    row.style.display =
      text.includes(search)
        ? "grid"
        : "none";

  });

}

function openPaymentModal() {

  document
    .getElementById("paymentModal")
    .classList.add("active");

}

function closePaymentModal() {

  document
    .getElementById("paymentModal")
    .classList.remove("active");

}

function transferARS() {
  selectedPaymentMethod = "Transferencia ARS";

  closePaymentModal();

  openBankModal({
    title: "Transferencia en pesos",
    text: "Transferí el total en ARS y luego enviá el comprobante por WhatsApp.",
    alias: "TU-ALIAS-ARS",
    cbu: "TU-CBU-ARS"
  });
}

function transferUSD() {
  selectedPaymentMethod = "Transferencia USD";

  closePaymentModal();

  openBankModal({
    title: "Transferencia en dólares",
    text: "Transferí el total en USD y luego enviá el comprobante por WhatsApp.",
    alias: "TU-ALIAS-USD",
    cbu: "TU-CBU-USD"
  });
}

function finishTransferOrder() {
  finishCartOrder(
    selectedPaymentMethod,
    "Pendiente de comprobante"
  );
}

function openReceiptUpload(orderId) {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = "image/*,.pdf";

  input.onchange = function () {
    handleReceiptFile(input, orderId);
  };

  input.click();
}

window.openReceiptUpload = openReceiptUpload;

window.handleReceiptFile = async function(input, orderId) {
  const file = input.files[0];

  if (!file) return;

  if (!window.uploadReceiptToFirebase) {
    showToast("La subida de comprobantes todavía no está disponible");
    return;
  }

  await window.uploadReceiptToFirebase(orderId, file);
};

function openBankModal(data) {

  document.getElementById("bankModalTitle").innerText = data.title;
  document.getElementById("bankModalText").innerText = data.text;
  document.getElementById("bankAlias").innerText = data.alias;
  document.getElementById("bankCbu").innerText = data.cbu;

  document
    .getElementById("bankModal")
    .classList.add("active");

}

function closeBankModal() {

  document
    .getElementById("bankModal")
    .classList.remove("active");

}

function copyBankData(id) {

  const text =
    document.getElementById(id).innerText;

  navigator.clipboard.writeText(text);

  showToast("Dato copiado");

}

let shippingCost = 0;

function calculateShipping() {

  const deliveryMethod =
  document.querySelector('input[name="deliveryMethod"]:checked')?.value || "pickup";
  const zipInput = document.getElementById("shippingZip");
  const estimate = document.getElementById("shippingEstimate");

  if (!zipInput || !estimate) return;

  const zip = zipInput.value.trim();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (deliveryMethod === "pickup") {
  shippingCost = 0;
  estimate.innerText =
  "✅ Retiro sin costo o entrega a coordinar.";

  updateCart();
  return;
}

  if (!zip) {
    shippingCost = 0;
    estimate.innerText = "Ingresá tu CP para calcular el envío.";
    updateCart();
    return;
  }

  if (totalItems === 0) {
    shippingCost = 0;
    estimate.innerText = "Agregá productos al carrito.";
    return;
  }

  if (totalItems === 1) shippingCost = 4500;
  if (totalItems === 2) shippingCost = 5500;
  if (totalItems >= 3) shippingCost = 6500;

  if (Number(zip) >= 5000) {
    shippingCost += 1500;
  }

  estimate.innerText =
  `🚚 Envío estimado: ARS ${shippingCost.toLocaleString("es-AR")}`;

  updateCart();
}

function loadAccountPage() {

  const customer =
    JSON.parse(localStorage.getItem("customer")) || null;

  if (!document.querySelector(".account-page")) return;

  if (!customer) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("accountPageName").innerText =
    customer.name || "-";

  document.getElementById("accountPageEmail").innerText =
    customer.email || "-";

  document.getElementById("accountPagePhone").innerText =
    customer.phone || "-";

  document.getElementById("accountPageAddress").innerText =
    customer.address || "-";

  document.getElementById("accountPageCity").innerText =
    customer.city || "-";

  renderCustomerOrders();
}

window.addEventListener("DOMContentLoaded", () => {
  loadAccountPage();
});

function showAccountSection(section, button) {

  const customer =
  JSON.parse(localStorage.getItem("customer")) || null;

if (!customer) {
  window.location.href = "index.html";
  return;
}

  document.querySelectorAll(".account-section")
    .forEach(item => item.classList.remove("active"));

  document.querySelectorAll(".account-menu-btn")
    .forEach(item => item.classList.remove("active"));

  document
    .getElementById("accountSection" + section.charAt(0).toUpperCase() + section.slice(1))
    .classList.add("active");

  button.classList.add("active");
}

function updateAccountHeaderButton() {

  const accountBtn =
    document.getElementById("accountHeaderBtn");

  if (!accountBtn) return;

  const customer =
    JSON.parse(localStorage.getItem("customer")) || null;

  if (customer) {
    accountBtn.innerHTML = "👤 Mi cuenta";
  } else {
    accountBtn.innerHTML = "👤 Ingresar";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateAccountHeaderButton();
});

function generateOrderTracker(status = "Pendiente") {

  const states = [
    "Pendiente",
    "Preparando",
    "Enviado",
    "Entregado"
  ];

  const normalizedStatus =
    status === "Pendiente de revisión"
      ? "Pendiente"
      : status;

  const currentIndex =
    states.indexOf(normalizedStatus);

  return `
    <div class="order-tracker">

      ${states.map((step, index) => `

        <div class="tracker-step ${
          index <= currentIndex
            ? "active"
            : ""
        }">

          <div class="tracker-circle">
            ${index <= currentIndex ? "✓" : ""}
          </div>

          <span>${step}</span>

        </div>

      `).join("")}

    </div>
  `;
}

function saveOrderTracking(orderId) {

  const statusInput =
    document.getElementById(`trackingStatus-${orderId}`);

  const companyInput =
    document.getElementById(`shippingCompany-${orderId}`);

  const codeInput =
    document.getElementById(`trackingCode-${orderId}`);

  const urlInput =
    document.getElementById(`trackingUrl-${orderId}`);

  let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.map(order => {
    if (String(order.id) === String(orderId)) {
      return {
        ...order,
        status: statusInput ? statusInput.value : order.status,
        shippingCompany: companyInput ? companyInput.value : "",
        trackingCode: codeInput ? codeInput.value : "",
        trackingUrl: urlInput ? urlInput.value : ""
      };
    }

    return order;
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  showToast("Seguimiento guardado");

  loadAllOrdersForAdmin();
}

window.loadAllOrdersForAdmin = async function() {
  const container = document.getElementById("adminOrdersList");
  if (!container) return;

  container.innerHTML = `<p class="empty-orders">Cargando pedidos...</p>`;

  let orders = [];

  try {
    if (window.getAllOrdersFromFirebase) {
      orders = await window.getAllOrdersFromFirebase();
    } else {
      orders = JSON.parse(localStorage.getItem("orders")) || [];
    }
  } catch (error) {
    console.error("Error cargando pedidos:", error);
    orders = JSON.parse(localStorage.getItem("orders")) || [];
  }

  if (!orders || orders.length === 0) {
    container.innerHTML = `<p class="empty-orders">No hay pedidos cargados.</p>`;
    return;
  }

  container.innerHTML = "";

  orders.slice().reverse().forEach(order => {
    const itemsHtml = (order.items || []).map(item => `
      <div class="admin-order-item">
        <span>${item.name} x${item.quantity || 1}</span>
        <strong>
          ${formatPrice(
            Number(item.price) * Number(item.quantity || 1),
            item.productCurrency || item.originalCurrency || order.currency || "USD"
          )}
        </strong>
      </div>
    `).join("");

    const receiptHtml = order.receiptUrl
      ? `
        <p>
          <strong>Comprobante:</strong>
          <a href="${order.receiptUrl}" target="_blank">
            Ver comprobante
          </a>
        </p>
      `
      : `
        <p>
          <strong>Comprobante:</strong>
          Sin comprobante cargado
        </p>
      `;

    container.innerHTML += `
      <div class="admin-order-card">
        <h3>Pedido #${order.id}</h3>

        <p><strong>Cliente:</strong> ${order.customerName || "-"}</p>
        <p><strong>Email:</strong> ${order.customerEmail || "-"}</p>
        <p><strong>Fecha:</strong> ${order.date || order.createdAt || "-"}</p>
        <p><strong>Pago:</strong> ${order.paymentStatus || "No pagado"}</p>
        <p><strong>Método:</strong> ${order.paymentMethod || "-"}</p>

        ${receiptHtml}

        <div class="admin-order-products">
          ${itemsHtml}
        </div>

        <label>Estado del pedido</label>

        <select id="trackingStatus-${order.id}">
          <option value="Pendiente" ${order.status === "Pendiente" ? "selected" : ""}>Pendiente</option>
          <option value="Preparando" ${order.status === "Preparando" ? "selected" : ""}>Preparando</option>
          <option value="Pendiente de revisión" ${order.status === "Pendiente de revisión" ? "selected" : ""}>Pendiente de revisión</option>
          <option value="Enviado" ${order.status === "Enviado" ? "selected" : ""}>Enviado</option>
          <option value="Entregado" ${order.status === "Entregado" ? "selected" : ""}>Entregado</option>
          <option value="Cancelado" ${order.status === "Cancelado" ? "selected" : ""}>Cancelado</option>
        </select>

        <input id="shippingCompany-${order.id}" type="text" placeholder="Empresa de envío" value="${order.shippingCompany || ""}">
        <input id="trackingCode-${order.id}" type="text" placeholder="Código de seguimiento" value="${order.trackingCode || ""}">
        <input id="trackingUrl-${order.id}" type="text" placeholder="Link de seguimiento" value="${order.trackingUrl || ""}">

        <button class="btn btn-primary" onclick="saveOrderTracking('${order.id}', '${order.customerId || ""}')">
          Guardar seguimiento
        </button>
      </div>
    `;
  });
};

window.saveOrderTracking = function(orderId) {
  const statusInput = document.getElementById(`trackingStatus-${orderId}`);
  const companyInput = document.getElementById(`shippingCompany-${orderId}`);
  const codeInput = document.getElementById(`trackingCode-${orderId}`);
  const urlInput = document.getElementById(`trackingUrl-${orderId}`);

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.map(order => {
    if (String(order.id) === String(orderId)) {
      return {
        ...order,
        status: statusInput ? statusInput.value : order.status,
        shippingCompany: companyInput ? companyInput.value.trim() : "",
        trackingCode: codeInput ? codeInput.value.trim() : "",
        trackingUrl: urlInput ? urlInput.value.trim() : ""
      };
    }

    return order;
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  showToast("Seguimiento guardado");

  window.loadAllOrdersForAdmin();
};

/* =========================
   PARCHE FINAL PEDIDOS VM STORE
========================= */

async function finishCartOrder(
  paymentMethod = "WhatsApp",
  paymentStatus = "Pendiente de pago"
) {
  const currentCart = getSafeLocalStorage("cart", []);

  if (!currentCart || currentCart.length === 0) {
    showToast("El carrito está vacío");
    return;
  }

  const customer = JSON.parse(localStorage.getItem("customer")) || null;

  if (!customer) {
    showToast("Iniciá sesión para generar el pedido");
    openAccountModal();
    return;
  }

  const deliveryMethod =
    document.querySelector('input[name="deliveryMethod"]:checked')?.value || "pickup";

  const shippingZip =
    document.getElementById("shippingZip")?.value || "";

  const total = currentCart.reduce((sum, item) => {
    const itemCurrency =
      item.productCurrency || item.originalCurrency || "USD";

    const itemPrice =
      itemCurrency === "ARS"
        ? Number(item.price) / exchangeRate
        : Number(item.price);

    return sum + itemPrice * Number(item.quantity || 1);
  }, 0);

  const order = {
    id: Date.now(),
    customerId: customer.uid || customer.id || "",
    date: new Date().toLocaleString("es-AR"),

    customerName: customer.name || "Cliente",
    customerEmail: customer.email || "",
    customerPhone: customer.phone || "",

    items: [...currentCart],
    total,
    currency: "USD",
    displayCurrency: currency,

    status: "Pendiente",
    paymentMethod,
    paymentStatus,
    receiptUrl: "",

    deliveryMethod,
    shippingZip,
    shippingCost: shippingCost || 0,

    shippingCompany: "",
    trackingCode: "",
    trackingUrl: ""
  };

  try {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("lastOrder", JSON.stringify(order));

    customer.orders = customer.orders || [];
    customer.orders.push(order);
    localStorage.setItem("customer", JSON.stringify(customer));

    if (window.saveOrderToFirebase) {
      await window.saveOrderToFirebase(order);
    }

    showToast("Pedido generado correctamente");

    await renderCustomerOrders();

    if (window.loadAllOrdersForAdmin) {
      await window.loadAllOrdersForAdmin();
    }

  } catch (error) {
    console.error("Error guardando pedido:", error);
    showToast("El pedido quedó guardado localmente, pero falló Firebase");
  }
}

window.finishCartOrder = finishCartOrder;

async function renderCustomerOrders() {
  const container = document.getElementById("customerOrdersList");
  if (!container) return;

  const customer = JSON.parse(localStorage.getItem("customer")) || null;
  const localOrders = JSON.parse(localStorage.getItem("orders")) || [];

  let customerOrders =
    customer && Array.isArray(customer.orders)
      ? customer.orders
      : [];

  const allOrders = [...customerOrders, ...localOrders];

  const uniqueOrders = allOrders.filter((order, index, self) =>
    index === self.findIndex(o => String(o.id) === String(order.id))
  );

  if (uniqueOrders.length === 0) {
    container.innerHTML = `
      <p class="empty-orders">
        Todavía no tenés pedidos.
      </p>
    `;
    return;
  }

  container.innerHTML = "";

  uniqueOrders.slice().reverse().forEach(order => {
    const itemsHtml = (order.items || []).map(item => `
      <div class="order-product">
        <span>${item.name} x${item.quantity || 1}</span>
        <strong>
          ${formatPrice(
            Number(item.price) * Number(item.quantity || 1),
            item.productCurrency || item.originalCurrency || order.currency || "USD"
          )}
        </strong>
      </div>
    `).join("");

    const canUploadReceipt =
      !order.receiptUrl &&
      (order.paymentMethod || "").toLowerCase().includes("transferencia");

    const receiptHtml = order.receiptUrl
      ? `<div class="order-receipt-box">
          <span>Comprobante:</span>
          <a href="${order.receiptUrl}" target="_blank">Ver comprobante</a>
        </div>`
      : canUploadReceipt
        ? `<button class="order-receipt-btn" onclick="openReceiptUpload('${order.id}')">
            Enviar comprobante por WhatsApp
          </button>`
        : "";

    container.innerHTML += `
      <div class="order-card">
        <div class="order-card-header">
          <strong>Pedido #${order.id}</strong>
          <span>${order.status || "Pendiente"}</span>
        </div>

        <p><strong>Fecha:</strong> ${order.date || order.createdAt || "-"}</p>
        <p><strong>Pago:</strong> ${order.paymentStatus || "No pagado"}</p>
        <p><strong>Método:</strong> ${order.paymentMethod || "-"}</p>

        ${itemsHtml}
        ${receiptHtml}
      </div>
    `;
  });
}

window.renderCustomerOrders = renderCustomerOrders;

window.loadAllOrdersForAdmin = async function() {
  const container = document.getElementById("adminOrdersList");
  if (!container) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (window.getAllOrdersFromFirebase) {
    try {
      const firebaseOrders = await window.getAllOrdersFromFirebase();
      orders = [...orders, ...firebaseOrders];
    } catch (error) {
      console.error("No se pudieron traer pedidos de Firebase:", error);
    }
  }

  orders = orders.filter((order, index, self) =>
    index === self.findIndex(o => String(o.id) === String(order.id))
  );

  if (orders.length === 0) {
    container.innerHTML = `<p class="empty-orders">No hay pedidos cargados.</p>`;
    return;
  }

  container.innerHTML = "";

  orders.slice().reverse().forEach(order => {
    const itemsHtml = (order.items || []).map(item => `
      <div class="admin-order-item">
        <span>${item.name} x${item.quantity || 1}</span>
        <strong>${formatPrice(Number(item.price) * Number(item.quantity || 1), item.productCurrency || "USD")}</strong>
      </div>
    `).join("");

    const receiptHtml = order.receiptUrl
      ? `<p><strong>Comprobante:</strong> <a href="${order.receiptUrl}" target="_blank">Ver comprobante</a></p>`
      : `<p><strong>Comprobante:</strong> Sin comprobante cargado</p>`;

    container.innerHTML += `
      <div class="admin-order-card">
        <h3>Pedido #${order.id}</h3>

        <p><strong>Cliente:</strong> ${order.customerName || "-"}</p>
        <p><strong>Email:</strong> ${order.customerEmail || "-"}</p>
        <p><strong>WhatsApp:</strong> ${order.customerPhone || "-"}</p>
        <p><strong>Fecha:</strong> ${order.date || order.createdAt || "-"}</p>
        <p><strong>Pago:</strong> ${order.paymentStatus || "No pagado"}</p>
        <p><strong>Método:</strong> ${order.paymentMethod || "-"}</p>

        ${receiptHtml}

        <div class="admin-order-products">
          ${itemsHtml}
        </div>
      </div>
    `;
  });
};

window.sendReceiptWhatsapp = function(orderId) {
  const customer =
    JSON.parse(localStorage.getItem("customer")) || {};

  const message = `Hola VM STORE.
Quiero enviar el comprobante del pedido #${orderId}

Nombre: ${customer.name || ""}
Email: ${customer.email || ""}

Adjunto el comprobante en este chat.`;

  window.open(
    `https://wa.me/5491165937718?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

window.sendReceiptWhatsapp = function(orderId) {
  const customer =
    JSON.parse(localStorage.getItem("customer")) || {};

  const message = `Hola VM STORE.
Quiero enviar el comprobante del pedido #${orderId}

Nombre: ${customer.name || ""}
Email: ${customer.email || ""}

Adjunto el comprobante en este chat.`;

  window.open(
    `https://wa.me/5491165937718?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

window.openReceiptUpload = function(orderId) {
  sendReceiptWhatsapp(orderId);
};

function generateOrderTracker(status = "Pendiente") {
  const steps = [
    "Pendiente",
    "Pendiente de revisión",
    "Preparando",
    "Enviado",
    "Entregado"
  ];

  const currentIndex = steps.indexOf(status);

  return `
    <div class="order-tracker">
      ${steps.map((step, index) => {
        const isActive = index <= currentIndex;

        return `
          <div class="order-tracker-step ${isActive ? "active" : ""}">
            <div class="order-tracker-icon">
              ${isActive ? "✓" : index + 1}
            </div>
            <span>${step}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

window.generateOrderTracker = generateOrderTracker;

/* =========================
   FIX FINAL VM STORE - MIS PEDIDOS
   - Muestra tracker de estado
   - Comprobante por WhatsApp
   - No usa Firebase Storage
========================= */

window.sendReceiptWhatsapp = function(orderId) {
  const customer =
    JSON.parse(localStorage.getItem("customer")) || {};

  const message = `Hola VM STORE.
Quiero enviar el comprobante del pedido #${orderId}

Nombre: ${customer.name || ""}
Email: ${customer.email || ""}

Adjunto el comprobante en este chat.`;

  window.open(
    `https://wa.me/5491165937718?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

window.openReceiptUpload = function(orderId) {
  window.sendReceiptWhatsapp(orderId);
};

function generateOrderTracker(status = "Pendiente") {
  const steps = [
    { key: "Pendiente", label: "Pedido" },
    { key: "Pendiente de revisión", label: "Revisión" },
    { key: "Preparando", label: "Preparando" },
    { key: "Enviado", label: "Enviado" },
    { key: "Entregado", label: "Entregado" }
  ];

  const normalizedStatus = status || "Pendiente";

  let currentIndex = steps.findIndex(step => step.key === normalizedStatus);

  if (currentIndex < 0) {
    currentIndex = 0;
  }

  return `
    <div class="order-tracker">
      ${steps.map((step, index) => {
        const isActive = index <= currentIndex;

        return `
          <div class="order-tracker-step ${isActive ? "active" : ""}">
            <div class="order-tracker-icon">
              ${isActive ? "✓" : index + 1}
            </div>
            <span>${step.label}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

window.generateOrderTracker = generateOrderTracker;

window.renderCustomerOrders = async function() {
  const container = document.getElementById("customerOrdersList");
  if (!container) return;

  if (window.loadCustomerFromFirebase) {
    try {
      await window.loadCustomerFromFirebase();
    } catch (error) {
      console.log("No se pudieron actualizar los pedidos desde Firebase", error);
    }
  }

  const customer = JSON.parse(localStorage.getItem("customer")) || null;
  const localOrders = JSON.parse(localStorage.getItem("orders")) || [];

  const customerOrders =
    customer && Array.isArray(customer.orders)
      ? customer.orders
      : [];

  const allOrders = [...customerOrders, ...localOrders];

  const uniqueOrders = allOrders.filter((order, index, self) =>
    index === self.findIndex(item => String(item.id) === String(order.id))
  );

  if (uniqueOrders.length === 0) {
    container.innerHTML = `
      <p class="empty-orders">
        Todavía no tenés pedidos.
      </p>
    `;
    return;
  }

  container.innerHTML = "";

  uniqueOrders.slice().reverse().forEach(order => {
    const itemsHtml = (order.items || []).map(item => `
      <div class="order-product">
        <span>${item.name} x${item.quantity || 1}</span>
        <strong>
          ${formatPrice(
            Number(item.price) * Number(item.quantity || 1),
            item.productCurrency || item.originalCurrency || order.currency || "USD"
          )}
        </strong>
      </div>
    `).join("");

    const finalTotalARS =
      (order.items || []).reduce((sum, item) => {
        const itemCurrency =
          item.productCurrency || item.originalCurrency || "USD";

        if (itemCurrency === "ARS") {
          return sum + Number(item.price) * Number(item.quantity || 1);
        }

        return sum + Number(item.price) * Number(item.quantity || 1) * exchangeRate;
      }, 0) + Number(order.shippingCost || 0);

    const canSendReceipt =
      !order.receiptUrl &&
      (order.paymentMethod || "").toLowerCase().includes("transferencia");

    const receiptHtml = order.receiptUrl
      ? `
        <div class="order-receipt-box">
          <span>Comprobante:</span>
          <a href="${order.receiptUrl}" target="_blank">Ver comprobante</a>
        </div>
      `
      : canSendReceipt
        ? `
          <button class="order-receipt-btn" onclick="sendReceiptWhatsapp('${order.id}')">
            Enviar comprobante por WhatsApp
          </button>
        `
        : "";

    container.innerHTML += `
      <div class="order-card">

        <div class="order-card-header">
          <strong>Pedido #${order.id || "Pedido"}</strong>
          <span>${order.status || "Pendiente"}</span>
        </div>

        <div class="order-info-grid">
          <p><strong>Fecha:</strong> ${order.createdAt || order.date || "-"}</p>
          <p><strong>Pago:</strong> ${order.paymentStatus || "No pagado"}</p>
          <p><strong>Método:</strong> ${order.paymentMethod || "-"}</p>
          <p>
            <strong>Entrega:</strong>
            ${
              order.deliveryMethod === "shipping"
                ? "Envío a domicilio"
                : "Retiro / coordinar"
            }
          </p>
          <p><strong>Código postal:</strong> ${order.shippingZip || "-"}</p>
          <p><strong>Empresa:</strong> ${order.shippingCompany || "-"}</p>
          <p><strong>Seguimiento:</strong> ${order.trackingCode || "-"}</p>
        </div>

        ${generateOrderTracker(order.status || "Pendiente")}

        <div class="order-detail active">
          ${itemsHtml}
        </div>

        ${receiptHtml}

        <div class="order-total-box">
          <span>Total final</span>
          <strong>
            ARS ${Number(finalTotalARS).toLocaleString("es-AR")}
          </strong>
        </div>

      </div>
    `;
  });
};

window.addEventListener("load", () => {
  if (document.getElementById("customerOrdersList")) {
    window.renderCustomerOrders();
  }
});
