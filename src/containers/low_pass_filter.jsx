import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCutoff} from '../actions';

class LowPassFilter extends Component {
    handleChange = () => {
        let cutoff = document.getElementById("filter").value;
        this.props.setCutoff(cutoff);
}
    
    render() {
        return(
            <div className="filter">
                <label htmlFor="filter">Low Pass Filter</label>
                <input type="range" className="pointer" id="filter" name="filter" min="0" max="1600" step="50" onChange={this.handleChange}></input>
                <span>Cutoff: {this.props.cutoff} Hz</span>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { setCutoff: setCutoff },
        dispatch 
    );
}

function mapStateToProps(state) { 
    return {
        cutoff: state.cutoff 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LowPassFilter);

