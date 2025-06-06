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

  evolve() {
    const config = GameConfig.evolutionMultipliers;
    const currentFavor = this.scene.registry.get('favor');
    
    if (this.tier === 'hero' && currentFavor >= GameConfig.evolutionCosts.heroToDemigod) {
      this.tier = 'demigod';
      this.damage *= config.demigod;
      this.range *= config.demigod;
      this.fireRate *= 0.8; // Lower is faster
      this.scene.registry.set('favor', currentFavor - GameConfig.evolutionCosts.heroToDemigod);
      this.setTexture(this.texture.key + '_demigod');
      return true;
    } else if (this.tier === 'demigod' && currentFavor >= GameConfig.evolutionCosts.demigodToOlympian) {
      this.tier = 'olympian';
      this.damage *= config.olympian;
      this.range *= config.olympian;
      this.fireRate *= 0.6;
      this.scene.registry.set('favor', currentFavor - GameConfig.evolutionCosts.demigodToOlympian);
      this.setTexture(this.texture.key + '_olympian');
      return true;
    }
    return false;
  }
  
  update(time, delta, enemies) {
    const target = getClosestEnemy(this, enemies.getChildren(), this.range);
    
    // Show range indicator on hover
    const pointer = this.scene.input.activePointer;
    const distance = Phaser.Math.Distance.Between(this.x, this.y, pointer.x, pointer.y);
    if (distance < 40) {
      this.showRangeIndicator();
    } else {
      this.hideRangeIndicator();
    }

    if (target && canFire(this.lastFired, this.fireRate)) {
      this.fire(target);
      this.lastFired = Date.now();
    }
  }

  showRangeIndicator() {
    if (!this.rangeCircle) {
      this.rangeCircle = this.scene.add.circle(this.x, this.y, this.range, 0xffffff, 0.2);
    }
  }

  hideRangeIndicator() {
    if (this.rangeCircle) {
      this.rangeCircle.destroy();
      this.rangeCircle = null;
    }
  }

  showEvolutionUI() {
    const currentFavor = this.scene.registry.get('favor');
    const evolutionCost = this.tier === 'hero' ? 
      GameConfig.evolutionCosts.heroToDemigod : 
      GameConfig.evolutionCosts.demigodToOlympian;

    if (currentFavor >= evolutionCost && this.tier !== 'olympian') {
      const evolveButton = this.scene.add.text(this.x, this.y - 60, '⬆ Evolve', {
        backgroundColor: '#4a4',
        padding: 8,
        fontSize: '16px'
      })
      .setInteractive()
      .setOrigin(0.5);

      evolveButton.on('pointerdown', () => {
        this.evolve();
        evolveButton.destroy();
      });

      this.scene.time.delayedCall(2000, () => {
        evolveButton.destroy();
      });
    }
  }
}
