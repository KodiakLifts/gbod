import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateActiveWorkoutUI } from '../../redux/actions/activeWorkoutActions';
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
      modalVisible: false,
    };

    this._onPress = () =>
      props.updateActiveWorkoutUI(props.setId, props.exerciseId);
    this._onLongPress = () =>
      this.setState({ modalVisible: true });
    this.closeModal = () =>
      this.setState({ modalVisible: false });

    this.checkSetType = this.checkSetType.bind(this);
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
          visible={this.state.modalVisible}
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
  updateActiveWorkoutUI: PropTypes.func,
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateActiveWorkoutUI: (setId, exerciseId) => {
      dispatch(updateActiveWorkoutUI(setId, exerciseId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetButton);