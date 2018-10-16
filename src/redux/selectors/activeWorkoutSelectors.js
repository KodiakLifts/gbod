import React from "react";
import ExerciseCard from "../../components/cards/ExerciseCard";
import SetButton from "../../components/buttons/SetButton";
import { View, Text, TouchableOpacity } from "react-native";
import { createSelector } from "reselect";

const CARD_STYLE = require("../../components/cards/cardStyle");
const WORKOUT_STYLE = require("../../screens/workout/workoutStyle");

const PROGRAM_NAME_LENGTH = 26;
const EXERCISE_NAME_LENGTH = 24;

const getActiveWorkoutName = state => {
  return state.programs[state.activeWorkout.program].name;
};

export const getActiveWorkoutTitle = createSelector(
  [getActiveWorkoutName],
  programName => {
    let program = programName;

    if (program.length > PROGRAM_NAME_LENGTH) {
      program = program.substring(0, PROGRAM_NAME_LENGTH) + "..";
    }

    const title = program;
    return title;
  }
);

const getActiveSets = state => {
  return state.programs[state.activeWorkout.program].sets.filter(set => {
    return set.day === state.activeWorkout.day;
  });
};

const getActiveExercises = state => {
  let exercises = state.programs[state.activeWorkout.program].exercises.filter(
    exercise => {
      return exercise.day === state.activeWorkout.day;
    }
  );

  exercises.map(exercise => {
    exercise.name = state.exerciseLibrary[exercise.libraryId].name;
  });

  return exercises;
};

const getCurrentExercise = state => state.activeWorkout.currentExercise;

export const getActiveWorkoutCards = createSelector(
  [getActiveSets, getActiveExercises, getCurrentExercise],
  (activeSets, activeExercises, currentExercise) => {
    const workoutCards = [];

    activeExercises.map((exercise, index) => {
      const includeWarmup = exercise.includeWarmup;

      const sets = activeSets.filter(set => {
        if (!includeWarmup) {
          return set.exercise === exercise.id && set.type !== 0;
        }
        return set.exercise === exercise.id;
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

      const borderStyle =
        exercise.id === currentExercise
          ? CARD_STYLE.activeCard
          : CARD_STYLE.card;

      const lastExercise = exercise.id === activeExercises.length - 1;

      const firstExercise = exercise.id === 0;

      let name = exercise.name;
      if (name.length > EXERCISE_NAME_LENGTH) {
        name = name.substring(0, EXERCISE_NAME_LENGTH) + "..";
      }

      let card = (
        <ExerciseCard
          key={index}
          exerciseId={exercise.id}
          borderStyle={borderStyle}
          active={exercise.id === currentExercise}
          name={name}
          supersetNext={exercise.supersetNext}
          includeWarmup={exercise.includeWarmup}
          firstExercise={firstExercise}
          lastExercise={lastExercise}
          setButtons={setButtons}
        />
      );

      workoutCards.push(card);
    });
    return workoutCards;
  }
);
