import React from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveWorkoutCards } from '../../redux/selectors/activeWorkoutSelectors';

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
        </View>
      }
      scrollContent={cards} />
  );
};

ActiveWorkout.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object)
};


const mapStateToProps = (state) => {
  return {
    title: state.activeWorkout.title,
    cards: getActiveWorkoutCards(state)
  };
};


export default connect(mapStateToProps)(ActiveWorkout);