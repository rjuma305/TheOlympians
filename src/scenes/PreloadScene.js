// PreloadScene.js – Loads assets before MainMenuScene

import AudioManager from '../managers/AudioManager.js';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // --- Loading Text ---
    const loadingText = this.add.text(512, 360, 'Loading Olympus...', {
      fontFamily: 'Cinzel',
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // --- Progress Bar ---
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(362, 388, 300, 30);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(370, 394, 280 * value, 20);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // --- ASSET LOADING ---
    // UI
    this.load.image('menu_bg', '../assets/ui/menu_bg.png');
    this.load.image('start_button', '../assets/ui/start_button.png');
    this.load.image('loading_bg', '../assets/ui/loading_bg.png');

    // Towers
    const SPRITE_ROOT = '../assets/sprites/';
    this.load.image('zeus',      `${SPRITE_ROOT}zeus.png`);
    this.load.image('artemis',   `${SPRITE_ROOT}artemis.png`);
    this.load.image('hephaestus',`${SPRITE_ROOT}hephaestus.png`);
    this.load.image('aphrodite', `${SPRITE_ROOT}aphrodite.png`);

    // Projectiles
    this.load.image('lightning_bolt', '../assets/projectiles/lightning_bolt.png');
    this.load.image('arrow', '../assets/projectiles/arrow.png');
    this.load.image('glow_circle', '../assets/effects/glow_circle.png');
    this.load.image('heart', '../assets/projectiles/heart.png');

    // Enemies
    this.load.image('harpy', '../assets/sprites/harpy.png');
    this.load.image('satyr', '../assets/sprites/satyr.png');
    this.load.image('cyclops', '../assets/sprites/cyclops.png');
    this.load.image('kampe', '../assets/sprites/kampe.png');

    // Background
    this.load.image('background', '../assets/maps/olympus_bg.png');

    // Audio
    this.load.audio('menu_music', '../assets/audio/menu_music.mp3');
    this.load.audio('zeus_bolt', '../assets/audio/zeus_bolt.wav');
    // Placeholder combat music (silent loop by default)
    this.load.audio('combat_music', '../assets/audio/combat_music_placeholder.ogg');
  }

  create() {
    this.audioManager = new AudioManager(this);
    this.scene.start('MainMenuScene');
  }
}
