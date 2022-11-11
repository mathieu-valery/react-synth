import React, {Component, setState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCutoff} from '../actions';

class LPFKnob extends Component {
  constructor(props) {
    super(props);
    this.toggleIsTurnable = this.toggleIsTurnable.bind(this);
    this.rotateButton = this.rotateButton.bind(this);
    this.setClickedParent = this.setClickedParent.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.state = {
      isTurnTable: false,
      clickedParent: {}
    };
  }

  componentDidMount() {
    const button = document.querySelector(".knob-button");

    button.addEventListener("mousedown", this.toggleIsTurnable);
    window.addEventListener("mousedown", this.setClickedParent);

    window.addEventListener("mouseup", e => this.handleMouseUp(e));
    window.addEventListener("dragend", e => this.handleMouseUp(e));

    button.addEventListener("mousemove", e => this.rotateButton(e));
    button.addEventListener("dragover", e => this.rotateButton(e));

    button.addEventListener("touchstart", this.toggleIsTurnable);
    button.addEventListener("touchmove", e => this.rotateButton(e));
    button.addEventListener("touchend", this.toggleIsTurnable);
  }

  setClickedParent(e) {
    this.setState({clickedParent: e.target.parentElement})
    console.log(e.target.parentElement)
  }

  handleMouseUp() {
    // not ideal, queryselector fired at every mouseup, need to find alternative
    const knobCircle = document.querySelector('.knob-circle');
    const knobStrokeContainer = document.querySelector('.knob-stroke-container');
    if (this.state.clickedParent === knobCircle || this.state.clickedParent === knobStrokeContainer) {
      this.toggleIsTurnable();
    }
  }

  toggleIsTurnable() {
    console.log('toggle')
    this.setState(state => (
      {
        isTurnTable: !state.isTurnTable
      }
    ));
  }

  rotateButton(e) {
    e.preventDefault();
    const button = document.querySelector(".knob-button");
    const buttonBox = button.getBoundingClientRect();
    const centerX = buttonBox.left + buttonBox.width/2 - window.pageXOffset;
    const centerY = buttonBox.top + buttonBox.height/2 - window.pageYOffset;
    const touchLocation = e.targetTouches ? e.targetTouches[0] : null;
    const clientX = e.clientX || touchLocation.clientX;
    const clientY = e.clientY || touchLocation.clientY;

    let value = 0;
    if (this.state.isTurnTable) {
      const radians = Math.atan2(clientX - centerX, clientY - centerY);
      let degree = (radians * (180 / Math.PI) * -1) + 180;
      if (degree >= 135 && degree <= 180) {
        degree = 135;
      } else if (degree <= 225 && degree >= 180) {
        degree = 225;
      }
      if (degree >= 225 && degree <= 360) {
        value = degree - 225;
      } else if (degree >= 0 && degree <= 180) {
        value = degree + 135;
      }

      button.style.transform = "rotate("+degree+"deg)";
      this.props.setCutoff(this.normalize(value, 270, 0, 1600));
    }
  }

  normalize (val, max, min, newMax) { return Math.floor(((val - min) / (max - min) * newMax)); }

  render() {
    return(
      <div className="knob-container">
        <div className="knob-button">
          <div className="knob-circle">

            <div className="knob-stroke-container"><div className="knob-stroke"/></div>
            <div className="knob-stroke-container knob-rotate-120"><div className="knob-stroke knob-small"/></div>
            <div className="knob-stroke-container knob-rotate-150"><div className="knob-stroke knob-small"/></div>
            <div className="knob-stroke-container knob-rotate-210"><div className="knob-stroke knob-small"/></div>
            <div className="knob-stroke-container knob-rotate-240"><div className="knob-stroke knob-small"/></div>

          </div>
        </div>
        <p className="knob-label"><strong>Cutoff: </strong>{this.props.cutoff} Hz</p>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(LPFKnob);

