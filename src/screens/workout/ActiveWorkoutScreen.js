import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveWorkoutCards, getActiveWorkoutTitle } from '../../redux/selectors/activeWorkoutSelectors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const activeButton = CONTAINERSTYLE.activeSetButton;
const inactiveButton = CONTAINERSTYLE.inactiveSetButton;
const activeText = TEXTSTYLE.activeSetButtonText;
const inactiveText = TEXTSTYLE.inactiveSetButtonText;

const ActiveWorkout = ({ name, day, cards }) => {
  return (
    <ScreenTemplate
      headerContent={
        <View style={CONTAINERSTYLE.headerContent}>
          <Text style={TEXTSTYLE.headerText}>
            {name + " - " + day}
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
          <TouchableOpacity>
            <View style={inactiveButton}>
              <Text style={inactiveText}>RESET</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={activeButton}>
              <Text style={activeText}>FINISH</Text>
            </View>
          </TouchableOpacity>
        </View>
      } />
  );
};

ActiveWorkout.propTypes = {
  name: PropTypes.string,
  day: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  return {
    title: getActiveWorkoutTitle(state.workoutData),
    cards: getActiveWorkoutCards(state.workoutData),
  };
};

export default connect(mapStateToProps)(ActiveWorkout);