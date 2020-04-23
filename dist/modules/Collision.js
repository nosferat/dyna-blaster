/**
 * Sprite collision detector
 */

class Collision {
  constructor(game) {
    this.game = game
  }

  detection(sprite, groups) {
    const collisions = {}

    for(let item of this.game.render.list) {

      for(let i in groups) {
        const compare = groups[i].includes(item.name)

        if(compare) {
          const overlap = this.overlap(sprite, item)

          overlap.px = sprite.px
          overlap.py = sprite.py

          if(overlap.detected) {
            collisions[i] = collisions[i] || []
            collisions[i].push(overlap)
          }
        }
      }
    }
    return collisions
  }

  overlap(a, b) {
    const rect = {}

    rect.a = {
      x1: a.px + a.shape[0],
      y1: a.py + a.shape[1],
      x2: a.px + a.shape[0] + a.shape[2],
      y2: a.py + a.shape[1] + a.shape[3],
    }

    rect.b = {
      x1: b.px + b.shape[0],
      y1: b.py + b.shape[1],
      x2: b.px + b.shape[0] + b.shape[2],
      y2: b.py + b.shape[1] + b.shape[3],
    }

    const detected = (
      rect.a.x1 < rect.b.x2 &&
      rect.a.x2 > rect.b.x1 &&
      rect.a.y1 < rect.b.y2 &&
      rect.a.y2 > rect.b.y1
    )

    const left = rect.a.x1 - rect.b.x2
    const right = rect.a.x2 - rect.b.x1
    const top = rect.a.y1 - rect.b.y2
    const bottom = rect.a.y2 - rect.b.y1

    return {detected, left, right, top, bottom}
  }
}

export default Collision