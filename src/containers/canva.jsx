import React, {Component} from 'react';
import Canvas from '../Canvas'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCanvas } from '../actions/index';


class Canva extends Component {
    
    render() {
        return(
            <canvas id="canvas" width="300" height="300">
            Désolé, votre navigateur ne prend pas en charge &lt;canvas&gt;.
            </canvas>
        )
    }

    componentDidMount() {
        const canvas = new Canvas()
        this.props.setCanvas(canvas);

        // this.canvas = document.getElementById('canvas');

        // this.WIDTH = this.canvas.width;
        // this.HEIGHT = this.canvas.height;
        // this.contexteCanvas = canvas.getContext('2d');

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

export default connect(mapStateToProps, mapDispatchToProps)(Canva);