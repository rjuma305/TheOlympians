export default class AudioManager {
  /**
   * @type {{MENU: string, CALM: string, COMBAT: string}}
   */
  static STATES = {
    MENU: 'menu',
    CALM: 'calm',
    COMBAT: 'combat',
  };

  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    this.scene = scene;
    this.currentMusic = null;
    this.currentState = null;
  }

  /**
   * Change audio state, stopping previous music and playing appropriate track.
   * Assumes tracks are loaded in PreloadScene ('menu_music', 'combat_music').
   * @param {string} state
   */
  changeState(state) {
    if (state === this.currentState) return;
    this.currentState = state;
    if (this.currentMusic) {
      this.currentMusic.stop();
    }
    switch (state) {
      case AudioManager.STATES.MENU:
        this.currentMusic = this.scene.sound.add('menu_music', { loop: true, volume: 0.5 });
        break;
      case AudioManager.STATES.CALM:
      case AudioManager.STATES.COMBAT:
        this.currentMusic = this.scene.sound.add('combat_music', { loop: true, volume: 0.5 });
        break;
      default:
        break;
    }
    if (this.currentMusic) {
      this.currentMusic.play();
    }
  }
}