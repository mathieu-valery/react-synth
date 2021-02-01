import React from 'react';
import Keyboard from '../containers/keyboard.jsx';
import WaveformButtons from '../containers/waveform_buttons.jsx';
import LowPassFilter from '../containers/low_pass_filter.jsx';
import Canva from '../containers/canva.jsx';
import keys from './keys';



const App = () => {
  return (
    
    <div className="app">
      <Keyboard keys={keys} />
      <Canva/>
      <LowPassFilter/>
      <WaveformButtons/>
    
    </div>
  );
};

export default App;
