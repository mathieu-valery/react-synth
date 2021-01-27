import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sound from '../sound.js';


class Key extends Component {
    handleClick = () => {
        var context = new (window.AudioContext || window.webkitAudioContext)();
        let note = new Sound(context);
        let frequency = this.props.frequency;
        let waveform = this.props.waveform;
        let cutoff = this.props.cutoff;
        let now = context.currentTime;

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
        cutoff: state.cutoff 
    };
};

export default connect(mapStateToProps)(Key);