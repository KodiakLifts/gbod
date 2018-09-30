import React, { Component } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateActiveWorkoutData } from '../../redux/actions/setButtonActions';
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

    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this._checkSetType = this.checkSetType.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  _onPress() {
    this.props.updateActiveWorkoutData(this.props.setId, this.props.exerciseId);
  }

  _onLongPress() {
    this.setState({ modalVisible: true });
  }

  checkSetType(type) {
    switch (type) {
      case "N": return "";
      case "D": return "-";
      case "F": return "+";
    }
    return "";
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
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