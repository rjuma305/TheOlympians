// helpers.js – Utility functions used across Wrath of the 12 Olympians

/**
 * Calculates the distance between two Phaser Game Objects.
 */
export function getDistance(obj1, obj2) {
  const dx = obj1.x - obj2.x;
  const dy = obj1.y - obj2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Checks if a tower can fire again based on its cooldown.
 * @param {number} lastFired - Timestamp of last shot
 * @param {number} fireRate - Milliseconds between shots
 */
export function canFire(lastFired, fireRate) {
  return Date.now() - lastFired > fireRate;
}

/**
 * Finds the closest enemy within a given range.
 * @param {Phaser.GameObjects.Sprite} tower 
 * @param {Phaser.GameObjects.Sprite[]} enemies 
 * @param {number} range 
 * @returns Enemy or null
 */
export function getClosestEnemy(tower, enemies, range) {
  let closest = null;
  let minDist = range;

  enemies.forEach(enemy => {
    const dist = getDistance(tower, enemy);
    if (dist < minDist) {
      minDist = dist;
      closest = enemy;
    }
  });

  return closest;
}
