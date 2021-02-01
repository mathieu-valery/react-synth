import React, {Component} from 'react';
import { connect } from 'react-redux';
import Sound from '../sound.js';


class Key extends Component {

    handleClick = () => {
        // recuperer le canvas depuis le store (passé en props)
        let note = new Sound(this.props.context, this.props.canvas);
        
        let frequency = this.props.frequency;
        let waveform = this.props.waveform;
        let cutoff = this.props.cutoff;
        let now = this.props.context.currentTime;

        note.play(frequency, waveform, cutoff, now);

        let clickedNote = document.getElementById(this.props.note)
        clickedNote.classList.add('active');
        setTimeout(function(){clickedNote.classList.remove('active');}, 500);
    }

    render() {
        return(
            <div className={`${'key'} ${this.props.color}`} key={this.props.note} id={this.props.note} onClick={this.handleClick}></div>
        )
    }
}

function mapStateToProps(state) { 
    return {
        waveform: state.waveform,
        cutoff: state.cutoff,
        canvas: state.canvas 
    };
};

export default connect(mapStateToProps)(Key);