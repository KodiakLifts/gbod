import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
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
      started: false,
    };
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {

  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
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
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  handleTimer: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    minutes: state.workoutData.timer.minutes,
    seconds: state.workoutData.timer.seconds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SetTimer);

