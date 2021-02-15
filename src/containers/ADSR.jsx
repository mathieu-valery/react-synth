import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setEnvelope} from '../actions';

class ADSR extends Component {
    handleChange = () => {
        let attack = document.getElementById("attack").value;
        let decay = document.getElementById("decay").value;
        let sustain = document.getElementById("sustain").value;
        let release = document.getElementById("release").value;
        this.props.setEnvelope(attack, decay, sustain, release);
}

    
    render() {
        return(
            <div className="ADSR">
             
                <div className="envelope-range">
                    <input className="vertical pointer" type="range" id="attack" name="attack" min="0" max="2" step="0.02" value={this.props.envelope.attack} onChange={this.handleChange}></input>
                    <label htmlFor="attack">Attack</label>
                    <span>{this.props.envelope.attack} s</span>
                </div>

                <div className="envelope-range">
                    <input className="vertical pointer" type="range" id="decay" name="decay" min="0" max="1" step="0.01" value={this.props.envelope.decay} onChange={this.handleChange}></input>
                    <label htmlFor="decay">Decay</label>
                    <span>{this.props.envelope.decay} s</span>
                </div>

                <div className="envelope-range">
                    <input className="vertical pointer" type="range" id="sustain" name="sustain" min="0" max="1" step="0.01" value={this.props.envelope.sustain} onChange={this.handleChange}></input>
                    <label htmlFor="sustain">Sustain</label>
                    <span>{this.props.envelope.sustain}</span>
                </div>

                <div className="envelope-range">
                    <input className="vertical pointer" type="range" id="release" name="release" min="0.02" max="2" step="0.02" value={this.props.envelope.release} onChange={this.handleChange}></input>
                    <label htmlFor="release">Release</label>
                    <span>{this.props.envelope.release} s</span>
                </div>
               
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { setEnvelope: setEnvelope },
        dispatch 
    );
}

function mapStateToProps(state) { 
    return {
        cutoff: state.cutoff,
        envelope: state.envelope 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ADSR);