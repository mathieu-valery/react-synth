import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setWaveform } from '../actions';

class Button extends Component {
    handleClick = () => {
     this.props.setWaveform(this.props.name);
    }
    
    render() {
        return(
        <div className="button" onClick={this.handleClick}>{this.props.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Button);

