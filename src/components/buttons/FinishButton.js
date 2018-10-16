import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { finishWorkout } from "../../redux/actions/activeWorkoutActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const STYLE = require("./buttonStyle");

class FinishButton extends Component {
  _onPress = () => {
    Alert.alert(
      "Finish Workout",
      "Finish and log workout?",
      [
        { text: "CONFIRM", onPress: () => this.props.finish() },
        { text: "CANCEL", style: "cancel" }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <Text style={STYLE.finishText}>FINISH</Text>
      </TouchableOpacity>
    );
  }
}

FinishButton.propTypes = {
  finish: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    finish: () => {
      dispatch(finishWorkout());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FinishButton);
