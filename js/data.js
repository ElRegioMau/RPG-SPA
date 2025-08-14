// Datos del juego: clases e ítems (separado para claridad / test)
export const STAT_KEYS = ['vida', 'destreza', 'sabiduria', 'dano', 'carisma'];

export const CLASES = {
  'Humano': {
    bonificadores: { vida: 1, destreza: 1, sabiduria: 1, dano: 1, carisma: 1 },
    descripcion: 'Versátil y resiliente. Los humanos se adaptan a cualquier sendero.',
    habilidad: 'Empuje Humano: 1 vez por escena, vuelve a tirar un d20 y quédate el mejor resultado.'
  },
  'Nahual': {
    bonificadores: { vida: 3, destreza: 2, sabiduria: 0, dano: 0, carisma: 0 },
    descripcion: 'Guardián de formas. Entre la piel y la bestia hay solo un susurro.',
    habilidad: 'Forma Ancestral: +2 Destreza adicional por 1 escena; sentidos agudos.'
  },
  'Bruja': {
    bonificadores: { vida: 0, destreza: 0, sabiduria: 2, dano: 0, carisma: 3 },
    descripcion: 'Tejedora de pactos, conocedora de secretos prohibidos.',
    habilidad: 'Pacto Susurrado: encantas a un objetivo débil de voluntad por una escena.'
  },
  'Chamán': {
    bonificadores: { vida: 2, destreza: 0, sabiduria: 3, dano: 0, carisma: 0 },
    descripcion: 'Intercesor entre espíritus y mortales; sanador del polvo y el viento.',
    habilidad: 'Rito Curativo: restaura 1d4+Sabiduría de Vida a un aliado (1/escena).'
  },
  'Guerrero': {
    bonificadores: { vida: 2, destreza: 0, sabiduria: 0, dano: 3, carisma: 0 },
    descripcion: 'Vanguardia de acero, imparable en el fragor.',
    habilidad: 'Furia Marcial: +2 Daño al siguiente ataque y ventaja para impactar (1/escena).'
  },
  'Chaneque': {
    bonificadores: { vida: 0, destreza: 3, sabiduria: 1, dano: 0, carisma: 1 },
    descripcion: 'Duende del monte, ligero, pícaro y escurridizo.',
    habilidad: 'Travesura Élfica: difícil de detectar; enemigos con desventaja para hallarte (1 escena).'
  }
};

export const ITEMS = {
  'Poción de vida': 'Restaura 1d6+2 de Vida al beberla (una vez).',
  'Machete': 'Arma simple. +1 Daño y permite abrir camino entre maleza densa.',
  'Poción de invisibilidad': 'Vuelves invisible hasta 1 minuto o hasta atacar/usar habilidad.',
  'Sangre de monstruo': 'Riesgo: d20 → 11-20: +2 Daño (1 escena). 1-10: -2 Carisma (1 escena).',
  'Mezcal': 'Valor líquido. Recupera 1d4 Carisma social una vez; o +1 Carisma en la siguiente interacción.',
  'Amuleto de obsidiana': 'Protección antigua. Reduce en 2 el Daño recibido de un ataque (1/escena).',
  'Copal sagrado': 'Purifica. +1 Sabiduría a tiradas espirituales durante una escena.',
  'Milpa bendita': 'Entre escenas, recupera +1 Vida adicional por descanso corto para todo el grupo.',
  // 3 objetos extra
  'Jade de la Serpiente': 'Talismán. +1 a tiradas de Destreza relacionadas con sigilo durante una escena.',
  'Pluma del Quetzal': 'Inspiración. +2 Carisma en la próxima interacción social importante.',
  'Tizatl Ritualmente': 'Ungüento. Cura 1d4 Vida extra cuando recibes sanación por cualquier fuente (una vez).'
};
