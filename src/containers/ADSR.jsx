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
            <div className="filter ADSR">
                <label htmlFor="attack">Attack</label>
                <input type="range" id="attack" name="attack" min="0" max="2" step="0.02" onChange={this.handleChange}></input>

                <label htmlFor="decay">Decay</label>
                <input type="range" id="decay" name="decay" min="0" max="1" step="0.01" onChange={this.handleChange}></input>

                <label htmlFor="sustain">Sustain</label>
                <input type="range" id="sustain" name="sustain" min="0" max="1" step="0.01" onChange={this.handleChange}></input>

                <label htmlFor="release">Release</label>
                <input type="range" id="release" name="release" min="0" max="2" step="0.02" onChange={this.handleChange}></input>
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
        cutoff: state.cutoff 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ADSR);