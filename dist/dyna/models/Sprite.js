/**
 * Abstract Sprite Class
 * 
 * [crop] - sprite size
 * [dx] [dy] - destination position (read only)
 * [ox] [oy] - offset position
 * [px] [py] - pixel position
 * [sx] [sy] - source position
 * [tx] [ty] - translate position (not involved in math calculation)
 * [overlap] - min overlap in the case of a collision (max value 16 for cell size 16)
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
    this.overlap = {default: 8, portal: 14}
    this.ox = 0
    this.oy = 0
    this.shape = [0, 0, 16, 16]
    this.sx = sx
    this.sy = sy
    this.tx = 0
    this.ty = 24
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
}

export default Sprite