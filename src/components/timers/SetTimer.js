import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleTimer } from '../../redux/actions/activeWorkoutActions';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class SetTimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      complete: true
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.minutes === 0 && newProps.seconds === 0) {
      this.setState({ complete: true });
    } else {
      this.setState({ complete: false });
    }
  }

  _onPress = () => {
    this.props.handleTimer(!this.props.started);
  }

  timerColor = () => {
    return this.state.complete ? COLORS.INACTIVECOLOR : COLORS.ACTIVECOLOR;
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} disabled={this.state.complete}>
        <View style={{ flexDirection: 'row', borderColor: COLORS.SECONDARYCOLOR, }}>
          <Text style={{
            fontSize: 24, color: this.timerColor(), textAlignVertical: 'center', includeFontPadding: false
          }}>
            {String(this.props.minutes).padStart(2, '0') + ":" + String(this.props.seconds).padStart(2, '0')}
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

const mapStateToProps = (state) => {
  return {
    minutes: state.workoutData.timer.minutes,
    seconds: state.workoutData.timer.seconds,
    started: state.workoutData.timer.started
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleTimer: (setComplete) => {
      dispatch(handleTimer(setComplete));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SetTimer);

