class Sound {

    constructor(context) {
      this.context = context;
    }
  
    init() {
      this.oscillator = this.context.createOscillator();
      this.gainNode = this.context.createGain();
      this.lowPass = this.context.createBiquadFilter();
      this.oscillator.connect(this.lowPass)
      this.lowPass.connect(this.gainNode);
      this.gainNode.connect(this.context.destination);

      //réglages par défault
      this.oscillator.type = 'sine';
      this.lowPass.type = "lowpass";
      this.lowPass.frequency.value = 4000;
      this.lowPass.Q.value = 0.7;
    }
  
    play(value, waveform, cutoff, time) {
        this.init();
        this.oscillator.type = waveform;
        this.oscillator.frequency.value = value;
        this.lowPass.frequency.value = cutoff;
        this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
              
        this.oscillator.start(time);
        this.stop(time);
  
    }
  
    stop(time) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
      this.oscillator.stop(time + 1);
    }
  
  }


export default Sound;