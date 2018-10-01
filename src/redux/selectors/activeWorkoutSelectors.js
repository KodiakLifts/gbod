import React from 'react';
import ExerciseCard from '../../components/cards/ExerciseCard';
import { createSelector } from 'reselect';

const CONTAINERSTYLE = require('../../styles/ContainerStyle');
const PROGRAMNAMELENGTH = 12;
const DAYNAMELENGTH = 5;

const getActiveWorkoutName = (state) => {
  return (state.programs[state.activeWorkout.program].name);
};
const getActiveDayName = (state) => {
  return (state.programs[state.activeWorkout.program].days[state.activeWorkout.day].name);
};

export const getActiveWorkoutTitle = createSelector(
  [getActiveWorkoutName, getActiveDayName],
  (programName, dayName) => {
    let program = programName;
    let day = dayName;
    if (program.length > PROGRAMNAMELENGTH) {
      program = program.substring(0, PROGRAMNAMELENGTH) + "..";
    }
    if (day.length > DAYNAMELENGTH) {
      day = day.substring(0, DAYNAMELENGTH) + "..";
    }
    let title = program + " - " + day;
    return title;
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

      let includeWarmup = exercise.includeWarmup;

      let sets = activeSets.filter(set => {
        if (!includeWarmup) {
          return (set.exercise === exercise.id && set.type !== 'W');
        }
        return (set.exercise === exercise.id);
      });

      let style = (exercise.id === currentExercise ?
        CONTAINERSTYLE.activeCard : CONTAINERSTYLE.card);

      let lastExercise = false;
      if (index === (activeExercises.length - 1)) {
        lastExercise = true;
      }

      let card =
        <ExerciseCard
          key={index}
          exerciseId={exercise.id}
          borderStyle={style}
          name={exercise.name}
          sets={sets}
          supersetNext={exercise.supersetNext}
          includeWarmup={exercise.includeWarmup}
          lastExercise={lastExercise}
        />;

      workoutCards.push(card);
    });
    return workoutCards;
  }
);




