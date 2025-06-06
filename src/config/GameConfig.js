// GameConfig.js – Central config for Wrath of the 12 Olympians

const GameConfig = {
  // Canvas
  width: 1024,
  height: 768,
  backgroundColor: '#1a1a40',

  // Game State
  playerStartingHealth: 100,
  startingFavor: 150,
  victoryWave: 10,
  
  // Tower Evolution
  evolutionCosts: {
    heroToDemigod: 300,
    demigodToOlympian: 600
  },
  
  // Evolution costs
  evolutionCosts: {
    heroToDemigod: 500,
    demigodToOlympian: 1000
  },
  
  // Base stats multipliers for evolution
  evolutionMultipliers: {
    demigod: 1.5,
    olympian: 2.5
  },

  // Game Settings
  startingFavor: 100,
  maxTowers: 20,
  upgradeCostMultiplier: 1.5,

  // Tier Definitions
  tiers: {
    hero: {
      cost: 50,
      damage: 10,
      range: 120,
      fireRate: 1000
    },
    demigod: {
      cost: 150,
      damage: 25,
      range: 160,
      fireRate: 800
    },
    olympian: {
      cost: 300,
      damage: 50,
      range: 220,
      fireRate: 600
    }
  },

  // Difficulty Scaling
  waveScaling: {
    healthMultiplier: 1.15,
    speedMultiplier: 1.05,
    rewardMultiplier: 1.1
  },

  // Dev Mode
  debug: false,
  version: '0.1.0-olympus-prealpha'
};

export default GameConfig;
