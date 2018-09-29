import React from 'react';
import WorkoutCard from '../../components/cards/WorkoutCard';
import { createSelector } from 'reselect';

const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const getActiveWorkoutName = (state) => {
  return (state.programs[state.activeWorkout.program].name);
};
const getActiveDayName = (state) => {
  return (state.programs[state.activeWorkout.program].days[state.activeWorkout.day].name);
};

export const getActiveWorkoutTitle = createSelector(
  [getActiveWorkoutName, getActiveDayName],
  (programName, dayName) => {
    return programName + " - " + dayName;
  }
);

const getActiveSets = (state) => {
  return (
    state.programs[state.activeWorkout.program].sets.filter(set => {
      return set.day === state.activeWorkout.day;
    })
  );
};

const getActiveExercises = (state) => {

  let exercises = state.programs[state.activeWorkout.program].exercises.filter(exercise => {
    return exercise.day === state.activeWorkout.day;
  });

  for (let i = 0; i < exercises.length; i++) {
    exercises[i] = { ...exercises[i], name: state.exerciseLibrary[exercises[i].libraryId].name };
  }

  return exercises;
};


const getCurrentExercise = (state) => state.activeWorkout.currentExercise;

export const getActiveWorkoutCards = createSelector(
  [getActiveSets, getActiveExercises, getCurrentExercise],
  (activeSets, activeExercises, currentExercise) => {

    const workoutCards = [];

    activeExercises.forEach((exercise, index) => {
      let sets = activeSets.filter(set => {
        return set.exercise === exercise.id;
      });

      let style = (exercise.id === currentExercise ?
        CONTAINERSTYLE.activeCard : CONTAINERSTYLE.card);

      let card =
        <WorkoutCard
          key={index}
          exerciseId={exercise.id}
          borderStyle={style}
          name={exercise.name}
          sets={sets} />;

      workoutCards.push(card);
    });
    return workoutCards;
  }
);




