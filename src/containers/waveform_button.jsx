import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setWaveform } from '../actions';

class WaveformButton extends Component {
    handleClick = () => {
        this.props.setWaveform(this.props.name);
        let buttons = document.querySelectorAll(".button");
        buttons.forEach(DOMElement => (DOMElement.classList.remove("active")));
        let buttonClicked = document.getElementById(this.props.name);
        buttonClicked.classList.add("active");
}
    
    render() {
        return(
        <div className="button" id={this.props.name} onClick={this.handleClick}>{this.props.name}</div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { setWaveform: setWaveform },
        dispatch 
    );
}

function mapStateToProps(state) { 
    return {
        waveform: state.waveform 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveformButton);

