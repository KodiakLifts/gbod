import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateActiveWorkoutUI, updateWorkoutAndTimer } from '../../redux/actions/activeWorkoutActions';
import EditSetModal from '../modals/EditSetModal';

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
    };
    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.checkSetType = this.checkSetType.bind(this);
  }

  _onPress() {
    this.props.updateWorkoutAndTimer(this.props.setId, this.props.exerciseId);
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
      case "W": return "w";
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