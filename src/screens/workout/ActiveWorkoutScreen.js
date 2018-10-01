import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveWorkoutCards, getActiveWorkoutTitle } from '../../redux/selectors/activeWorkoutSelectors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FinishButton from '../../components/buttons/FinishButton';
import ResetButton from '../../components/buttons/ResetButton';
import SetTimer from '../../components/timers/SetTimer';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const ActiveWorkout = ({ title, cards }) => {
  return (
    <ScreenTemplate
      headerContent={
        <View style={CONTAINERSTYLE.headerContent}>
          <Text style={TEXTSTYLE.headerText}>
            {title}
          </Text>
          <View style={{ width: 115, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <SetTimer />
            <TouchableOpacity>
              <Icon name={'cog'} size={25} color={COLORS.SECONDARYCOLOR} />
            </TouchableOpacity>
          </View>
        </View>
      }
      scrollContent={cards}
      endOfScrollContent={
        <View style={{
          flexDirection: 'row',
        }}>
          <ResetButton />
          <FinishButton />
          <View style={{ backgroundColor: COLORS.SECONDARYCOLOR, height: 500 }} />
        </View>
      } />
  );
};

ActiveWorkout.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  setComplete: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    title: getActiveWorkoutTitle(state.workoutData),
    cards: getActiveWorkoutCards(state.workoutData),
  };
};

export default connect(mapStateToProps)(ActiveWorkout);