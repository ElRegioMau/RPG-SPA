console.log("🔹 Script cargado correctamente");
// ===============================
// IMPORTS
// ===============================
import { db } from './firebase-init.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ===============================
// ELEMENTOS DEL DOM
// ===============================
const classCards = document.querySelectorAll('.class-card');
const objectCards = document.querySelectorAll('.object-card');
const pointsDisplay = document.getElementById('points-display');
const form = document.getElementById('character-form');

let selectedClass = null;
let selectedObjects = [];
let availablePoints = 10;

// ===============================
// EVENTOS: SELECCIÓN DE CLASE
// ===============================
classCards.forEach(card => {
    card.addEventListener('click', () => {
        classCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedClass = card.dataset.class;
    });
});

console.log("🔹 Clase seleccionada:", selectedClass);

// ===============================
// EVENTOS: SELECCIÓN DE OBJETOS
// ===============================
objectCards.forEach(card => {
    card.addEventListener('click', () => {
        const objectName = card.dataset.object;
        if (selectedObjects.includes(objectName)) {
            selectedObjects = selectedObjects.filter(o => o !== objectName);
            card.classList.remove('selected');
        } else {
            selectedObjects.push(objectName);
            card.classList.add('selected');
        }
    });
});

console.log("🔹 Objetos seleccionados:", selectedObjects)
;

// ===============================
// MANEJO DE PUNTOS
// ===============================
document.querySelectorAll('.stat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const stat = btn.dataset.stat;
        const change = parseInt(btn.dataset.change);

        if (change > 0 && availablePoints > 0) {
            document.getElementById(stat).textContent++;
            availablePoints--;
        } 
        else if (change < 0 && parseInt(document.getElementById(stat).textContent) > 0) {
            document.getElementById(stat).textContent--;
            availablePoints++;
        }

        pointsDisplay.textContent = availablePoints;
    });
});
console.log("🔹 Puntos disponibles:", availablePoints);

// ===============================
// SUBMIT DEL FORMULARIO
// ===============================
form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!selectedClass) {
        alert("Selecciona una clase.");
        return;
    }

    if (selectedObjects.length === 0) {
        alert("Selecciona al menos un objeto.");
        return;
    }

    const personaje = {
        nombre: document.getElementById('name').value,
        clase: selectedClass,
        objetos: selectedObjects,
        stats: {
            fuerza: parseInt(document.getElementById('fuerza').textContent),
            agilidad: parseInt(document.getElementById('agilidad').textContent),
            inteligencia: parseInt(document.getElementById('inteligencia').textContent)
        },
        creadoEn: new Date()
    };

    // Guardar en Firestore
    try {
        await addDoc(collection(db, "personajes"), personaje);
        console.log("✅ Personaje guardado en Firestore");
        alert("Personaje creado y guardado con éxito.");
        form.reset();
        selectedClass = null;
        selectedObjects = [];
        availablePoints = 10;
        pointsDisplay.textContent = availablePoints;
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    } catch (error) {
        console.error("❌ Error al guardar en Firestore:", error);
    }
});
