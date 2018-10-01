import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const INTERVAL = 1000;

class SetTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      now: moment().minute(props.minutes).second(props.seconds).format('mm:ss'),
      minutes: props.minutes,
      seconds: props.seconds,
      setComplete: props.setComplete
    };

    this.toggleTimer = this.toggleTimer.bind(this);
  }

  componentDidMount() {
    this.setState({
      started: false,
      now: moment().minute(this.props.minutes).second(this.props.seconds).format('mm:ss'),
      minutes: this.props.minutes,
      seconds: this.props.seconds,
      setComplete: this.props.setComplete
    });
    if (this.props.setComplete) {
      this.toggleTimer();
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.minutes !== this.state.minutes || nextProps.seconds !== this.state.seconds) {
      this.setState({
        now: moment().minute(nextProps.minutes).second(nextProps.seconds).format('mm:ss'),
        minutes: nextProps.minutes,
        seconds: nextProps.seconds,
        setComplete: nextProps.setComplete
      });
    }
  }

  toggleTimer() {
    if (!this.state.started) {
      this.setState({
        started: true,
      });
      this.timer = setInterval(() => {
        if (this.state.minutes === 0) {
          clearInterval(this.timer);
        }
        this.setState({
          seconds: this.state.seconds - 1,
          now: moment().minute(this.state.minutes).second(this.state.seconds).format('mm:ss')
        });
      }, INTERVAL);
    } else {
      clearInterval(this.timer);
      this.setState({
        started: false
      });
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.toggleTimer}>
        <View style={{ flexDirection: 'row', borderColor: COLORS.SECONDARYCOLOR, }}>
          <Text style={{
            fontSize: 24, color: COLORS.SECONDARYCOLOR, textAlignVertical: 'center', includeFontPadding: false
          }}>
            {this.state.now}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SetTimer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  setComplete: PropTypes.bool
};




export default SetTimer;

