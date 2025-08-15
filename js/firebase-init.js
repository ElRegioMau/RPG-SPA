// Importa desde el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Configuración de tu app
const firebaseConfig = {
  apiKey: "AIzaSyCKrz2qVFXNZjFZ1f3jXNhTVC7dyeHIq1I",
  authDomain: "historiasdelanoche-c9732.firebaseapp.com",
  projectId: "historiasdelanoche-c9732",
  storageBucket: "historiasdelanoche-c9732.firebasestorage.app",
  messagingSenderId: "260684935895",
  appId: "1:260684935895:web:0a91f814a1999127b5b692",
  measurementId: "G-9Q832EX300"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Exportamos para usarlo en otros scripts
export { db };

