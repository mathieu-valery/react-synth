import React, {Component} from 'react';
import Key from './key.jsx';

class Keyboard extends Component {
    
    render() {
        return(
        <div className='keyboard'>
            {this.props.keys.map(({ note, color, frequency }) => <Key note={note} color={color} frequency={frequency} key={note} />)}
        </div>
        )
    }
}

export default Keyboard;