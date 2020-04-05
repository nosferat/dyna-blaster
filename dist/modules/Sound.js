/**
 * Audio Controller
 */

class Sound {
  constructor() {
    this.audio = new Audio
  }

  play(source) {
    this.audio.src = source
    this.audio.play()
  }
}

export default Sound