// BootScene.js – Initializes the game and prepares PreloadScene

import GameConfig from '../config/GameConfig.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  init() {
    // Set up registry values or config flags
    this.registry.set('favor', GameConfig.startingFavor);
    this.registry.set('currentWave', 1);
    this.registry.set('unlockedTiers', ['hero']); // unlocked tiers: hero, demigod, olympian
    console.log('%c[BootScene] Game initializing...', 'color: cyan');
  }

  preload() {
    // Load just enough to build the loading screen in PreloadScene
    this.load.image('loading_bg', '../assets/ui/loading_bg.png');
  }

  create() {
    // Proceed to PreloadScene once basic prep is done
    this.scene.start('PreloadScene');
  }
}
