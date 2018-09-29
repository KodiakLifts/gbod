import React from 'react';
import WorkoutCard from '../../components/cards/WorkoutCard';
import { createSelector } from 'reselect';

const CONTAINERSTYLE = require('../../styles/ContainerStyle');


const getActiveWorkoutName = (state) => {
  console.log(state)
  console.log("GETTING ACTIVE WORKOUT NAME")
  return (state.programs[state.activeWorkout.program].name);
};
const getActiveDayName = (state) => {
  console.log("GETTINGS ACTIVE DAY NAME")
  return (state.programs[state.activeWorkout.program].days[state.activeWorkout.day].name);
};

export const getActiveWorkoutTitle = createSelector(
  [getActiveWorkoutName, getActiveDayName],
  (programName, dayName) => {
    console.log("GETTING ACTIVE WORKOUT TITLE")
    return programName + " - " + dayName;
  }
);



const getActiveSets = (state) => {
  console.log("GETTING ACTIVE SETS")
  return (
    state.programs[state.activeWorkout.program].sets.filter(set => {
      return set.day === state.activeWorkout.day;
    })
  );
};

const getActiveExercises = (state) => {
  console.log("GETTING ACTIVE EXERCISES")
  return (state.programs[state.activeWorkout.program].exercises.filter(exercise => {
    return exercise.day === state.activeWorkout.day;
  }));
};

const getCurrentExercise = (state) => state.activeWorkout.currentExercise;

export const getActiveWorkoutCards = createSelector(
  [getActiveSets, getActiveExercises, getCurrentExercise],
  (activeSets, activeExercises, currentExercise) => {

    console.log("GETTING ACTIVE WORKOUT CARDS")
    const workoutCards = [];

    activeExercises.forEach((exercise, index) => {
      let sets = activeSets.filter(set => {
        return set.exercise === index;
      });

      let style = (exercise.id === currentExercise ?
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




