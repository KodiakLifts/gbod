import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { resetWorkout } from '../../redux/actions/resetButtonActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const inactiveButton = CONTAINERSTYLE.inactiveSetButton;
const inactiveText = TEXTSTYLE.inactiveSetButtonText;

const FinishButton = ({ reset }) => {
  return (
    <TouchableOpacity onPress={reset}>
      <View style={inactiveButton}>
        <Text style={inactiveText}>RESET</Text>
      </View>
    </TouchableOpacity>
  );
};

FinishButton.propTypes = {
  reset: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => {
      dispatch(resetWorkout());
    }
  };
};

export default connect(null, mapDispatchToProps)(FinishButton)