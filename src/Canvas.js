export default class Canvas {
    constructor() {
        this.noteValue = null
        this.render()
    }

    update(noteValue) {
        this.noteValue = noteValue
    }

    render() {
        console.log(this.noteValue)

        let canvas = document.getElementById('canvas');
        // this.WIDTH = this.canvas.width;
        // this.HEIGHT = this.canvas.height;
        let contexteCanvas = canvas.getContext('2d');
        let red = this.noteValue - 250;
        contexteCanvas.fillStyle = 'rgb(' + red + ', 0, 0)';
        contexteCanvas.fillRect(0, 0, 300, 300);


        requestAnimationFrame(() => {
            this.render()
        })
    }
}