// MainMenuScene.js – Welcome screen for Wrath of the 12 Olympians

import AudioManager from '../managers/AudioManager.js';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  preload() {
    this.load.image('menu_bg', '../assets/ui/menu_bg.png');
    this.load.image('start_button', '../assets/ui/start_button.png');
    this.load.audio('menu_music', '../assets/audio/menu_music.mp3');
  }

  create() {
    this.game.audioManager.changeState(AudioManager.STATES.MENU);

    // Background image
    this.add.image(512, 384, 'menu_bg');

    // Title
    this.add.text(512, 150, 'Wrath of the 12 Olympians', {
      fontFamily: 'Cinzel',
      fontSize: '48px',
      color: '#FFD700',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Start button
    const startButton = this.add.image(512, 400, 'start_button')
      .setInteractive()
      .setScale(0.8)
      .setAlpha(0.9);

    startButton.on('pointerover', () => startButton.setAlpha(1));
    startButton.on('pointerout', () => startButton.setAlpha(0.9));

    startButton.on('pointerdown', () => {
      this.game.audioManager.changeState(AudioManager.STATES.CALM);
      this.scene.start('GameScene');
    });

    // Fade in
    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }
}
