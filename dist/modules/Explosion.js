/**
 * Explosion Controller
 */

import Bomb from '../sprites/Bomb.js'
import Fire from '../sprites/Fire.js'

class Explosion {
  constructor(game) {
    this.game = game
    this.list = []
    this.maxBombs = 1
    this.power = 1
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

    const direction = [
      [+0, +0],
      [+1, +0],
      [+0, +1],
      [-1, +0],
      [+0, -1],
    ]

    for(let i in direction) {

      const dx = cx + direction[i][0]
      const dy = cy + direction[i][1]

      const cell = this.game.render.find(dx, dy)

      for(let item of cell) {
        if(item.name === 'wall') {
          item.destroy()
        }
      }

      if(this.canPropagate(cell)) {
        this.game.render.add(new Fire(this.game, dx, dy, 2, i))
      }
    }
  }
}

export default Explosion