import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import WorkoutCard from '../../components/cards/WorkoutCard';
import { connect } from 'react-redux';

const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const ActiveWorkout = (props) => {
  const exercises = props.activeWorkout.exercises;
  return (
    <ScreenTemplate
      headerContent={
        <View style={CONTAINERSTYLE.headerContent}>
          <Text style={TEXTSTYLE.headerText}>
            {props.activeWorkout.title}
          </Text>
        </View>
      }
      scrollContent={
        <WorkoutCard
          exerciseNum={0}
          name={exercises[0].name}
          sets={exercises[0].sets} />
      }
    />
  );
};

ActiveWorkout.propTypes = {
  activeWorkout: PropTypes.shape({
    id: PropTypes.string,
    day: PropTypes.string,
    title: PropTypes.string,
    exercises: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      supersetNext: PropTypes.bool,
      restTime: PropTypes.string,
      sets: PropTypes.arrayOf(PropTypes.shape({
        weight: PropTypes.number,
        reps: PropTypes.number,
        type: PropTypes.string
      }))
    }))
  })
};

const mapStateToProps = (state) => {
  return {
    activeWorkout: state.activeWorkout,
  };
};

export default connect(mapStateToProps)(ActiveWorkout);