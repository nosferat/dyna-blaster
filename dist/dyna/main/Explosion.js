/**
 * Explosion Controller
 */

import Bomb from '../models/sprites/Bomb.js'
import Fire from '../models/sprites/Fire.js'

class Explosion {
  constructor(game) {
    this.game = game
    this.list = []
    this.maxBombs = 5
    this.power = 5
    this.timer = 3000
  }

  canPropagate(items) {
    return !items.some(item => ['bloc', 'wall', 'tile'].includes(item.name))
  }

  isBomb(dx, dy) {
    return this.list.find(item => (item.dx === dx) && (item.dy === dy))
  }

  setBomb(dx, dy) {
    if(this.list.length < this.maxBombs) {

      dx = Math.round(dx)
      dy = Math.round(dy)

      if(!this.isBomb(dx, dy)) {

        const bomb = new Bomb(this.game, dx, dy, 0, 0)

        bomb.detonate(this.timer).then(() => this.explode(bomb))

        this.game.render.add(bomb)
        this.list.push(bomb)
      }
    }
  }

  explode(bomb) {
    this.list.splice(this.list.indexOf(bomb), 1)

    const cx = bomb.dx // explosion center
    const cy = bomb.dy

    const blastwave = []
    const obstacles = []
    const direction = [
      [+1, 0, 2, 4],
      [ 0,+1, 2, 5],
      [-1, 0, 2, 4],
      [ 0,-1, 2, 5],
    ]

    blastwave.push([cx, cy, 2, 6])

    for(let i in direction) {

      let propagate = 1

      for(let power = 1; power < this.power; power++) {

        const dx = direction[i][0] * power + cx
        const dy = direction[i][1] * power + cy
        const sx = direction[i][2]
        const sy = direction[i][3]

        const cell = this.game.render.find(dx, dy)

        if(this.canPropagate(cell)) {
          propagate++
          blastwave.push([dx, dy, sx, sy])
        }
        else {
          obstacles.push(...cell); break
        }
      }

      if(propagate >= 2 && propagate === this.power) {
        blastwave[blastwave.length-1][3] = i
      }
    }

    for(let location of blastwave) {
      this.game.render.add(new Fire(this.game, ...location))
    }

    for(let sprite of obstacles) {
      switch(sprite.name) {
        case 'wall': sprite.destroy()
      }
    }
  }
}

export default Explosion