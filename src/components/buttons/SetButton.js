import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setPress,
  updateWorkoutAndTimer
} from '../../redux/actions/activeWorkoutActions';
import EditSetModal from '../modals/EditSetModal';
import SetRepsModal from '../modals/SetRepsModal';

const STYLE = require('./buttonStyle');
const AMRAP = 2;

class SetButton extends Component {
  state = {
    editSetModalVisible: false,
    setRepsModalVisible: false
  }

  _onPress = () => {
    const {
      updateWorkoutAndTimer,
      setId,
      exerciseId,
      type,
      complete
    } = this.props;

    updateWorkoutAndTimer(setId, exerciseId);

    if (type === AMRAP && complete !== true) {
      this.setState({ setRepsModalVisible: true });
    }
  }

  _onLongPress = () => {
    this.setState({ editSetModalVisible: true });
  }

  closeModal = () => {
    this.setState({
      editSetModalVisible: false,
      setRepsModalVisible: false
    });
  }

  render() {
    const {
      setId,
      exerciseId,
      weight,
      reps,
      type,
      min,
      sec,
      complete
    } = this.props;

    const { editSetModalVisible, setRepsModalVisible } = this.state;

    return (
      <View>
        <EditSetModal
          visible={editSetModalVisible}
          setId={setId}
          exerciseId={exerciseId}
          weight={weight}
          reps={reps}
          type={type}
          min={min}
          sec={sec}
          closeModal={this.closeModal} />

        <SetRepsModal
          visible={setRepsModalVisible}
          setId={setId}
          reps={reps}
          closeModal={this.closeModal} />

        <TouchableOpacity
          onPress={this._onPress}
          onLongPress={this._onLongPress}
          delayLongPress={20}
        >
          <View style={
            complete ? STYLE.activeButton : STYLE.inactiveButton
          }>
            <Text style={
              complete ? STYLE.activeText : STYLE.inactiveText
            }>
              {weight + "x" + reps + checkSetType(type)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const checkSetType = (type) => {
  switch (type) {
    case 0: return "w";
    case 1: return "";
    case 2: return "+";
    case 3: return "-";
  }
  return "";
};

SetButton.propTypes = {
  exerciseId: PropTypes.number,
  setId: PropTypes.number,
  reps: PropTypes.number,
  weight: PropTypes.number,
  type: PropTypes.number,
  min: PropTypes.number,
  sec: PropTypes.number,
  timerOn: PropTypes.bool,
  updateActiveWorkoutUI: PropTypes.func,
  updateWorkoutAndTimer: PropTypes.func,

  complete: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  return {
    complete:
      state
        .workoutData
        .programs[state.workoutData.activeWorkout.program]
        .sets[ownProps.setId].complete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateActiveWorkoutUI: (setId, exerciseId) => {
      dispatch(setPress(setId, exerciseId));
    },
    updateWorkoutAndTimer: (setId, exerciseId, started, complete) => {
      dispatch(updateWorkoutAndTimer(setId, exerciseId, started, complete));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetButton);