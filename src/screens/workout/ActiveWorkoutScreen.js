import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveWorkoutCards, getActiveWorkoutTitle } from '../../redux/selectors/activeWorkoutSelectors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FinishButton from '../../components/buttons/FinishButton';
import ResetButton from '../../components/buttons/ResetButton';

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
};

const mapStateToProps = (state) => {
  return {
    title: getActiveWorkoutTitle(state.workoutData),
    cards: getActiveWorkoutCards(state.workoutData),
  };
};

export default connect(mapStateToProps)(ActiveWorkout);