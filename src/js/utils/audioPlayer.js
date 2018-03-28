class AudioPlayer {

  constructor() {
    this.audio = new Audio()
  }

  static playAudio(url) {
    console.log('play');
    
    if (!url) return false;
    this.stopAudio()
    this.audio = new Audio(url)
    this.audio.play()
    this.audio.volume = .05
  }

  static stopAudio() {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
    }
  }
}

export default AudioPlayer