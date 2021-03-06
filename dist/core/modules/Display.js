/**
 * Display Controller
 */

class Display {
  constructor(game, w, h) {
    this.game = game
    this.w = w
    this.h = h
    this.canvas = this.createCanvas()
    this.context = this.canvas.getContext('2d')
    this.context.imageSmoothingEnabled = false
    this.images = {}
  }

  createCanvas() {
    const canvas = document.createElement('canvas')
    canvas.width = this.w
    canvas.height = this.h
    return this.game.parent.appendChild(canvas)
  }

  loadImage(path, name) {
    return new Promise((resolve, reject) => {
      this.images[name] = new Image()
      this.images[name].src = path
      this.images[name].addEventListener('load', resolve)
      this.images[name].addEventListener('error', reject)
    })
  }

  loadImages(images) {
    const promises = []
    for(let i in images) {
      const path = images[i]
      const image = this.loadImage(path, i)
      promises.push(image)
    }
    return Promise.all(promises)
  }

  text(sprite) {
    const text = sprite.text

    if(text !== undefined) {
      const px = sprite.px
      const py = sprite.py

      this.context.fillStyle = sprite.color
      this.context.font = sprite.font
      this.context.textAlign = sprite.align
      this.context.textBaseline = sprite.baseline
      this.context.fillText(text, px, py)
    }
  }

  draw(sprite) {
    const image = this.images[sprite.name]

    if(image) {
      const ch = sprite.crop[1]
      const cw = sprite.crop[0]
      const px = sprite.px + sprite.tx
      const py = sprite.py + sprite.ty
      const sx = sprite.sx * sprite.crop[1]
      const sy = sprite.sy * sprite.crop[0]

      this.context.drawImage(image, sx, sy, cw, ch, px, py, cw, ch)
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.w, this.h)
  }
}

export default Display