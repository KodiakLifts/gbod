import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateActiveWorkoutUI, updateWorkoutAndTimer } from '../../redux/actions/activeWorkoutActions';
import EditSetModal from '../modals/EditSetModal';
import SetRepsModal from '../modals/SetRepsModal';

const COLORS = require('../../styles/Colors');
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
      editSetModalVisible: false,
      setRepsModalVisible: false
    };
  }

  _onPress = () => {
    this.props.updateWorkoutAndTimer(this.props.setId, this.props.exerciseId);
    if (this.props.type === 2 && this.props.complete !== true) {
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

  checkSetType = (type) => {
    switch (type) {
      case 0: return "w";
      case 1: return "";
      case 2: return "+";
      case 3: return "-";
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
          min={this.props.min}
          sec={this.props.sec}
          closeModal={this.closeModal} />
        <SetRepsModal
          visible={this.state.setRepsModalVisible}
          setId={this.props.setId}
          reps={this.props.reps}
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
  type: PropTypes.number,
  min: PropTypes.number,
  sec: PropTypes.number,
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
      dispatch(updateActiveWorkoutUI(setId, exerciseId));
    },
    updateWorkoutAndTimer: (setId, exerciseId, started, complete) => {
      dispatch(updateWorkoutAndTimer(setId, exerciseId, started, complete));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetButton);