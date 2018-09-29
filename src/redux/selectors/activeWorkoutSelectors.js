import React from 'react';
import WorkoutCard from '../../components/cards/WorkoutCard';
import { createSelector } from 'reselect';

const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const getActiveSets = (state) => state.activeWorkout.sets;
const getActiveExercises = (state) => state.activeWorkout.exercises;
const getCurrentExercise = (state) => state.activeWorkout.currentExercise;

export const getActiveWorkoutCards = createSelector(
  [getActiveSets, getActiveExercises, getCurrentExercise],
  (activeSets, activeExercises, currentExercise) => {

    const workoutCards = [];

    activeExercises.forEach((exercise, index) => {
      let sets = activeSets.filter(set => {
        return set.exercise === index;
      });

      let style;
      style = (exercise.id === currentExercise ?
        CONTAINERSTYLE.activeCard : CONTAINERSTYLE.card);

      let card =
        <WorkoutCard
          key={index}
          exerciseIndex={index}
          borderStyle={style}
          name={exercise.name}
          sets={sets} />;

      workoutCards.push(card);
    });
    return workoutCards;
  }
);


