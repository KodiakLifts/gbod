import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateActiveWorkoutData } from '../../redux/actions/setButtonActions';

const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const activeButton = CONTAINERSTYLE.activeSetButton;
const inactiveButton = CONTAINERSTYLE.inactiveSetButton;
const activeText = TEXTSTYLE.activeSetButtonText;
const inactiveText = TEXTSTYLE.inactiveSetButtonText;

class SetButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      buttonColor: inactiveButton,
      textColor: inactiveText,
    };
  }

  onPress = () => {
    this.props.updateActiveWorkoutData(this.props.setId, this.props.exerciseIndex);
    if (this.state.active) {
      this.setState({
        active: false, buttonColor: inactiveButton, textColor: inactiveText
      });
    } else {
      this.setState({
        active: true, buttonColor: activeButton, textColor: activeText
      });
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={this.state.buttonColor}>
          <Text style={this.state.textColor}>
            {this.props.weight + "x" + this.props.reps + checkSetType(this.props.type)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const checkSetType = (set) => {
  switch (set.type) {
    case "N": return "";
    case "D": return "-";
    case "F": return "+";
  }
  return "";
};

SetButton.propTypes = {
  exerciseIndex: PropTypes.number,
  setId: PropTypes.number,
  reps: PropTypes.number,
  weight: PropTypes.number,
  type: PropTypes.string,
  content: PropTypes.string,
  updateActiveWorkoutData: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateActiveWorkoutData: (setId, exerciseIndex) => {
      dispatch(updateActiveWorkoutData(setId, exerciseIndex));
    }
  };
};

export default connect(null, mapDispatchToProps)(SetButton);