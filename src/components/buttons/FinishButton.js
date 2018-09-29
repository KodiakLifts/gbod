import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { finishWorkout } from '../../redux/actions/finishButtonActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const activeButton = CONTAINERSTYLE.activeSetButton;
const activeText = TEXTSTYLE.activeSetButtonText;

const FinishButton = ({ finish }) => {
  return (
    <TouchableOpacity onPress={finish}>
      <View style={activeButton}>
        <Text style={activeText}>FINISH</Text>
      </View>
    </TouchableOpacity>
  );
};

FinishButton.propTypes = {
  finish: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    finish: () => {
      dispatch(finishWorkout());
    }
  };
};

export default connect(null, mapDispatchToProps)(FinishButton)