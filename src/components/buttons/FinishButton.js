import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { finishWorkout } from '../../redux/actions/activeWorkoutActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const style = require('./style');

const FinishButton = ({ finish }) => {
  return (
    <TouchableOpacity onPress={finish}>
      <View style={style.activeButton}>
        <Text style={style.activeText}>FINISH</Text>
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

export default connect(null, mapDispatchToProps)(FinishButton);