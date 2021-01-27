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
      this.analyser.connect(this.gainNode);
      this.gainNode.connect(this.context.destination);
      this.visualize();

    }

    play(value, waveform, cutoff) {
        const time = this.context.currentTime
        this.oscillator.type = waveform;
        this.oscillator.frequency.value = value;
        this.lowPass.frequency.value = cutoff;
        this.gainNode.gain.setValueAtTime(1, time);
      
        this.canvas.update(value) // passer les datas qui permettent de dessiner la waveform
              
        this.oscillator.start();
        this.oscillator.connect(this.context.destination);
        this.stop(time);

    }
  
    stop(time) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
      this.oscillator.stop(time + 1);

      this.oscillator.disconnect(this.context.destination);
    }

    visualize() {
      this.analyser.fftSize = 2048;
      this.tailleMemoireTampon = this.analyser.frequencyBinCount;
      this.tableauDonnees = new Uint8Array(this.tailleMemoireTampon);
      
      // this.canvas = document.getElementById('canvas');
      // this.WIDTH = this.canvas.width;
      // this.HEIGHT = this.canvas.height;
      // this.contexteCanvas = canvas.getContext('2d');
      // // contexteCanvas.fillStyle = 'green';
      // // contexteCanvas.fillRect(0, 0, 300, 300);
      // this.contexteCanvas.clearRect(0, 0, this.WIDTH, this.HEIGHT);
      // this.draw();

    }

    draw() {
      // let drawVisual = requestAnimationFrame(this.draw());
      // this.contexteCanvas.update(data)
    //   // this.analyser.getByteTimeDomainData(this.tableauDonnees);

    //   this.contexteCanvas.fillStyle = 'rgb(200, 200, 200)';
    //   this.contexteCanvas.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    //   this.contexteCanvas.lineWidth = 2;
    //   this.contexteCanvas.strokeStyle = 'rgb(0, 0, 0)';

    //   this.contexteCanvas.beginPath();

    //   var largeurSegment = this.WIDTH * 1.0 / this.tailleMemoireTampon;
    //   var x = 0;

    //   for(var i = 0; i < this.tailleMemoireTampon; i++) {

    //     var v = this.tableauDonnees[i] / 128.0;
    //     var y = v * this.WIDTH/2;

    //     if(i === 0) {
    //       this.contexteCanvas.moveTo(x, y);
    //     } else {
    //       this.contexteCanvas.lineTo(x, y);
    //     }

    //     x += largeurSegment;
    //   }
    //   this.contexteCanvas.lineTo(this.canvas.width, this.canvas.height/2);
    //   this.contexteCanvas.stroke();

    // }
  
  }

}
export default Sound;