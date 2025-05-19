// main.js – Entry point for Wrath of the 12 Olympians

import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import GameScene from './scenes/GameScene.js';
import GameConfig from './config/GameConfig.js';

const config = {
  type: Phaser.AUTO,
  width: GameConfig.width,
  height: GameConfig.height,
  backgroundColor: GameConfig.backgroundColor,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    BootScene,
    PreloadScene,
    MainMenuScene,
    GameScene
  ]
};

const game = new Phaser.Game(config);
