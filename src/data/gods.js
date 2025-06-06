
const Gods = {
  perseus: {
    name: 'Perseus',
    tier: 'hero',
    element: 'sword',
    cost: 100,
    damage: 30,
    range: 150,
    fireRate: 800,
    texture: 'perseus',
    description: 'A legendary hero wielding divine weapons.',
    evolution: {
      demigod: 'heracles',
      olympian: 'ares'
    }
  },
  orpheus: {
    name: 'Orpheus',
    tier: 'hero',
    element: 'music',
    cost: 120,
    damage: 20,
    range: 200,
    fireRate: 600,
    texture: 'orpheus',
    description: 'Enchants enemies with divine music.',
    evolution: {
      demigod: 'dionysus',
      olympian: 'apollo'
    }
  },
  achilles: {
    name: 'Achilles',
    tier: 'hero',
    element: 'spear',
    cost: 150,
    damage: 40,
    range: 130,
    fireRate: 900,
    texture: 'achilles',
    description: 'Nearly invincible warrior of Troy.',
    evolution: {
      demigod: 'hermes',
      olympian: 'athena'
    }
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
