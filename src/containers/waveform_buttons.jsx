import React, {Component} from 'react';
import WaveformButton from './waveform_button.jsx';

class WaveformButtons extends Component {
    
    render() {
        return(
        <div className='buttons'>
            <WaveformButton name="sine"/>
            <WaveformButton name="square"/>
            <WaveformButton name="triangle"/>
            <WaveformButton name="sawtooth"/>
        </div>
        )
    }
}

export default WaveformButtons;