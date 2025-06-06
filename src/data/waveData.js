
const WaveData = [
  {
    wave: 1,
    enemies: [
      { type: 'minion', name: 'Harpy', texture: 'harpy', count: 5, delay: 1000, health: 100, speed: 50, reward: 10 }
    ]
  },
  {
    wave: 2,
    enemies: [
      { type: 'minion', name: 'Satyr', texture: 'satyr', count: 4, delay: 1200, health: 150, speed: 60, reward: 15 },
      { type: 'minion', name: 'Harpy', texture: 'harpy', count: 2, delay: 800, health: 120, speed: 70, reward: 12 }
    ]
  },
  {
    wave: 3,
    enemies: [
      { type: 'spawn', name: 'Cyclops', texture: 'cyclops', count: 2, delay: 2000, health: 400, speed: 40, reward: 50 }
    ]
  },
  {
    wave: 4,
    enemies: [
      { type: 'general', name: 'Kampe', texture: 'kampe', count: 1, delay: 0, health: 1000, speed: 30, reward: 200 }
    ]
  },
  {
    wave: 5,
    enemies: [
      { type: 'titan', name: 'Kronos', texture: 'kronos', count: 1, delay: 0, health: 2000, speed: 25, reward: 500 }
    ]
  }
];

export default WaveData;
