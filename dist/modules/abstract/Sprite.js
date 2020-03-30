/**
 * Abstract Sprite Class
 * 
 * [crop] - sprite size
 * [dx] [dy] - destination position
 * [ox] [oy] - offset position
 * [px] [py] - pixel position
 * [sx] [sy] - source position
 * shape - collision area
 * updatePos - update sprite position with each redraw
 */

class Sprite {
  constructor(game, dx, dy, sx, sy) {
    this.crop = [16, 16]
    this.dx = dx
    this.dy = dy
    this.game = game
    this.grid = 16
    this.ox = 0
    this.oy = 0
    this.shape = [0, 0, 16, 16]
    this.sx = sx
    this.sy = sy
    this.updatePos = false
  }

  set px(px) {this.dx = (px - this.ox) / this.grid}
  set py(py) {this.dy = (py - this.oy) / this.grid}

  get px() {return this.dx * this.grid + this.ox}
  get py() {return this.dy * this.grid + this.oy}
}

export default Sprite