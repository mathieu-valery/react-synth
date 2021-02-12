import React, {Component} from 'react';
import { connect } from 'react-redux';
import Key from './key.jsx';
import Sound from '../sound.js';

class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: {}
        }
    }
   
    componentWillMount() {
        let context = new (window.AudioContext || window.webkitAudioContext)();
        this.setState({
            context: context
        })
    }

    render() {
        return(
            <div className='keyboard'>
                {this.props.keys.map(({ note, color, frequency, key }) => <Key  note={note} color={color} frequency={frequency} key={key} context={this.state.context} keypad={key}/>)}
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener('keypress', event => {
            if (event.repeat) { return }
            let pressedKey = event.key
            this.props.keys.forEach(key => {
                if (pressedKey == key.key) {
                    let note = new Sound(this.state.context, this.props.canvas);
                    let frequency = key.frequency;
                    let waveform = this.props.waveform;
                    let cutoff = this.props.cutoff;
                    let envelope = this.props.envelope;
                    note.play(frequency, waveform, cutoff, envelope);
                    
                    let playedNote = document.getElementById(key.note);
                    playedNote.classList.add('active')
                    document.addEventListener('keyup', event => {
                        note.stop();
                        playedNote.classList.remove('active')
                    })
                }
            });
        });
 
    }
}

function mapStateToProps(state) { 
    return {
        waveform: state.waveform,
        cutoff: state.cutoff,
        canvas: state.canvas,
        envelope: state.envelope 
        };
    };


export default connect(mapStateToProps)(Keyboard);