// Tower.js – Base class for all tower types (hero, demigod, Olympian)

import Projectile from './Projectile.js';
import { getClosestEnemy, canFire } from '../utils/helpers.js';

export default class Tower extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, config = {}) {
    super(scene, x, y, texture);

    // Set base stats
    this.scene = scene;
    this.range = config.range || 150;
    this.damage = config.damage || 20;
    this.fireRate = config.fireRate || 1000; // milliseconds
    this.element = config.element || null;
    this.tier = config.tier || 'hero';
    this.lastFired = 0;

    // Add to scene
    this.scene.add.existing(this);
  }

  update(time, delta, enemies) {
    const target = getClosestEnemy(this, enemies.getChildren(), this.range);

    if (target && canFire(this.lastFired, this.fireRate)) {
      this.fire(target);
      this.lastFired = Date.now();
    }
  }

  fire(target) {
    const bolt = new Projectile(this.scene, this.x, this.y, 'projectile', target, {
      damage: this.damage,
      element: this.element,
      speed: 300
    });

    this.scene.projectiles.add(bolt);
  }

  upgradeTo(newConfig) {
    this.range = newConfig.range || this.range;
    this.damage = newConfig.damage || this.damage;
    this.fireRate = newConfig.fireRate || this.fireRate;
    this.element = newConfig.element || this.element;
    this.tier = newConfig.tier || this.tier;

    if (newConfig.texture) {
      this.setTexture(newConfig.texture);
    }
  }
}
