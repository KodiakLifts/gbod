import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import WorkoutCard from '../../components/cards/WorkoutCard';
import { connect } from 'react-redux';
import { getActiveWorkoutCards } from '../../redux/selectors/activeWorkoutSelectors';

const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');


const ActiveWorkout = ({ title, exercises, sets }) => {
  return (
    <ScreenTemplate
      headerContent={
        <View style={CONTAINERSTYLE.headerContent}>
          <Text style={TEXTSTYLE.headerText}>
            {title}
          </Text>
        </View>
      }
      scrollContent={createCards(exercises, sets)} />
  );
};

const createCards = (activeExercises, activeSets) => {
  const workoutCards = [];
  activeExercises.forEach((exercise, index) => {
    let sets = activeSets.filter(set => {
      return set.exercise === index;
    });
    let card =
      <WorkoutCard
        key={index}
        exerciseNum={index}
        name={exercise.name}
        sets={sets} />;
    workoutCards.push(card);
  });
  return workoutCards;
}

ActiveWorkout.propTypes = {
  title: PropTypes.string,
  exercises: PropTypes.arrayOf(PropTypes.object),
  sets: PropTypes.arrayOf(PropTypes.object)
};


const mapStateToProps = (state) => {

  return {
    title: state.activeWorkout.title,
    exercises: state.activeWorkout.exercises,
    sets: state.activeWorkout.sets
  };
};


export default connect(mapStateToProps)(ActiveWorkout);