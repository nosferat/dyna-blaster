/**
 * Abstract Body Class
 */

import Animation from '../../core/extensions/Animation.js'
import Collision from '../../core/extensions/Collision.js'
import Vector from '../../core/extensions/Vector.js'

import Sprite from './Sprite.js'
import Print from './sprites/Print.js'

class Body extends Sprite {
  constructor(game) {
    super(...arguments)
    this.animation = new Animation(this)
    this.collision = new Collision(game)
    this.vector = new Vector()
    this.enemies = ['fire']
    this.rounding = 14
    this.start = 0
    this.updatePos = true
    this.zorder = 3
  }

  setPoints() {
    const print = new Print(this.game, 0, 0, {align:'center', baseline:'middle', font:'5px Dyna Micro', timeout:2000})

    print.ox = this.px + this.tx + this.grid / 2 + 1
    print.oy = this.py + this.ty + this.grid / 2 + 1
    print.text = this.points

    this.game.scene.vars.score += this.points
  }

  getOverlap(collision) {
    const hor = [] // horizontal overlap
    const ver = []

    for(let i in collision) {

      const L = Math.abs(collision[i].left)
      const T = Math.abs(collision[i].top)
      const R = Math.abs(collision[i].right)
      const B = Math.abs(collision[i].bottom)

      hor.push(Math.min(L, R)) // overlap side
      ver.push(Math.min(T, B))
    }
    const x = Math.max(...hor) // largest overlap
    const y = Math.max(...ver)

    return {x, y}
  }

  getAround(collision, mx, my, rounding) {
    let px = collision.px
    let py = collision.py
    let missing = true

    if(mx < 0) { // left collision

      if(Math.abs(collision.top) <= rounding) {
        const dest = py - collision.top
        const next = py - mx
        missing = false
        py = Math.min(next, Math.round(dest))
      }
      else if(Math.abs(collision.bottom) <= rounding) {
        const dest = py - collision.bottom
        const next = py + mx
        missing = false
        py = Math.max(next, Math.round(dest))
      }
      px = Math.round(px - collision.left)
    }

    else if(my < 0) { // top collision

      if(Math.abs(collision.left) <= rounding) {
        const dest = px - collision.left
        const next = px - my
        missing = false
        px = Math.min(next, Math.round(dest))
      }
      else if(Math.abs(collision.right) <= rounding) {
        const dest = px - collision.right
        const next = px + my
        missing = false
        px = Math.max(next, Math.round(dest))
      }
      py = Math.round(py - collision.top)
    }

    else if(mx > 0) { // right collision

      if(Math.abs(collision.top) <= rounding) {
        const dest = py - collision.top
        const next = py + mx
        missing = false
        py = Math.min(next, Math.round(dest))
      }
      else if(Math.abs(collision.bottom) <= rounding) {
        const dest = py - collision.bottom
        const next = py - mx
        missing = false
        py = Math.max(next, Math.round(dest))
      }
      px = Math.round(px - collision.right)
    }

    else if(my > 0) { // bottom collision

      if(Math.abs(collision.left) <= rounding) {
        const dest = px - collision.left
        const next = px + my
        missing = false
        px = Math.min(next, Math.round(dest))
      }
      else if(Math.abs(collision.right) <= rounding) {
        const dest = px - collision.right
        const next = px - my
        missing = false
        px = Math.max(next, Math.round(dest))
      }
      py = Math.round(py - collision.bottom)
    }

    return {px, py, missing}
  }
}

export default Body