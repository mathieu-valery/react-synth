import React from 'react';
import Keyboard from '../containers/keyboard.jsx'
import keys from './keys'

const App = () => {
  return (
    
    <div className="app">
      <Keyboard keys={keys} />
    </div>
  );
};

export default App;
