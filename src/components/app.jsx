import React from 'react';
import Keyboard from '../containers/keyboard.jsx';
import WaveformButtons from '../containers/waveform_buttons.jsx';
import LPFKnob from '../containers/LPF_knob.jsx';
import ADSR from '../containers/ADSR.jsx'
import Oscilloscope from '../containers/oscilloscope.jsx';
import keys from './keys';



const App = () => {
  return (
    
    <div className="app">
      <div className='title'>
        <h1>🎶 Amazing Synthetiser 🎶</h1>
      </div>
      <div className="controls">
        <WaveformButtons/>
        <LPFKnob/>
        <ADSR/>
      </div>
      <div className="keyboard-container">
        <Keyboard keys={keys}/>
        <Oscilloscope/>
      </div>
      
      
    
    </div>
  );
};

export default App;
