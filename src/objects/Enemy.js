// Enemy.js – Base class for all Titanspawn enemies

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, config = {}) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.speed = config.speed || 50;
    this.health = config.health || 100;
    this.maxHealth = this.health;
    this.reward = config.reward || 10;
    this.type = config.type || 'minion';  // 'minion', 'spawn', 'general', 'titan'
    this.weakness = config.weakness || null;

    // Add to scene
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setDepth(1);

    // Path data
    this.path = null;
    this.pathIndex = 0;

    // Health bar UI (optional now)
    this.healthBar = this.scene.add.graphics();
    this.updateHealthBar();
  }

  setPath(path) {
    this.path = path;
    this.pathIndex = 0;
    this.moveToNextPoint();
  }

  moveToNextPoint() {
    if (!this.path || this.pathIndex >= this.path.length) {
      this.reachEnd();
      return;
    }
    const point = this.path[this.pathIndex];
    this.scene.physics.moveTo(this, point.x, point.y, this.speed);
  }

  reachEnd() {
    this.healthBar.destroy();
    this.destroy();
    this.emit('escape');
  }

  update(time, delta) {
    // Update health bar position
    this.updateHealthBar();
    if (this.path) {
      const point = this.path[this.pathIndex];
      const dist = Phaser.Math.Distance.Between(this.x, this.y, point.x, point.y);
      if (dist < 5) {
        this.pathIndex++;
        this.moveToNextPoint();
      }
    }
  }

  takeDamage(amount, element = null) {
    if (this.weakness && element === this.weakness) {
      amount *= 1.5;  // bonus damage if elemental weakness is hit
    }

    this.health -= amount;

    if (this.health <= 0) {
      this.die();
    }
  }

  updateHealthBar() {
    if (!this.healthBar) return;

    const barWidth = 40;
    const barHeight = 5;
    const x = this.x - barWidth / 2;
    const y = this.y - 40;

    const healthRatio = Phaser.Math.Clamp(this.health / this.maxHealth, 0, 1);

    this.healthBar.clear();
    this.healthBar.fillStyle(0x000000);
    this.healthBar.fillRect(x, y, barWidth, barHeight);
    this.healthBar.fillStyle(0xff0000);
    this.healthBar.fillRect(x, y, barWidth * healthRatio, barHeight);
  }

  die() {
    this.healthBar.destroy();
    this.destroy();
    this.emit('death', this.reward);
    console.log(`☠️ ${this.texture.key} defeated!`);
  }
}
