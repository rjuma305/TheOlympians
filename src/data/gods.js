// gods.js – Tower definitions for Wrath of the 12 Olympians

const Gods = {
  zeus: {
    name: 'Zeus',
    tier: 'olympian',
    element: 'lightning',
    cost: 300,
    damage: 50,
    range: 220,
    fireRate: 600,
    texture: 'zeus',
    description: 'Unleashes chain lightning that arcs between nearby enemies.',
    special: 'Chain Lightning (hits 3 targets)'
  },

  artemis: {
    name: 'Artemis',
    tier: 'olympian',
    element: 'nature',
    cost: 280,
    damage: 45,
    range: 260,
    fireRate: 700,
    texture: 'artemis',
    description: 'A deadly huntress. Fires long-range arrows with pinpoint accuracy.',
    special: 'Critical Arrow (chance to double damage)'
  },

  hephaestus: {
    name: 'Hephaestus',
    tier: 'olympian',
    element: 'fire',
    cost: 320,
    damage: 40,
    range: 180,
    fireRate: 900,
    texture: 'hephaestus',
    description: 'Master of the forge. Launches molten blasts that burn enemies over time.',
    special: 'Burning Ground (DoT AoE)'
  },

  aphrodite: {
    name: 'Aphrodite',
    tier: 'olympian',
    element: 'charm',
    cost: 200,
    damage: 10,
    range: 160,
    fireRate: 800,
    texture: 'aphrodite',
    description: 'Fires heart-shaped charm projectiles that slow enemies.',
    special: 'Charmed enemies move 50% slower'
  }
};

export default Gods;
