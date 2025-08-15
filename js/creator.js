// Lógica de creación de personaje (UI y reglas)
import { CLASES, ITEMS, STAT_KEYS } from './data.js';

export function mountCreator(root) {
  // Inyectar el template
  const tpl = document.getElementById('tpl-creator');
  root.innerHTML = '';
  root.appendChild(tpl.content.cloneNode(true));

  // Estado
  let puntos = 10;
  const asignados = Object.fromEntries(STAT_KEYS.map(k => [k, 0]));
  let claseActual = 'Humano';
  let itemActual = 'Poción de vida';

  // Refs
  const clasesCont = document.getElementById('clases');
  const claseDesc = document.getElementById('claseDescripcion');
  const statsGrid = root.querySelector('.stats-grid');
  const puntosRestantes = document.getElementById('puntosRestantes');
  const itemsCont = document.getElementById('items');
  const itemDesc = document.getElementById('itemDescripcion');
  const form = document.getElementById('characterForm');
  const btnReset = document.getElementById('btnReset');

  // --- Accordion ---
  root.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.acc;
      const section = btn.closest('.accordion');
      section.classList.toggle('open');
      // opcional: cerrar otros
      root.querySelectorAll('.accordion').forEach(acc => {
        if (acc !== section) acc.classList.remove('open');
      });
    });
  });
  // abrir por defecto "Clases"
  root.querySelector('[data-acc="clases"]')?.closest('.accordion')?.classList.add('open');

  // --- Render Clases ---
  function renderClases() {
    clasesCont.innerHTML = '';
    Object.keys(CLASES).forEach((nombre, idx) => {
      const id = `clase-${idx}`;
      const wrap = document.createElement('div');
      wrap.className = 'option-wrap';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'clase';
      radio.id = id;
      radio.value = nombre;
      radio.checked = (nombre === claseActual);

      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.className = 'option';
      label.innerHTML = `
        <span class="opt-title">${nombre}</span>
        <span class="opt-sub">${CLASES[nombre].descripcion}</span>
        <span class="opt-skill">Habilidad: ${CLASES[nombre].habilidad}</span>
      `;

      wrap.appendChild(radio); wrap.appendChild(label);
      if (radio.checked) wrap.classList.add('selected');
      clasesCont.appendChild(wrap);

      radio.addEventListener('change', () => {
        claseActual = nombre;
        actualizarClaseDescripcion();
        renderStats(); // recalcular bases visibles
        // resaltar selección
        clasesCont.querySelectorAll('.option-wrap').forEach(w => w.classList.remove('selected'));
        wrap.classList.add('selected');
      });
    });
    actualizarClaseDescripcion();
  }

  function actualizarClaseDescripcion() {
    const c = CLASES[claseActual];
    const b = c.bonificadores;
    claseDesc.innerHTML = `
      <span class="golden">Bonificadores:</span>
      Vida +${b.vida}, Destreza +${b.destreza}, Sabiduría +${b.sabiduria}, Daño +${b.dano}, Carisma +${b.carisma}.
      <br><br>
      <span class="golden">Habilidad:</span> ${c.habilidad}
    `;
  }

  // --- Render Stats ---
  function renderStats() {
    statsGrid.innerHTML = '';
    STAT_KEYS.forEach(k => {
      const row = document.createElement('div');
      row.className = 'stat-row';

      const base = CLASES[claseActual].bonificadores[k];

      const label = document.createElement('div');
      label.className = 'stat-label';
      label.innerHTML = `
        <span class="stat-name">${k[0].toUpperCase()+k.slice(1)}</span>
        <span class="stat-base">Base de clase: ${base}</span>
      `;

      const minus = document.createElement('button');
      minus.type = 'button';
      minus.className = 'btn stat-btn';
      minus.textContent = '−';
      minus.addEventListener('click', () => modifyStat(k, -1));

      const plus = document.createElement('button');
      plus.type = 'button';
      plus.className = 'btn stat-btn';
      plus.textContent = '+';
      plus.addEventListener('click', () => modifyStat(k, +1));

      const value = document.createElement('div');
      value.className = 'stat-value';
      value.id = `val-${k}`;
      value.textContent = base + asignados[k];

      row.appendChild(label);
      row.appendChild(minus);
      row.appendChild(value);
      row.appendChild(plus);

      statsGrid.appendChild(row);
    });
    puntosRestantes.textContent = String(puntos);
  }

  function modifyStat(k, delta) {
    if (delta > 0) {
      if (puntos <= 0) return;
      if (asignados[k] >= 5) return;
      asignados[k] += 1; puntos -= 1;
    } else {
      if (asignados[k] <= 0) return;
      asignados[k] -= 1; puntos += 1;
    }
    updateValues();
  }

  function updateValues() {
    STAT_KEYS.forEach(k => {
      const base = CLASES[claseActual].bonificadores[k];
      const el = document.getElementById(`val-${k}`);
      if (el) el.textContent = base + asignados[k];
    });
    puntosRestantes.textContent = String(puntos);
  }

  // --- Render Items ---
  function renderItems() {
    itemsCont.innerHTML = '';
    Object.keys(ITEMS).forEach((nombre, idx) => {
      const id = `item-${idx}`;
      const wrap = document.createElement('div');
      wrap.className = 'option-wrap';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'item';
      radio.id = id;
      radio.value = nombre;
      radio.checked = (nombre === itemActual);

      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.className = 'option';
      label.innerHTML = `
        <span class="opt-title">${nombre}</span>
        <span class="opt-sub">${ITEMS[nombre]}</span>
      `;

      wrap.appendChild(radio); wrap.appendChild(label);
      if (radio.checked) wrap.classList.add('selected');
      itemsCont.appendChild(wrap);

      radio.addEventListener('change', () => {
        itemActual = nombre;
        itemDesc.textContent = ITEMS[itemActual];
        // resaltar selección
        itemsCont.querySelectorAll('.option-wrap').forEach(w => w.classList.remove('selected'));
        wrap.classList.add('selected');
      });
    });
    itemDesc.textContent = ITEMS[itemActual];
  }

  // Reset
  btnReset?.addEventListener('click', () => {
    Object.keys(asignados).forEach(k => asignados[k] = 0);
    puntos = 10;
    claseActual = 'Humano';
    itemActual = 'Poción de vida';
    renderClases();
    renderStats();
    renderItems();
  });

  // Submit
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) return alert('Ponle un nombre a tu personaje.');

    // Construir objeto personaje
    const stats = {};
    STAT_KEYS.forEach(k => stats[k] = CLASES[claseActual].bonificadores[k] + asignados[k]);

    const personaje = {
      nombre,
      clase: claseActual,
      claseDescripcion: CLASES[claseActual].descripcion,
      habilidad: CLASES[claseActual].habilidad,
      stats,
      item: itemActual,
      itemDescripcion: ITEMS[itemActual],
      createdAt: Date.now()
    };

    // Guardar en localStorage (más tarde: Firebase)
    try { localStorage.setItem('hl_personaje', JSON.stringify(personaje)); console.log("🔹 Clase seleccionada:", claseActual, "🔹 Objeto seleccionado:", itemActual), puntosRestantes.textContent = String(puntos); }
    catch (err) { console.error('No se pudo guardar', err); }

    // Ir al visor
    location.hash = '#/visor';
  });

  // Inicializar
  renderClases();
  renderStats();
  renderItems();
}
