/**
 * Audio Controller
 */

class Sound {
  constructor() {
    this.audio = {}
  }

  play(source, name, onEnd) {
    this.audio[name] = this.audio[name] || new Audio
    this.audio[name].src = source
    this.audio[name].play()
    this.audio[name].onended = onEnd
  }
}

export default Sound