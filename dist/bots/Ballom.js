import Body from '../modules/abstract/Body.js'

class Ballom extends Body {
  constructor() {
    super(...arguments)
    this.crop = [18, 18]
    this.frames = {move:[1,2,1,0], doom:[0,0,1,2,3,4].map(sx => [sx, 1])}
    this.name = 'ballom'
    this.obstacles = ['bloc', 'bomb', 'tile', 'wall']
    this.ox = -1
    this.oy = -2
    this.points = 100
    this.shape = [1, 2, 16, 16]
    this.speed = 18
    this.lookAt()
    this.setDirection('R')
  }

  setDirection(direction) {
    this.vector.set(direction, this.speed)
  }
  
  lookAt() {
    this.animation.animate(this.frames.move.map(sx => [sx, 0]), 250, true)
  }

  destroy() {
    this.animation.animate(this.frames.doom, 250, false, () => {this.setPoints(); this.remove()})
    this.updatePos = false
  }

  update(time) {
    if(this.start === 0) this.start = time

    const mx = (time - this.start) * this.vector.x / 1000 // movement x
    const my = (time - this.start) * this.vector.y / 1000

    let px = this.px + mx // planned position
    let py = this.py + my

    this.start = time

    const obstacles = this.obstacles
    const enemies = this.enemies
    const collision = this.collision.detection({px, py, shape: this.shape}, {obstacles, enemies})

    if(collision.enemies) {

      const overlap = this.getOverlap(collision.enemies)
      const ox = overlap.x >= this.overlap.default
      const oy = overlap.y >= this.overlap.default

      if(ox && oy) this.destroy()
    }

    if(collision.obstacles) {

      this.setDirection(['R', 'D', 'L', 'U'][Math.intRand(0, 3)])

      if(px < this.px) px = Math.round(px - collision.obstacles[0].left)
      if(py < this.py) py = Math.round(py - collision.obstacles[0].top)
      if(px > this.px) px = Math.round(px - collision.obstacles[0].right)
      if(py > this.py) py = Math.round(py - collision.obstacles[0].bottom)
    }

    this.px = px
    this.py = py
  }
}

export default Ballom