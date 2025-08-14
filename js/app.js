// Router básico + control de música + montaje de vistas
import { mountCreator } from './creator.js';

// Música (simple: inicia al presionar botón; en SPA no se corta)
let ost;
const btnPlay = document.getElementById('btnPlay');
const btnStop = document.getElementById('btnStop');
btnPlay?.addEventListener('click', () => {
  if (!ost) {
    ost = new Audio('ost.mp3'); // coloca tu ruta real
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
  try {
    const raw = localStorage.getItem('hl_personaje');
    if (!raw) {
      cont.innerHTML = '<p class="muted">No hay personaje guardado. Ve a “Crear Personaje”.</p>';
      return;
    }
    const pj = JSON.parse(raw);
    cont.innerHTML = `
      <div class="sheet-row"><span>Nombre</span><strong>${pj.nombre}</strong></div>
      <div class="sheet-row"><span>Clase</span><strong>${pj.clase}</strong></div>
      <div class="sheet-row"><span>Descripción</span><em>${pj.claseDescripcion}</em></div>
      <hr/>
      <div class="sheet-row"><span>Vida</span><strong>${pj.stats.vida}</strong></div>
      <div class="sheet-row"><span>Destreza</span><strong>${pj.stats.destreza}</strong></div>
      <div class="sheet-row"><span>Sabiduría</span><strong>${pj.stats.sabiduria}</strong></div>
      <div class="sheet-row"><span>Daño</span><strong>${pj.stats.dano}</strong></div>
      <div class="sheet-row"><span>Carisma</span><strong>${pj.stats.carisma}</strong></div>
      <hr/>
      <div class="sheet-row"><span>Ítem</span><strong>${pj.item}</strong></div>
      <div class="sheet-row"><span>Efecto</span><em>${pj.itemDescripcion}</em></div>
    `;
  } catch (e) {
    cont.innerHTML = '<p class="muted">Error al leer los datos.</p>';
  }
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
