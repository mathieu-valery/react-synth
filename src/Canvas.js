export default class Canvas {
    constructor() {
        this.tableauDonnees = null
        this.analyser = null
    }

    init(analyser, tableauDonnees) {
        this.analyser = analyser
        this.tableauDonnees = tableauDonnees

        this.canvas = document.getElementById('canvas');
        this.contexteCanvas = canvas.getContext('2d');

        this.WIDTH = this.canvas.width;
        this.HEIGHT = this.canvas.height;
        if (this.rafID) window.cancelAnimationFrame(this.rafID)
        this.render()

    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    render(delta) {
        this.rafID = requestAnimationFrame(this.render.bind(this))
        
        this.analyser.getByteTimeDomainData(this.tableauDonnees)
        
      
        this.contexteCanvas.fillStyle = `rgb(255, 255, 255)`;

        this.contexteCanvas.fillRect(0, 0, this.WIDTH, this.HEIGHT);
        this.contexteCanvas.lineWidth = 2;
        this.contexteCanvas.strokeStyle = `rgb(0,0,0})`;

        this.contexteCanvas.beginPath();

        var largeurSegment = this.WIDTH * 1.0 / this.analyser.frequencyBinCount;
        var x = 0;

        for (var i = 0; i < this.analyser.frequencyBinCount; i++) {

            var v = this.tableauDonnees[i]/ 128 ; // var v = this.tableauDonnees[i] * 200 POUR un tableau en float 32
            var y = (v * this.HEIGHT) / 2;

            if (i === 0) {
                this.contexteCanvas.moveTo(x, y);
            } else {
                this.contexteCanvas.lineTo(x, y);
            }

            x += largeurSegment;
        }

        this.contexteCanvas.lineTo(this.canvas.width, this.canvas.height / 2);
        this.contexteCanvas.stroke();

    }
}