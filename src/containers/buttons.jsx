import React, {Component} from 'react';
import Button from './button.jsx';

class Buttons extends Component {
    
    render() {
        return(
        <div className='buttons'>
            <Button name="sine"/>
            <Button name="square"/>
            <Button name="triangle"/>
            <Button name="sawtooth"/>
        </div>
        )
    }
}

export default Buttons;