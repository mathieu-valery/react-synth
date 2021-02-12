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
      
      this.compressor = this.context.createDynamicsCompressor();
      this.compressor.threshold.value = -50;
      this.compressor.ratio.value = 12;
      this.analyser = this.context.createAnalyser();

      this.oscillator.connect(this.lowPass);
      
      this.lowPass.connect(this.gainNode);
      
      this.gainNode.connect(this.compressor);
      
      this.compressor.connect(this.analyser);

      this.analyser.fftSize = 2048;
      this.tailleMemoireTampon = this.analyser.fftSize;
      this.tableauDonnees = new Float32Array(this.tailleMemoireTampon);

      this.canvas.init(this.analyser, this.tableauDonnees)

    }

    play(value, waveform, cutoff, envelope) {
        this.timeAtStart = this.context.currentTime;
        this.envelope.attack = envelope.attack;
        this.envelope.decay = envelope.decay;
        this.envelope.sustain = envelope.sustain;
        this.envelope.release = envelope.release;
        this.oscillator.type = waveform;
        this.oscillator.frequency.value = value;
        this.lowPass.frequency.value = cutoff;
       
        this.oscillator.start();

        this.gainNode.gain.cancelScheduledValues(this.timeAtStart);
        this.gainNode.gain.setValueAtTime(0, this.timeAtStart);
        this.gainNode.gain.linearRampToValueAtTime(1, this.timeAtStart + this.envelope.attack);
        this.gainNode.gain.linearRampToValueAtTime(this.envelope.sustain, this.timeAtStart + this.envelope.decay + this.envelope.attack); 
       
        this.analyser.connect(this.context.destination);
    }
  
    stop() {
      this.timeAtRelease = this.context.currentTime;
      console.log('time at release' + this.timeAtRelease);
      this.gainNode.gain.cancelAndHoldAtTime(this.timeAtRelease); //compatible uniquement sur chrome :/
      // RECHERCHE d'ALTERNATIVE
      // this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.timeAtRelease);
      // this.gainNode.gain.cancelScheduledValues(this.timeAtRelease);
      this.gainNode.gain.setTargetAtTime(0, this.timeAtRelease, this.envelope.release);
      
      let timeToStop = this.timeAtStart + this.timeAtRelease + this.envelope.release;
      console.log('time to stop' + timeToStop);
      // this.gainNode.gain.exponentialRampToValueAtTime(0.01, timeToStop)

      setTimeout(() => { //ne marche pas si on relache la notependant le temps d'attaque
        this.oscillator.stop();
        this.oscillator.disconnect();
        console.log('disconnected after ' + timeToStop)
        
      }, 10000)

      // this.oscillator.onended = () => {
      //   this.oscillator.disconnect();
      //   this.context.close();
      // };
    }
    
}

export default Sound;