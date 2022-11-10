import React, {Component, setState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCutoff} from '../actions';

class LPFKnob extends Component {
  constructor(props) {
    super(props);
    this.toggleIsTurnable = this.toggleIsTurnable.bind(this);
    this.rotateButton = this.rotateButton.bind(this);
    this.state = {
      isTurnTable: false
    };
  }

  componentDidMount() {
    const button = document.querySelector(".knob-button");

    button.addEventListener("mousedown", this.toggleIsTurnable);
    button.addEventListener("mouseup", this.toggleIsTurnable);
    button.addEventListener("dragend", this.toggleIsTurnable);
    button.addEventListener("mousemove", e => this.rotateButton(e));
    button.addEventListener("dragover", e => this.rotateButton(e));
  }

  rotateButton(e) {
    const button = document.querySelector(".knob-button");

    const buttonBox = button.getBoundingClientRect();
    const centerX = buttonBox.left + buttonBox.width/2 - window.pageXOffset;
    const centerY = buttonBox.top + buttonBox.height/2 - window.pageYOffset;

    let value = 0;
    if (this.state.isTurnTable) {
      const radians = Math.atan2(e.clientX - centerX, e.clientY - centerY);
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

  toggleIsTurnable() {
    this.setState(state => (
      {
        isTurnTable: !state.isTurnTable
      }
    ));
  }

  normalize (val, max, min, newMax) { return ((val - min) / (max - min) * newMax); }

  render() {
    return(
      <div class='knob-button'>
        <div class="knob-circle"></div>
        <div class="knob-stroke-container"><div class='knob-stroke'></div></div>
        <div class="knob-stroke-container rotate-120"><div class='knob-stroke small'></div></div>
        <div class="knob-stroke-container rotate-150"><div class='knob-stroke small'></div></div>
        <div class="knob-stroke-container rotate-210"><div class='knob-stroke small'></div></div>
        <div class="knob-stroke-container rotate-240"><div class='knob-stroke small'></div></div>
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
    utoff: state.cutoff
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LPFKnob);

