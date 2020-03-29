/**
 * Abstract Stage Class
 */

class Stage {
  constructor(game) {
    this.game = game
  }

  async load() {
    await
    this.game.display.loadImages(this.images)
    this.build()
  }

  add(sprite) {
    this.game.render.add(sprite)
  }
}

export default Stage