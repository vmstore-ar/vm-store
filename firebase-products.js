import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCHPvPXi_3xh_DvgYxSpl0pRasy9HlLAg",
  authDomain: "vm-store-ab7f7.firebaseapp.com",
  projectId: "vm-store-ab7f7",
  storageBucket: "vm-store-ab7f7.firebasestorage.app",
  messagingSenderId: "936766595550",
  appId: "1:936766595550:web:f767f91bd558f7808bfd4f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.saveProductToFirebase = async function(product) {

  try {

    const productToSave = {
      ...product,
      productCurrency: product.productCurrency || product.originalCurrency || "USD",
      originalCurrency: product.originalCurrency || product.productCurrency || "USD"
    };

    if (product.firebaseId) {
      await setDoc(
        doc(db, "products", product.firebaseId),
        productToSave
      );
    } else {
      await addDoc(
        collection(db, "products"),
        productToSave
      );
    }

    console.log("Producto guardado en Firebase");

  } catch(error) {

    console.error("Error guardando producto en Firebase:", error);

  }

};

window.loadProductsFromFirebase = async function() {

  try {

    const productsSnapshot =
      await getDocs(collection(db, "products"));

    const firebaseProducts = {
      iphones: [],
      componentes: [],
      notebooks: [],
      pcs: [],
      perifericos: [],
      "accesorios-apple": []
    };

    productsSnapshot.forEach(docSnap => {

      const product = docSnap.data();

      const category =
        product.category || "componentes";

      if(!firebaseProducts[category]) {
        firebaseProducts[category] = [];
      }

      firebaseProducts[category].push({
        ...product,
        firebaseId: docSnap.id
      });

    });

    products = firebaseProducts;

    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );

    console.log("Productos cargados desde Firebase");

    const page =
  window.location.pathname.split("/").pop();

if(page === "tienda.html") {

  applyFilters();

} else if(page === "iphones.html") {

  renderProducts("iphones");

} else {

  renderProducts(currentCategory);

}

  } catch(error) {

    console.error(
      "Error cargando productos desde Firebase:",
      error
    );

  }

};

window.deleteProductFromFirebase = async function(firebaseId) {

  try {

    await deleteDoc(
      doc(db, "products", firebaseId)
    );

    console.log("Producto eliminado de Firebase");

  } catch(error) {

    console.error("Error eliminando producto de Firebase:", error);
    throw error;

  }

};