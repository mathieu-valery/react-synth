import React from 'react';
import Keyboard from '../containers/keyboard.jsx';
import WaveformButtons from '../containers/waveform_buttons.jsx';
import LowPassFilter from '../containers/low_pass_filter.jsx';
import ADSR from '../containers/ADSR.jsx'
import Canva from '../containers/canva.jsx';
import keys from './keys';



const App = () => {
  return (
    
    <div className="app">
      <div className='title'>
        <h1>🎶 Amazing Synthetiser 🎶</h1>
      </div>
      <div className="controls">
        <WaveformButtons/>
        <LowPassFilter/>
        <ADSR/>
      </div>
      <div className="keyboard-container">
        <Keyboard keys={keys} />
        <Canva/>
      </div>
      
      
    
    </div>
  );
};

export default App;
