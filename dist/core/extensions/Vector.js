class Vector {
  constructor() {
    this.x = 0
    this.y = 0
  }

  set(direction, speed) {
    this.direction = direction
    this.speed = speed
    this.x = 0
    this.y = 0

    switch(direction) {
      case 'L': this.x = -this.speed; break
      case 'U': this.y = -this.speed; break
      case 'R': this.x = +this.speed; break
      case 'D': this.y = +this.speed; break
    }
  }
}

export default Vector