import React from 'react';
import Keyboard from '../containers/keyboard.jsx';
import Buttons from '../containers/buttons.jsx';
import LowPassFilter from '../containers/low_pass_filter.jsx'
import keys from './keys';


const App = () => {
  return (
    
    <div className="app">
      <Keyboard keys={keys} />
      <LowPassFilter/>
      <Buttons/>
    </div>
  );
};

export default App;
