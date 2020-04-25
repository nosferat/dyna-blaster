/**
 * Abstract Body Class
 */

import Sprite from './Sprite.js'

import Animation from '../Animation.js'
import Collision from '../Collision.js'
import Vector from '../Vector.js'

class Body extends Sprite {
  constructor(game) {
    super(...arguments)
    this.animation = new Animation(this)
    this.collision = new Collision(game)
    this.vector = new Vector()
    this.delay = 0
    this.enemies = ['fire']
    this.rounding = 14
    this.start = 0
    this.timer = 0
    this.updatePos = true
    this.waiting = {min: 3000, max: 10000}
    this.zorder = 3
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