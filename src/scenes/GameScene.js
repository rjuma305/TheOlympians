// GameScene.js – First scene test for Wrath of the 12 Olympians

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // Show Aphrodite in the center of the screen
    this.add.image(512, 384, 'aphrodite');
  }

  update() {
    // Empty for now — we’ll use this later for game logic
  }
}

