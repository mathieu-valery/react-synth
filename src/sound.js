class Sound {

    constructor(context, canvas) {
      this.canvas = canvas
      this.context = context;
      this.init()
    }
  
    init() {
      this.oscillator = this.context.createOscillator();
      this.gainNode = this.context.createGain();
      this.lowPass = this.context.createBiquadFilter();
      this.lowPass.type = "lowpass";
      this.lowPass.Q.value = 0.7;
      this.analyser = this.context.createAnalyser();
      this.oscillator.connect(this.lowPass);
      
      this.lowPass.connect(this.gainNode);
      
      // this.gainNode.connect(this.context.destination);
      this.gainNode.connect(this.analyser);
      

      this.analyser.fftSize = 2048;
      this.tailleMemoireTampon = this.analyser.fftSize;
      this.tableauDonnees = new Float32Array(this.tailleMemoireTampon);

      this.canvas.init(this.analyser, this.tableauDonnees)

    }

    play(value, waveform, cutoff) {
        const time = this.context.currentTime
        this.oscillator.type = waveform;
        this.oscillator.frequency.value = value;
        this.lowPass.frequency.value = cutoff;
        this.gainNode.gain.setValueAtTime(1, time);
        
        this.oscillator.start();
        this.oscillator.connect(this.context.destination);
        this.analyser.connect(this.context.destination);
       
        
        // this.canvas.update(this.tableauDonnees, this.analyser) // passer les datas qui permettent de dessiner la waveform
        this.stop(time);

    }
  
    stop(time) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
      this.oscillator.stop(time + 1);

      this.oscillator.disconnect(this.context.destination);
    }
}
export default Sound;