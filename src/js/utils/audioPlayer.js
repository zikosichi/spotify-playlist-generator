class AudioPlayer {

  constructor() {
    this.audio = new Audio()
  }

  static playAudio(url) {
    this.stopAudio()
    this.audio = new Audio(url)
    this.audio.play()
  }

  static stopAudio() {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
    }
  }
}

export default AudioPlayer