import React from 'react';
import ExerciseCard from '../../components/cards/ExerciseCard';
import SetButton from '../../components/buttons/SetButton';
import { View, Text } from 'react-native';
import { createSelector } from 'reselect';

const CARD_STYLE = require('../../components/cards/cardStyle');
const WORKOUT_STYLE = require('../../screens/workout/workoutStyle');

const PROGRAM_NAME_LENGTH = 23;
const DAY_NAME_LENGTH = 23;

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
    if (program.length > PROGRAM_NAME_LENGTH) {
      program = program.substring(0, PROGRAM_NAME_LENGTH) + "..";
    }
    if (day.length > DAY_NAME_LENGTH) {
      day = day.substring(0, DAY_NAME_LENGTH) + "..";
    }
    const title =
      <View>
        <Text style={WORKOUT_STYLE.headerText}>
          {program}
        </Text>
        <Text style={WORKOUT_STYLE.subHeaderText}>
          {day}
        </Text>
      </View>;
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

      const includeWarmup = exercise.includeWarmup;

      const sets = activeSets.filter(set => {
        if (!includeWarmup) {
          return (set.exercise === exercise.id && set.type !== 0);
        }
        return (set.exercise === exercise.id);
      });

      const setButtons = sets.map((set, index) => {
        return (
          <SetButton
            key={index}
            exerciseId={exercise.id}
            setId={set.id}
            reps={set.reps}
            weight={set.weight}
            type={set.type}
            min={set.restMinutes}
            sec={set.restSeconds}
            timerOn={set.timerOn}
          />
        );
      });

      const borderStyle = (exercise.id === currentExercise ?
        CARD_STYLE.activeCard : CARD_STYLE.card);

      let lastExercise = false;
      if (index === (activeExercises.length - 1)) {
        lastExercise = true;
      }

      let card =
        <ExerciseCard
          key={index}
          exerciseId={exercise.id}
          borderStyle={borderStyle}
          name={exercise.name}
          supersetNext={exercise.supersetNext}
          includeWarmup={exercise.includeWarmup}
          lastExercise={lastExercise}
          setButtons={setButtons}
        />;

      workoutCards.push(card);
    });
    return workoutCards;
  }
);




