/**
 * Text Sprite
 * 
 * [dx] [dy] - destination position
 * [ox] [oy] - offset position
 * [zorder] - rendering order
 */

class Print {
  constructor(game, dx, dy, {align = 'left', baseline = 'alphabetic', color = 'white', font = '7px Dyna Main', timeout = null}) {
    this.align = align
    this.baseline = baseline
    this.color = color
    this.dx = dx
    this.dy = dy
    this.font = font
    this.game = game
    this.grid = 16
    this.ox = 0
    this.oy = 0
    this.zorder = 1
    this.game.render.add(this)
    this.remove(timeout)
  }

  set px(px) {this.dx = (px - this.ox) / this.grid}
  set py(py) {this.dy = (py - this.oy) / this.grid}

  get px() {return this.dx * this.grid + this.ox}
  get py() {return this.dy * this.grid + this.oy}

  remove(ms) {
    if(ms) setTimeout(() => this.game.render.remove(this), ms)
  }
}

export default Print