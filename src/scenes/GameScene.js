// GameScene.js – Main gameplay loop for Wrath of the 12 Olympians

import Enemy from '../objects/Enemy.js';
import Tower from '../objects/Tower.js';
import WaveData from '../data/waveData.js';
import Gods from '../data/gods.js';
import GameConfig from '../config/GameConfig.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // Background
    this.add.image(GameConfig.width / 2, GameConfig.height / 2, 'background');

    // Groups
    this.enemies = this.physics.add.group();
    this.towers = this.add.group();
    this.projectiles = this.physics.add.group();

    // Place test tower (Zeus)
    const zeusTower = new Tower(this, 500, 300, Gods.zeus.texture, Gods.zeus);
    this.towers.add(zeusTower);

    // Start first wave
    this.currentWave = 0;
    this.spawnNextWave();
  }

  update(time, delta) {
    // Update towers
    this.towers.getChildren().forEach(tower => {
      tower.update(time, delta, this.enemies);
    });

    // Update projectiles
    this.projectiles.getChildren().forEach(projectile => {
      if (projectile.update) projectile.update();
    });

    // Optional: end wave if all enemies are dead
    if (this.enemies.countActive() === 0 && !this.waveInProgress) {
      this.time.delayedCall(2000, () => this.spawnNextWave());
    }
  }

  spawnNextWave() {
    const wave = WaveData[this.currentWave];
    if (!wave) return;

    this.waveInProgress = true;

    wave.enemies.forEach(enemyDef => {
      for (let i = 0; i < enemyDef.count; i++) {
        this.time.delayedCall(enemyDef.delay * i, () => {
          const enemy = new Enemy(this, 0, 300, enemyDef.texture, enemyDef);
          this.enemies.add(enemy);

          enemy.on('death', reward => {
            const oldFavor = this.registry.get('favor');
            this.registry.set('favor', oldFavor + reward);
          });
        });
      }
    });

    this.currentWave++;
    this.time.delayedCall(1000 * wave.enemies.length + 1000, () => {
      this.waveInProgress = false;
    });
  }
}
