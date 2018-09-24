import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import WorkoutCard from '../../components/cards/WorkoutCard';
import { connect } from 'react-redux';

const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');


const ActiveWorkout = (props) => {
  const workoutCards = [];
  const exercises = props.activeWorkout.exercises;
  exercises.forEach((exercise, index) => {
    let sets = props.activeWorkout.sets.filter(set => {
      return set.exercise === index;
    });
    let card =
      <WorkoutCard
        key={"" + exercise.name + index}
        exerciseNum={index}
        name={exercise.name}
        sets={sets} />;
    workoutCards.push(card);
  });

  return (
    <ScreenTemplate
      headerContent={
        <View style={CONTAINERSTYLE.headerContent}>
          <Text style={TEXTSTYLE.headerText}>
            {props.activeWorkout.title}
          </Text>
        </View>
      }
      scrollContent={workoutCards} />
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
      sets: PropTypes.arrayOf(PropTypes.number)
    })),
    sets: PropTypes.arrayOf(PropTypes.shape({
      exercise: PropTypes.number,
      weight: PropTypes.number,
      reps: PropTypes.number,
      type: PropTypes.string
    }))
  })
};

const mapStateToProps = (state) => {
  return {
    activeWorkout: state.activeWorkout,
  };
};

export default connect(mapStateToProps)(ActiveWorkout);