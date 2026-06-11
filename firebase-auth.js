import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// PEGÁ ACÁ TU MISMA CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCCHPvPXi_3xh_DvgYxSpl0pRasy9HlLAg",
  authDomain: "vm-store-ab7f7.firebaseapp.com",
  projectId: "vm-store-ab7f7",
  storageBucket: "vm-store-ab7f7.firebasestorage.app",
  messagingSenderId: "936766595550",
  appId: "1:936766595550:web:f767f91bd558f7808bfd4f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.registerCustomerFirebase = async function () {
  const name = document.getElementById("accountRegisterName").value;
  const phone = document.getElementById("accountRegisterPhone").value;
  const email = document.getElementById("accountRegisterEmail").value;
  const password = document.getElementById("accountRegisterPassword").value;

  if (!name || !phone || !email || !password) {
    showToast("Completá todos los datos");
    return;
  }

  try {
    const userCredential =
      await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    await setDoc(doc(db, "customers", user.uid), {
      name,
      phone,
      email,
      createdAt: new Date()
    });

    showToast("Cuenta creada correctamente");

  } catch (error) {
    console.log(error);
    showToast("Error al crear cuenta");
  }
};

window.loginCustomerFirebase = async function () {
  const email = document.getElementById("accountLoginEmail").value;
  const password = document.getElementById("accountLoginPassword").value;

  if (!email || !password) {
    showToast("Completá email y contraseña");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showToast("Sesión iniciada");
  } catch (error) {
    console.log(error);
    showToast("Email o contraseña incorrectos");
  }
};

window.logoutCustomerFirebase = async function () {
  await signOut(auth);
  showToast("Sesión cerrada");
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const customerRef = doc(db, "customers", user.uid);
    const customerSnap = await getDoc(customerRef);

    if (customerSnap.exists()) {
      const customer = customerSnap.data();

      localStorage.setItem("customer", JSON.stringify(customer));

      if (window.loadCustomerProfile) {
        loadCustomerProfile();
      }

      if (window.fillBudgetClientData) {
        fillBudgetClientData(false);
      }

      if (window.loadFavoritesFromFirebase) {
  loadFavoritesFromFirebase();
}

if (window.loadCartFromFirebase) {
  loadCartFromFirebase();
}
    }
  } else {
    localStorage.removeItem("customer");

    if (window.logoutCustomerDemo) {
      logoutCustomerDemo();
    }
  }
});

window.saveFavoritesToFirebase = async function(favoritesArray) {
  const user = auth.currentUser;

  if (!user) return;

  try {
    await updateDoc(doc(db, "customers", user.uid), {
      favorites: favoritesArray
    });
  } catch (error) {
    console.log("Error guardando favoritos:", error);
  }
};

window.loadFavoritesFromFirebase = async function() {
  const user = auth.currentUser;

  if (!user) return;

  try {
    const customerSnap =
      await getDoc(doc(db, "customers", user.uid));

    if (customerSnap.exists()) {
      const customer = customerSnap.data();

      if (customer.favorites) {
        favorites = customer.favorites;

       localStorage.setItem(
  "favorites",
  JSON.stringify(favorites)
);

        const page =
  window.location.pathname.split("/").pop();

if(page === "tienda.html") {
  applyFilters();
} else if(page === "iphones.html") {
  renderProducts(currentCategory || "iphones");
} else {
  renderProducts(currentCategory);
}
        renderFavorites();
        renderFavoritesPanel();
      }
    }
  } catch (error) {
    console.log("Error cargando favoritos:", error);
  }
};

window.saveCartToFirebase = async function(cartArray) {
  const user = auth.currentUser;

  if (!user) return;

  try {
    await updateDoc(doc(db, "customers", user.uid), {
      cart: cartArray
    });
  } catch (error) {
    console.log("Error guardando carrito:", error);
  }
};

window.loadCartFromFirebase = async function() {
  const user = auth.currentUser;

  if (!user) return;

  try {
    const customerSnap =
      await getDoc(doc(db, "customers", user.uid));

    if (customerSnap.exists()) {
      const customer = customerSnap.data();

      if (customer.cart) {
        cart = customer.cart;

        localStorage.setItem(
  "cart",
  JSON.stringify(cart)
);

        updateCart();
      }
    }
  } catch (error) {
    console.log("Error cargando carrito:", error);
  }
};

window.saveOrderToFirebase = async function(orderData) {

  const user = auth.currentUser;

  if (!user) {
    showToast("Iniciá sesión para guardar pedidos");
    return;
  }

  try {

    await updateDoc(
      doc(db, "customers", user.uid),
      {
        orders: arrayUnion(orderData)
      }
    );

    console.log("Pedido guardado");

  } catch(error) {

    console.log("Error guardando pedido:", error);

  }

};

window.saveShippingDataToFirebase = async function(address, city) {
  const user = auth.currentUser;

  if (!user) {
    showToast("Iniciá sesión para guardar dirección");
    return;
  }

  try {
    await updateDoc(doc(db, "customers", user.uid), {
      address,
      city
    });

    showToast("Dirección guardada");
  } catch (error) {
    console.log("Error guardando dirección:", error);
    showToast("No se pudo guardar la dirección");
  }
};

window.loadAllOrdersForAdmin = async function() {
  const adminOrdersList =
    document.getElementById("adminOrdersList");

  if (!adminOrdersList) return;

  adminOrdersList.innerHTML = "Cargando pedidos...";

  try {
    const customersSnapshot =
      await getDocs(collection(db, "customers"));

    let allOrders = [];

    let totalCustomers = 0;

    customersSnapshot.forEach(customerDoc => {
      totalCustomers++;
      const customer = customerDoc.data();

      if (customer.orders) {
        customer.orders.forEach(order => {
          allOrders.push({
            ...order,
            customerId: customerDoc.id,
            customerName: customer.name,
            customerEmail: customer.email,
            customerPhone: customer.phone,
            customerAddress: customer.address || "Sin dirección",
            customerCity: customer.city || "Sin ciudad"
          });
        });
      }
    });

    if (allOrders.length === 0) {
      adminOrdersList.innerHTML = `
        <p class="no-orders">Todavía no hay pedidos.</p>
      `;
      return;
    }

    adminOrdersList.innerHTML = "";

    const totalSales =
  allOrders.reduce(
    (acc, order) => acc + Number(order.total || 0),
    0
  );

const pendingOrders =
  allOrders.filter(
    order => order.status === "Pendiente"
  ).length;

document.getElementById("totalOrders").innerText =
  allOrders.length;

document.getElementById("totalSales").innerText =
  formatPrice(totalSales);

document.getElementById("totalCustomers").innerText =
  totalCustomers;

document.getElementById("pendingOrders").innerText =
  pendingOrders;

    allOrders.reverse().forEach(order => {
      const card = document.createElement("div");
      card.className = "admin-order-card";

      const itemsHtml = order.items.map(item => `
        <div class="admin-order-product">
          <span>${item.name} x${item.quantity}</span>
          <strong>${formatPrice(item.price * item.quantity)}</strong>
        </div>
      `).join("");

      card.innerHTML = `
        <h3>Pedido #${order.id}</h3>

        <p><strong>Cliente:</strong> ${order.customerName || "-"}</p>
        <p><strong>Email:</strong> ${order.customerEmail || "-"}</p>
        <p><strong>WhatsApp:</strong> ${order.customerPhone || "-"}</p>
        <p><strong>Dirección:</strong> ${order.customerAddress}</p>
        <p><strong>Ciudad:</strong> ${order.customerCity}</p>

        <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
        <p><strong>Pago:</strong> ${order.paymentStatus || "No pagado"}</p>
        <p><strong>Fecha:</strong> ${order.createdAt || order.date || "-"}</p>

        <label class="admin-order-label">Estado del pedido</label>

        <select
          class="admin-order-status-select"
          onchange="updateOrderStatus('${order.customerId}', '${order.id}', this.value)"
        >
          <option value="Pendiente" ${order.status === "Pendiente" ? "selected" : ""}>Pendiente</option>
          <option value="Preparando" ${order.status === "Preparando" ? "selected" : ""}>Preparando</option>
          <option value="Enviado" ${order.status === "Enviado" ? "selected" : ""}>Enviado</option>
          <option value="Entregado" ${order.status === "Entregado" ? "selected" : ""}>Entregado</option>
          <option value="Cancelado" ${order.status === "Cancelado" ? "selected" : ""}>Cancelado</option>
        </select>

        <div class="admin-order-detail">
          ${itemsHtml}
        </div>
      `;

      adminOrdersList.appendChild(card);
    });

  } catch(error) {
    console.log("Error cargando pedidos admin:", error);
    adminOrdersList.innerHTML = "No se pudieron cargar los pedidos.";
  }
};

window.updateOrderStatus = async function(customerId, orderId, newStatus) {
  try {
    const customerRef = doc(db, "customers", customerId);
    const customerSnap = await getDoc(customerRef);

    if (!customerSnap.exists()) {
      showToast("Cliente no encontrado");
      return;
    }

    const customer = customerSnap.data();

    const updatedOrders = customer.orders.map(order => {
      if (String(order.id) === String(orderId)) {
        return {
          ...order,
          status: newStatus
        };
      }

      return order;
    });

    await updateDoc(customerRef, {
      orders: updatedOrders
    });

    showToast("Estado actualizado");

  } catch (error) {
    console.log("Error actualizando estado:", error);
    showToast("No se pudo actualizar el estado");
  }
};

window.addEventListener("load", () => {

  const input =
    document.getElementById("exchangeRateInput");

  if(input) {

    input.value =
      Number(
        localStorage.getItem("exchangeRate")
      ) || 1300;

      const whatsappInput =
  document.getElementById("storeWhatsapp");

if(whatsappInput){
  whatsappInput.value =
    localStorage.getItem("storeWhatsapp") || "";
}

const instagramInput =
  document.getElementById("storeInstagram");

if(instagramInput){
  instagramInput.value =
    localStorage.getItem("storeInstagram") || "";
}

const emailInput =
  document.getElementById("storeEmail");

if(emailInput){
  emailInput.value =
    localStorage.getItem("storeEmail") || "";
}

  }

  window.addEventListener

});

window.loadCustomersForAdmin = async function() {

  const container =
    document.getElementById("adminCustomersList");

  if(!container) return;

  container.innerHTML =
    "Cargando clientes...";

  try {

    const snapshot =
      await getDocs(collection(db, "customers"));

    let html = "";

    snapshot.forEach(docSnap => {

      const customer =
        docSnap.data();

      const orders =
        customer.orders
          ? customer.orders.length
          : 0;

      html += `

        <div class="admin-customer-card">

          <h3>
            ${customer.name || "Sin nombre"}
          </h3>

          <p>
            📧 ${customer.email || "-"}
          </p>

          <p>
            📱 ${customer.phone || "-"}
          </p>

          <p>
            📍 ${customer.city || "-"}
          </p>

          <div class="admin-customer-orders">
            Pedidos: ${orders}
          </div>

        </div>

      `;

    });

    container.innerHTML =
      html || "No hay clientes.";

  } catch(error) {

    console.log(error);

    container.innerHTML =
      "Error cargando clientes.";

  }

};