// waveData.js – Titanspawn wave definitions

const WaveData = [
  {
    wave: 1,
    enemies: [
      { type: 'minion', name: 'Harpy', texture: 'harpy', count: 5, delay: 1000 }
    ]
  },
  {
    wave: 2,
    enemies: [
      { type: 'minion', name: 'Satyr', texture: 'satyr', count: 4, delay: 1200 },
      { type: 'minion', name: 'Harpy', texture: 'harpy', count: 2, delay: 800 }
    ]
  },
  {
    wave: 3,
    enemies: [
      { type: 'spawn', name: 'Cyclops', texture: 'cyclops', count: 2, delay: 2000 },
      { type: 'minion', name: 'Satyr', texture: 'satyr', count: 6, delay: 1000 }
    ]
  },
  {
    wave: 4,
    enemies: [
      { type: 'general', name: 'Kampe', texture: 'kampe', count: 1, delay: 0 }
    ]
  }
];

export default WaveData;
