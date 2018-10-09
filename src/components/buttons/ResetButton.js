import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { resetWorkout } from "../../redux/actions/activeWorkoutActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const STYLE = require("./buttonStyle");

const FinishButton = ({ reset }) => {
  return (
    <TouchableOpacity onPress={reset}>
      <View style={STYLE.inactiveButton}>
        <Text style={STYLE.inactiveText}>RESET</Text>
      </View>
    </TouchableOpacity>
  );
};

FinishButton.propTypes = {
  reset: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    reset: () => {
      dispatch(resetWorkout());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FinishButton);
