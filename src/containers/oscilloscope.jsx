import React, {Component} from 'react';
import Canvas from '../Canvas'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCanvas } from '../actions/index';


class Oscilloscope extends Component {
    
    render() {
            return(
                <div className="canvas-container">
                    <canvas id="canvas" className='canvas' width="300" height="300">
                    Désolé, votre navigateur ne prend pas en charge &lt;canvas&gt;.
                    </canvas>
                </div>
            )
    }

    componentWillMount() {
        const canvas = new Canvas()
        this.props.setCanvas(canvas);
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {setCanvas},
        dispatch
    )
}

function mapStateToProps(state) { 
    return {
        canvas: state.canvas
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Oscilloscope);