class Sound {

    constructor(context, canvas) {
      this.canvas = canvas
      this.context = context;
      this.init()
    }
  
    init() {
      this.oscillator = this.context.createOscillator();
      this.gainNode = this.context.createGain();
      this.gainNode.gain.value = 0;
      this.lowPass = this.context.createBiquadFilter();
      this.lowPass.type = "lowpass";
      this.lowPass.Q.value = 0.7;
      this.envelope = {
        attack: 0.005,
        decay: 0.1 ,
        sustain: 0.6,
        release: 0.1
      };
      this.easing = 0.00;
      this.analyser = this.context.createAnalyser();
      this.oscillator.connect(this.lowPass);
      
      this.lowPass.connect(this.gainNode);
      
      this.gainNode.connect(this.analyser);
      // this.gainNode.connect(this.context.destination) //a verifier

      this.analyser.fftSize = 2048;
      this.tailleMemoireTampon = this.analyser.fftSize;
      this.tableauDonnees = new Float32Array(this.tailleMemoireTampon);

      this.canvas.init(this.analyser, this.tableauDonnees)

    }

    play(value, waveform, cutoff, envelope) {
        const currentTime = this.context.currentTime;
        this.envelope.attack = envelope.attack;
        this.envelope.decay = envelope.decay;
        this.envelope.sustain = envelope.sustain;
        this.envelope.release = envelope.release;
        this.oscillator.type = waveform;
        this.oscillator.frequency.value = value;
        this.lowPass.frequency.value = cutoff;
       
        this.oscillator.start();
 
        this.gainNode.gain.cancelScheduledValues(currentTime);
        this.gainNode.gain.setValueAtTime(0, currentTime + this.easing);
        this.gainNode.gain.linearRampToValueAtTime(1, currentTime + this.envelope.attack + this.easing);
        this.gainNode.gain.linearRampToValueAtTime(this.envelope.sustain, currentTime + this.envelope.decay + this.envelope.attack + this.easing); 
       
        this.analyser.connect(this.context.destination);
    }
  
    stop() {
      const currentTime = this.context.currentTime;
      
      this.gainNode.gain.cancelAndHoldAtTime(currentTime); //compatible uniquement sur chrome :/
      //RECHERCHE d'ALTERNATIVE
      // this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, currentTime);
      // this.gainNode.gain.cancelScheduledValues(currentTime);

      this.gainNode.gain.setTargetAtTime(0, currentTime, this.envelope.release + this.easing)
    
      setTimeout(() => {
        this.oscillator.disconnect();
      }, 10000)
      
    }
}
export default Sound;