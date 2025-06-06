// GameScene.js – Main gameplay loop for Wrath of the 12 Olympians

import Enemy from '../objects/Enemy.js';
import Tower from '../objects/Tower.js';
import WaveData from '../data/waveData.js';
import Gods from '../data/gods.js';
import GameConfig from '../config/GameConfig.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');

    // Tower selection UI
    this.createTowerUI();

    // Game state
    this.playerHealth = 100;
    this.waveInProgress = false;

    // HUD
    this.createHUD();
  }

  createTowerUI() {
    const y = GameConfig.height - 80;
    Object.entries(Gods).forEach(([key, god], index) => {
      const x = 100 + (index * 120);
      const button = this.add.image(x, y, god.texture)
        .setInteractive()
        .setScale(0.8);
      
      button.on('pointerdown', () => {
        this.selectedTower = god;
      });

      const cost = this.add.text(x, y + 30, god.cost, {
        fontSize: '16px',
        fill: '#fff'
      }).setOrigin(0.5);
    });
  }

  createHUD() {
    this.favorText = this.add.text(16, 16, '', {
      fontFamily: 'Cinzel',
      fontSize: '20px',
      color: '#ffffff'
    });
    
    this.healthText = this.add.text(16, 46, '', {
      fontFamily: 'Cinzel',
      fontSize: '20px',
      color: '#ffffff'
    });
    
    this.waveText = this.add.text(GameConfig.width - 150, 16, '', {
      fontFamily: 'Cinzel',
      fontSize: '20px',
      color: '#ffffff'
    });
    
    this.updateHUD();
  }


  create() {
    // Background
    this.add.image(GameConfig.width / 2, GameConfig.height / 2, 'background');

    // Path for enemies
    this.path = [
      { x: -50, y: 400 },
      { x: 200, y: 400 },
      { x: 200, y: 250 },
      { x: 824, y: 250 },
      { x: 824, y: 500 },
      { x: GameConfig.width + 50, y: 500 }
    ];

    // Groups
    this.enemies = this.physics.add.group();
    this.towers = this.add.group();
    this.projectiles = this.physics.add.group();

    // HUD
    this.favorText = this.add.text(16, 16, '', {
      fontFamily: 'Cinzel',
      fontSize: '20px',
      color: '#ffffff'
    });
    this.updateHUD();

    // Tower placement
    this.input.on('pointerdown', pointer => {
      const config = Gods.aphrodite; // 👈 You can swap this with Gods.aphrodite when ready
      const favor = this.registry.get('favor');
      if (favor >= config.cost && this.towers.getLength() < GameConfig.maxTowers) {
        const tower = new Tower(this, pointer.worldX, pointer.worldY, config.texture, config);
        this.towers.add(tower);
        this.registry.set('favor', favor - config.cost);
        this.updateHUD();
      }
    });

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
    if (!wave) {
      this.handleVictory();
      return;
    }

    this.waveInProgress = true;

    wave.enemies.forEach(enemyDef => {
      for (let i = 0; i < enemyDef.count; i++) {
        this.time.delayedCall(enemyDef.delay * i, () => {
          const enemy = new Enemy(this, 0, this.path[0].y, enemyDef.texture, enemyDef);
          enemy.setPath(this.path);
          this.enemies.add(enemy);

          enemy.on('death', reward => {
            const oldFavor = this.registry.get('favor');
            this.registry.set('favor', oldFavor + reward);
            this.updateHUD();
          });

          enemy.on('escape', () => {
            console.log('An enemy escaped!');
          });
        });
      }
    });

    this.currentWave++;
    this.time.delayedCall(1000 * wave.enemies.length + 1000, () => {
      this.waveInProgress = false;
    });
  }

  handleVictory() {
    this.scene.pause();
    const victoryText = this.add.text(GameConfig.width/2, GameConfig.height/2, 'Victory!\nOlympus is Saved!', {
      fontSize: '48px',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);
  }

  handleDefeat() {
    this.scene.pause();
    const defeatText = this.add.text(GameConfig.width/2, GameConfig.height/2, 'Defeat!\nOlympus has Fallen!', {
      fontSize: '48px',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);
  }

  updatePlayerHealth(damage) {
    this.playerHealth -= damage;
    this.healthText.setText(`Health: ${this.playerHealth}`);

    if (this.playerHealth <= 0) {
      this.handleDefeat();
    }
  }

  updateHUD() {
    const favor = this.registry.get('favor');
    this.favorText.setText(`Favor: ${favor}`);
  }
}
