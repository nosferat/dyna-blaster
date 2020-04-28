/**
 * Render Manager
 * 
 * [watch] - the time elapsed after the start, excluding pauses
 */

class Render {
  constructor(game) {
    this.game = game
    this.list = []
    this.start = 0
    this.watch = 0
    this.loop = requestAnimationFrame.bind(window)
    this.stop = cancelAnimationFrame.bind(window)
    this.update(0)
    this.game.events.add('onToggPause', e => this.toggPause(e))
  }

  add(sprite) {
    this.list.push(sprite)
    this.list.sort((a, b) => a.zorder > b.zorder ? 1 : -1)
  }

  remove(sprite) {
    this.list.splice(this.list.indexOf(sprite), 1)
  }

  find(dx, dy) {
    return this.list.filter(item => Math.round(item.dx) === dx && Math.round(item.dy) === dy)
  }

  clear() {
    this.game.display.clear()
    this.list = []
  }

  toggPause(e) {
    e.paused ? this.stop(this.id) : this.loop(time => this.update(time, true))
  }

  update(time, sync) {
    if(this.start === 0 || sync) this.start = time

    this.watch += time - this.start
    this.start = time

    for(const sprite of this.list) {
      if(sprite.updatePos) {
        sprite.update(this.watch)
      }
      this.game.display.draw(sprite)
      this.game.display.text(sprite)
    }
    this.id = this.loop(time => this.update(time))
  }
}

export default Render