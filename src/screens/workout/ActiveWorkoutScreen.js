import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveWorkoutCards, getActiveWorkoutTitle } from '../../redux/selectors/activeWorkoutSelectors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { finishWorkout } from '../../redux/actions/finishButtonActions';
import FinishButton from '../../components/buttons/FinishButton';
import ResetButton from '../../components/buttons/ResetButton';
import { resetWorkout } from '../../redux/actions/resetButtonActions';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const activeButton = CONTAINERSTYLE.activeSetButton;
const inactiveButton = CONTAINERSTYLE.inactiveSetButton;
const activeText = TEXTSTYLE.activeSetButtonText;
const inactiveText = TEXTSTYLE.inactiveSetButtonText;

const ActiveWorkout = ({ title, cards, finish }) => {
  return (
    <ScreenTemplate
      headerContent={
        <View style={CONTAINERSTYLE.headerContent}>
          <Text style={TEXTSTYLE.headerText}>
            {title}
          </Text>
          <TouchableOpacity>
            <Icon name={'cog'} size={25} color={COLORS.SECONDARYCOLOR} />
          </TouchableOpacity>
        </View>
      }
      scrollContent={cards}
      endOfScrollContent={
        <View style={{
          flexDirection: 'row',
          paddingVertical: 15
        }}>
          <ResetButton />
          <FinishButton />
        </View>
      } />
  );
};

ActiveWorkout.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  finish: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    title: getActiveWorkoutTitle(state.workoutData),
    cards: getActiveWorkoutCards(state.workoutData),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    finish: () => {
      dispatch(finishWorkout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);