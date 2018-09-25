import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleSetComplete, updateExerciseComplete, updateCurrentExercise } from '../../redux/actions/setButtonActions';

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
    this.props.toggleSetComplete(this.props.setId);
    this.props.updateExerciseComplete(this.props.exerciseId);
    this.props.updateCurrentExercise(this.props.exerciseId);
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
            {this.props.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SetButton.propTypes = {
  exerciseId: PropTypes.number,
  setId: PropTypes.number,
  content: PropTypes.string,
  toggleSetComplete: PropTypes.func,
  updateExerciseComplete: PropTypes.func,
  updateCurrentExercise: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSetComplete: (setId) => {
      dispatch(toggleSetComplete(setId));
    },
    updateExerciseComplete: (exerciseId) => {
      dispatch(updateExerciseComplete(exerciseId));
    },
    updateCurrentExercise: (exerciseId) => {
      dispatch(updateCurrentExercise(exerciseId));
    }
  };
};

export default connect(null, mapDispatchToProps)(SetButton);