import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleTimer } from "../../redux/actions/activeWorkoutActions";

const COLORS = require("../../styles/Colors");
const STYLE = require("./timerStyle");

class SetTimer extends Component {
  state = {
    complete: true
  };

  componentWillReceiveProps(newProps) {
    if (newProps.minutes === 0 && newProps.seconds === 0) {
      this.setState({ complete: true });
    } else {
      this.setState({ complete: false });
    }
  }

  _onPress = () => {
    const { handleTimer, started } = this.props;
    handleTimer(!started);
  };

  timerColor = () => {
    return this.state.complete ? COLORS.INACTIVECOLOR : COLORS.ACTIVECOLOR;
  };

  render() {
    const { minutes, seconds } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress} disabled={this.state.complete}>
        <View style={STYLE.timerContainer}>
          <Text style={[STYLE.timerText, { color: this.timerColor() }]}>
            {String(minutes).padStart(2, "0") +
              ":" +
              String(seconds).padStart(2, "0")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SetTimer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  handleTimer: PropTypes.func,
  started: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    minutes: state.workoutData.timer.minutes,
    seconds: state.workoutData.timer.seconds,
    started: state.workoutData.timer.started
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleTimer: setComplete => {
      dispatch(handleTimer(setComplete));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetTimer);
