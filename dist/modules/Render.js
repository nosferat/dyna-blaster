/**
 * Render Manager
 */

class Render {
  constructor(game) {
    this.game = game
    this.list = []
    this.loop = requestAnimationFrame.bind(window)
    this.loop(time => this.update(time))
  }

  add(sprite) {
    this.list.push(sprite)
    this.list.sort((a, b) => a.zorder > b.zorder ? 1 : -1)
  }

  find(dx, dy) {
    return this.list.filter(item => Math.round(item.dx) === dx && Math.round(item.dy) === dy)
  }

  clear() {
    this.game.display.clear()
    this.list = []
  }

  update(time) {
    for(const sprite of this.list) {
      if(sprite.updatePos) {
        sprite.update(time)
      }
      this.game.display.draw(sprite)
    }
    this.loop(time => this.update(time))
  }
}

export default Render