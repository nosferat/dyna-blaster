/**
 * Abstract Sprite Class
 * 
 * [crop] - sprite size
 * [dx] [dy] - destination position
 * [ox] [oy] - offset position
 * [px] [py] - pixel position
 * [sx] [sy] - source position
 * [overlap] - min overlap in the case of a collision with the enemy
 * [shape] - collision area
 * [updatePos] - update sprite position with each redraw
 * [zorder] - rendering order
 */

class Sprite {
  constructor(game, dx, dy, sx, sy) {
    this.crop = [16, 16]
    this.dx = dx
    this.dy = dy
    this.game = game
    this.grid = 16
    this.overlap = {min: 8}
    this.ox = 0
    this.oy = 0
    this.shape = [0, 0, 16, 16]
    this.sx = sx
    this.sy = sy
    this.updatePos = false
    this.zorder = 0
  }

  set px(px) {this.dx = (px - this.ox) / this.grid}
  set py(py) {this.dy = (py - this.oy) / this.grid}

  get px() {return this.dx * this.grid + this.ox}
  get py() {return this.dy * this.grid + this.oy}

  remove() {
    this.game.render.remove(this)
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

    if(mx < 0) { // left collision

      if(Math.abs(collision.top) <= rounding) {
        const dest = py - collision.top
        const next = py - mx
        py = Math.min(next, Math.round(dest))
      }
      else if(Math.abs(collision.bottom) <= rounding) {
        const dest = py - collision.bottom
        const next = py + mx
        py = Math.max(next, Math.round(dest))
      }
      px = px - collision.left
    }

    else if(my < 0) { // top collision

      if(Math.abs(collision.left) <= rounding) {
        const dest = px - collision.left
        const next = px - my
        px = Math.min(next, Math.round(dest))
      }
      else if(Math.abs(collision.right) <= rounding) {
        const dest = px - collision.right
        const next = px + my
        px = Math.max(next, Math.round(dest))
      }
      py = py - collision.top
    }

    else if(mx > 0) { // right collision

      if(Math.abs(collision.top) <= rounding) {
        const dest = py - collision.top
        const next = py + mx
        py = Math.min(next, Math.round(dest))
      }
      else if(Math.abs(collision.bottom) <= rounding) {
        const dest = py - collision.bottom
        const next = py - mx
        py = Math.max(next, Math.round(dest))
      }
      px = px - collision.right
    }

    else if(my > 0) { // bottom collision

      if(Math.abs(collision.left) <= rounding) {
        const dest = px - collision.left
        const next = px + my
        px = Math.min(next, Math.round(dest))
      }
      else if(Math.abs(collision.right) <= rounding) {
        const dest = px - collision.right
        const next = px - my
        px = Math.max(next, Math.round(dest))
      }
      py = py - collision.bottom
    }

    return [px, py]
  }
}

export default Sprite