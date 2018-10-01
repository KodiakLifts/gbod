import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decrementTimer, stopTimer } from '../../redux/actions/activeWorkoutActions';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const INTERVAL = 1000;

class SetTimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      started: false,
    };
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  toggleTimer() {
    if (!this.state.started) {
      this.setState({ started: true });
      this.timer = setInterval(() => {
        if (this.props.minutes === 0) {
          this.setState({ started: false });
          clearInterval(this.timer);
        }
        decrementTimer;
        console.log(this.props.seconds);
      }, INTERVAL);
    } else {
      this.setState({ started: false });
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.toggleTimer}>
        <View style={{ flexDirection: 'row', borderColor: COLORS.SECONDARYCOLOR, }}>
          <Text style={{
            fontSize: 24, color: COLORS.SECONDARYCOLOR, textAlignVertical: 'center', includeFontPadding: false
          }}>
            {moment().minute(this.props.minutes).second(this.props.seconds).format('mm:ss')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}





SetTimer.propTypes = {
  started: PropTypes.bool,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  setComplete: PropTypes.bool,
  decrementTimer: PropTypes.func,
  stopTimer: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    started: state.workoutData.timer.started,
    setComplete: state.workoutData.timer.setComplete,
    minutes: state.workoutData.timer.minutes,
    seconds: state.workoutData.timer.seconds
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    decrementTimer: () => {
      dispatch(decrementTimer());
    },
    stopTimer: () => {
      dispatch(stopTimer());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SetTimer);

