import React, {Component} from 'react';
import Key from './key.jsx';
import Sound from '../sound.js';

class Keyboard extends Component {
    
    render() {
        var context = new (window.AudioContext || window.webkitAudioContext)();
        
        return(
        <div className='keyboard'>
            {this.props.keys.map(({ note, color, frequency }) => <Key context={context} note={note} color={color} frequency={frequency} key={note} />)}
        </div>
        )
    }
}

export default Keyboard;