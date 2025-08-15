// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Configuración de tu app
const firebaseConfig = {
  apiKey: "AIzaSyCKrz2qVFXNZjFZ1f3jXNhTVC7dyeHIq1I",
  authDomain: "historiasdelanoche-c9732.firebaseapp.com",
  projectId: "historiasdelanoche-c9732",
  storageBucket: "historiasdelanoche-c9732.firebasestorage.app",
  messagingSenderId: "260684935895",
  appId: "1:260684935895:web:0a91f814a1999127b5b692",
  measurementId: "G-9Q832EX300",
  databaseURL: "https://historiasdelanoche-c9732-default-rtdb.firebaseio.com"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// Exporta para usar en otros archivos
const db = getDatabase(app);
export { app, db };
