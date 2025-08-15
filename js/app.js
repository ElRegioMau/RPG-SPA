// app.js
import { ref, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { db } from './firebase-init.js';
import { mountCreator } from './creator_firebase.js';

// Música
let ost;
const btnPlay = document.getElementById('btnPlay');
const btnStop = document.getElementById('btnStop');

btnPlay?.addEventListener('click', () => {
  if (!ost) {
    ost = new Audio('ost.mp3');
    ost.loop = true;
    ost.volume = 0.5;
  }
  ost.play().catch(()=>{});
});
btnStop?.addEventListener('click', () => { if (ost){ ost.pause(); ost.currentTime = 0; } });

// Router
const root = document.getElementById('root');

function mountHome() {
  const tpl = document.getElementById('tpl-home');
  root.innerHTML = '';
  root.appendChild(tpl.content.cloneNode(true));
}

function mountVisor() {
  const tpl = document.getElementById('tpl-visor');
  root.innerHTML = '';
  root.appendChild(tpl.content.cloneNode(true));

  const cont = document.getElementById('personajeDatos');
  cont.innerHTML = '<p class="muted">Cargando personajes...</p>';

  const dbRef = ref(db);

  get(child(dbRef, 'personajes'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        cont.innerHTML = '<p class="muted">No hay personajes guardados en Firebase.</p>';
        return;
      }

      const data = snapshot.val();
      cont.innerHTML = '';

      Object.values(data).forEach(pj => {
        const card = document.createElement('div');
        card.className = 'tarjeta-personaje';
        card.innerHTML = `
          <h2>${pj.nombre}</h2>
          <p><strong>Clase:</strong> ${pj.clase}</p>
          <p><em>${pj.claseDescripcion}</em></p>
          <hr/>
          <p><strong>Vida:</strong> ${pj.stats.vida}</p>
          <p><strong>Destreza:</strong> ${pj.stats.destreza}</p>
          <p><strong>Sabiduría:</strong> ${pj.stats.sabiduria}</p>
          <p><strong>Daño:</strong> ${pj.stats.dano}</p>
          <p><strong>Carisma:</strong> ${pj.stats.carisma}</p>
          <hr/>
          <p><strong>Ítem:</strong> ${pj.item}</p>
          <p><em>${pj.itemDescripcion}</em></p>
        `;
        cont.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error al leer personajes:', error);
      cont.innerHTML = '<p class="muted">Error al cargar personajes desde Firebase.</p>';
    });
}

const routes = {
  '/': mountHome,
  '/crear': () => mountCreator(root),
  '/visor': mountVisor
};

function router() {
  const hash = location.hash.replace('#','') || '/';
  const fn = routes[hash] || routes['/'];
  fn();
}
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
