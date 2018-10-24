import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { finishWorkout } from "../../redux/actions/activeWorkoutActions";
import { finishLogEdit } from "../../redux/actions/logsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

const STYLE = require("./buttonStyle");

class FinishButton extends Component {
  finishCase = () => {
    const { finish, finishLogEdit, logEdit, navigation, newTitle } = this.props;
    if (logEdit) {
      navigation.navigate("LOGS");
      return finishLogEdit(newTitle);
    } else {
      return finish();
    }
  };

  _onPress = () => {
    Alert.alert(
      "Finish Workout",
      "Finish and log workout?",
      [
        {
          text: "CONFIRM",
          onPress: this.finishCase
        },
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
  finish: PropTypes.func,
  finishLogEdit: PropTypes.func,
  logEdit: PropTypes.bool,
  navigation: PropTypes.object,
  newTitle: PropTypes.string
};

const mapDispatchToProps = dispatch => {
  return {
    finish: () => {
      dispatch(finishWorkout());
    },
    finishLogEdit: newTitle => {
      dispatch(finishLogEdit(newTitle));
    }
  };
};

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(FinishButton)
);
