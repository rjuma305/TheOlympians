import Projectile from '../objects/Projectile.js';

/**
 * GodPowerManager
 *
 * Manages activation and cooldowns for god powers:
 * Zeus chain lightning, Poseidon wave, Artemis barrage.
 */
export default class GodPowerManager {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    this.scene = scene;
    this.cooldowns = {
      zeus_bolt: 0,
      poseidon_wave: 0,
      artemis_barrage: 0,
    };
    this.cooldownDurations = {
      zeus_bolt: 5000,
      poseidon_wave: 8000,
      artemis_barrage: 6000,
    };
  }

  /**
   * Activate a god power if off cooldown.
   * @param {string} godKey
   * @param {Phaser.Math.Vector2} position
   */
  activatePower(godKey, position) {
    const now = this.scene.time.now;
    if (now < this.cooldowns[godKey]) {
      return;
    }
    switch (godKey) {
      case 'zeus_bolt':
        this.chainLightning(position);
        break;
      case 'poseidon_wave':
        this.poseidonWave(position);
        break;
      case 'artemis_barrage':
        this.artemisBarrage(position);
        break;
      default:
        console.warn(`Unknown god power: ${godKey}`);
    }
    this.cooldowns[godKey] = now + this.cooldownDurations[godKey];
  }

  /**
   * Chain lightning effect (Zeus bolt).
   */
  chainLightning(position) {
    const radius = 200;
    const damage = 50;
    const maxTargets = 3;
    const targets = this.scene.enemies.getChildren()
      .filter(e => e.active && Phaser.Math.Distance.Between(e.x, e.y, position.x, position.y) <= radius)
      .sort((a, b) => Phaser.Math.Distance.Between(a.x, a.y, position.x, position.y)
                   - Phaser.Math.Distance.Between(b.x, b.y, position.x, position.y))
      .slice(0, maxTargets);
    targets.forEach(target => {
      const bolt = new Projectile(this.scene, position.x, position.y,
        'lightning_bolt', target, { damage, element: 'lightning', speed: 600 });
      this.scene.projectiles.add(bolt);
    });
    if (this.scene.sound) {
      this.scene.sound.play('zeus_bolt');
    }
  }

  /**
   * Radial slow and damage tick (Poseidon wave).
   */
  poseidonWave(position) {
    const radius = 150;
    const damage = 30;
    const slowFactor = 0.5;
    const slowDuration = 3000;
    const gfx = this.scene.add.graphics({ fillStyle: { color: 0x00ffff, alpha: 0.4 } });
    const wave = { r: 0 };
    this.scene.tweens.add({
      targets: wave,
      r: radius,
      ease: 'Cubic.easeOut',
      duration: 500,
      onUpdate: () => {
        gfx.clear(); gfx.fillStyle(0x00ffff, 0.4);
        gfx.fillCircle(position.x, position.y, wave.r);
      },
      onComplete: () => gfx.destroy()
    });
    this.scene.enemies.getChildren()
      .filter(e => e.active && Phaser.Math.Distance.Between(e.x, e.y, position.x, position.y) <= radius)
      .forEach(enemy => {
        enemy.takeDamage(damage);
        enemy.speed *= slowFactor;
        this.scene.time.delayedCall(slowDuration, () => { enemy.speed /= slowFactor; });
      });
  }

  /**
   * Rapid arrow volley (Artemis barrage).
   */
  artemisBarrage(position) {
    const damage = 20;
    const speed = 500;
    const maxArrows = 5;
    const enemies = this.scene.enemies.getChildren().filter(e => e.active);
    if (!enemies.length) {
      return;
    }
    enemies.sort((a, b) => Phaser.Math.Distance.Between(a.x, a.y, position.x, position.y)
                   - Phaser.Math.Distance.Between(b.x, b.y, position.x, position.y));
    enemies.slice(0, maxArrows).forEach(target => {
      const arrow = new Projectile(this.scene, position.x, position.y,
        'arrow', target, { damage, element: 'physical', speed });
      this.scene.projectiles.add(arrow);
    });
  }
}