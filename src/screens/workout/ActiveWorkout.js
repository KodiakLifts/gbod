import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import WorkoutCard from '../../components/cards/WorkoutCard';
import { connect } from 'react-redux';
import { getActiveWorkoutCards } from '../../redux/selectors/getActiveWorkoutCards';

const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');


const ActiveWorkout = (props) => {
  return (
    <ScreenTemplate
      headerContent={
        <View style={CONTAINERSTYLE.headerContent}>
          <Text style={TEXTSTYLE.headerText}>
            {props.title}
          </Text>
        </View>
      }
      scrollContent={props.cards} />
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