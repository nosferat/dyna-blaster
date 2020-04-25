/**
 * Bonus Manager
 */

class Bonuses {
  constructor(sprite) {
    this.sprite = sprite
    this.reset()
  }

  add(bonus) {
    for(let i in bonus) {
      this[i] = parseInt(bonus[i]) ? this[i] + bonus[i] : bonus[i]
    }
  }

  reset() {
    this.fire = 1
    this.bomb = 1
    this.remote = false
    this.speed = 1
    this.bombpass = false
    this.wallpass = false
    this.vest = false
    this.life = 2
  }
}

export default Bonuses