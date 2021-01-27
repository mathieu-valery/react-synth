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
        let now = context.currentTime;
        let cutoff = this.props.cutoff;
        
        
        note.play(frequency, waveform, cutoff, now);
       
    }
    
    render() {
        return(
            <div className={`${'key'} ${this.props.color}`} key={this.props.note} onClick={this.handleClick}></div>
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