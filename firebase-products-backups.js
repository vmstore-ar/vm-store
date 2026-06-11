import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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
    await addDoc(collection(db, "products"), product);
    console.log("Producto guardado en Firebase");
  } catch(error) {
    console.error("Error guardando producto en Firebase:", error);
  }

};

window.loadProductsFromFirebase = async function() {

  try {

    const querySnapshot =
      await getDocs(collection(db, "products"));

    querySnapshot.forEach((doc) => {

      const product = doc.data();

      if(!product.category) return;

      if(!products[product.category]) {
        products[product.category] = [];
      }

      const exists =
        products[product.category].some(p => p.id === product.id);

      if(!exists) {
        products[product.category].push(product);
      }

    });

    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );

    renderProducts(currentCategory);
    renderAdminProducts();

    console.log("Productos cargados desde Firebase");

  } catch(error) {

    console.error("Error cargando productos desde Firebase:", error);

  }

};

console.log("Firebase conectado correctamente", db);