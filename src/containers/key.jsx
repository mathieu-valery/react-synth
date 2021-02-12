import React, {Component} from 'react';
import { connect } from 'react-redux';
import Sound from '../sound.js';


class Key extends Component {

    handleClick = () => {
        this.context = this.props.context
        let note = new Sound(this.context, this.props.canvas);
            
        let frequency = this.props.frequency;
        let waveform = this.props.waveform;
        let cutoff = this.props.cutoff;
        let envelope = this.props.envelope;
            
        note.play(frequency, waveform, cutoff, envelope);
            
        let clickedNote = document.getElementById(this.props.note)
        clickedNote.classList.add('active');
        setTimeout(function(){
            clickedNote.classList.remove('active');
            note.stop();
        }, 500);
    }

    render() {
        return(
            <div className={`${'key'} ${this.props.color}`} key={this.props.note} id={this.props.note} onClick={this.handleClick} data-key={this.props.key}>
                <span>{this.props.keypad}</span>
            </div>
        )
    }
}

function mapStateToProps(state) { 
    return {
        waveform: state.waveform,
        cutoff: state.cutoff,
        canvas: state.canvas,
        envelope: state.envelope 
    };
};

export default connect(mapStateToProps)(Key);