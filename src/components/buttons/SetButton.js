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

    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    this.props.updateActiveWorkoutData(this.props.setId, this.props.exerciseId);
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={this.props.complete ? activeButton : inactiveButton}>
          <Text style={this.props.complete ? activeText : inactiveText}>
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
  exerciseId: PropTypes.number,
  setId: PropTypes.number,
  reps: PropTypes.number,
  weight: PropTypes.number,
  type: PropTypes.string,
  updateActiveWorkoutData: PropTypes.func,
  complete: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    complete:
      state
        .workoutData
        .programs[state.workoutData.activeWorkout.program]
        .sets[ownProps.setId].complete
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateActiveWorkoutData: (setId, exerciseId) => {
      dispatch(updateActiveWorkoutData(setId, exerciseId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetButton);