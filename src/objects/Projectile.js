// Projectile.js – Fired by towers to strike Titanspawn enemies

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, target, config = {}) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.target = target;
    this.speed = config.speed || 300;
    this.damage = config.damage || 25;
    this.element = config.element || null; // e.g., 'fire', 'lightning'

    // Add to scene
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Track target
    this.setDepth(2);
    this.setActive(true);
    this.setVisible(true);

    this.scene.physics.moveToObject(this, target, this.speed);
  }

  update() {
    if (!this.target || !this.target.active) {
      this.destroy();
      return;
    }

    // If close enough to hit
    const distance = Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y);
    if (distance < 10) {
      this.hitTarget();
    }
  }

  hitTarget() {
    if (this.target.takeDamage) {
      this.target.takeDamage(this.damage, this.element);
    }

    // Optional: explosion or hit effect
    this.scene.add.circle(this.x, this.y, 8, 0xffff00).setAlpha(0.6).setBlendMode('ADD');

    this.destroy();
  }
}
