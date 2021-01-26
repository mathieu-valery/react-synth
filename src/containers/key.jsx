import React, {Component} from 'react';

class Key extends Component {
    handleClick = () => {
        var context = new (window.AudioContext || window.webkitAudioContext)();

        var oscillator = context.createOscillator();

        oscillator.type = 'sine';
        oscillator.frequency.value = this.props.frequency;
        oscillator.connect(context.destination);
        
        var gain = context.createGain();
        oscillator.connect(gain);
        gain.connect(context.destination);

        var now = context.currentTime;
        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        oscillator.start(now);
        oscillator.stop(now + 0.5);
    }
    
    render() {
        return(
            <div className={`${'key'} ${this.props.color}`} key={this.props.note} onClick={this.handleClick}></div>
        )
    }
}

export default Key;