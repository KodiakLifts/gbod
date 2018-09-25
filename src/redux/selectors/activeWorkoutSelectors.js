import React from 'react';
import WorkoutCard from '../../components/cards/WorkoutCard';
import { createSelector } from 'reselect';

const getActiveSets = (state) => state.activeWorkout.sets;
const getActiveExercises = (state) => state.activeWorkout.exercises;

export const getActiveWorkoutCards = createSelector(
  [getActiveSets, getActiveExercises],
  (activeSets, activeExercises) => {
    const workoutCards = [];
    const exercises = activeExercises;
    exercises.forEach((exercise, index) => {
      let sets = activeSets.filter(set => {
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
    return workoutCards;
  }
);


