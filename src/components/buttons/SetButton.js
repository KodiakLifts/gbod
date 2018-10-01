import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateActiveWorkoutUI, startTimer, stopTimer } from '../../redux/actions/activeWorkoutActions';
import EditSetModal from '../modals/EditSetModal';
import { toggleTimer } from '../timers/toggleTimer';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const activeButton = CONTAINERSTYLE.activeSetButton;
const inactiveButton = CONTAINERSTYLE.inactiveSetButton;
const activeText = TEXTSTYLE.activeSetButtonText;
const inactiveText = TEXTSTYLE.inactiveSetButtonText;

const INTERVAL = 1000;

class SetButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editSetModalVisible: false,
    };

    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.checkSetType = this.checkSetType.bind(this);

  }

  _onPress() {
    this.props.updateActiveWorkoutUI(this.props.setId, this.props.exerciseId);

    let special = false;
    if (!this.props.complete && this.props.started) {
      special = true;
    }
    toggleTimer(
      this.props.started,
      this.props.minutes,
      this.props.seconds,
      this.props.stopTimer,
      this.props.startTimer,
      !this.props.complete,
      special
    );
  }

  _onLongPress() {
    this.setState({ editSetModalVisible: true });
  }

  closeModal() {
    this.setState({ editSetModalVisible: false });
  }

  checkSetType(type) {
    switch (type) {
      case "N": return "";
      case "D": return "-";
      case "F": return "+";
    }
    return "";
  }

  render() {
    return (
      <View>
        <EditSetModal
          visible={this.state.editSetModalVisible}
          setId={this.props.setId}
          exerciseId={this.props.exerciseId}
          weight={this.props.weight}
          reps={this.props.reps}
          type={this.props.type}
          closeModal={this.closeModal} />
        <TouchableOpacity onPress={this._onPress} onLongPress={this._onLongPress}>
          <View style={this.props.complete ? activeButton : inactiveButton}>
            <Text style={this.props.complete ? activeText : inactiveText}>
              {this.props.weight + "x" + this.props.reps + this.checkSetType(this.props.type)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

SetButton.propTypes = {
  exerciseId: PropTypes.number,
  setId: PropTypes.number,
  reps: PropTypes.number,
  weight: PropTypes.number,
  type: PropTypes.string,
  buttonPress: PropTypes.func,
  updateActiveWorkoutUI: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,

  complete: PropTypes.bool,
  started: PropTypes.bool,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
  return {
    complete:
      state
        .workoutData
        .programs[state.workoutData.activeWorkout.program]
        .sets[ownProps.setId].complete,
    started: state.workoutData.timer.started,
    minutes: state.workoutData.timer.minutes,
    seconds: state.workoutData.timer.seconds
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateActiveWorkoutUI: (setId, exerciseId) => {
      dispatch(updateActiveWorkoutUI(setId, exerciseId));
    },
    startTimer: () => {
      dispatch(startTimer());
    },
    stopTimer: () => {
      dispatch(stopTimer());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetButton);