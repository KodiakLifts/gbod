import React from "react";
import ExerciseCard from "../../components/cards/ExerciseCard";
import SetButton from "../../components/buttons/SetButton";
import { createSelector } from "reselect";

const CARD_STYLE = require("../../components/cards/cardStyle");

const PROGRAM_NAME_LENGTH = 17;
const DAY_NAME_LENGTH = 7;
const EXERCISE_NAME_LENGTH = 24;

export const getCurrentNotes = state => {
  return state.activeWorkout.notes;
};

export const getSetComplete = (state, setId) => {
  if (state.programs[state.activeWorkout.program].sets[setId] !== undefined) {
    return state.programs[state.activeWorkout.program].sets[setId].complete;
  } else {
    return false;
  }
};

const getActiveWorkoutName = state => {
  return state.programs[state.activeWorkout.program].name;
};

const getActiveDayName = state => {
  return state.programs[state.activeWorkout.program].days[
    state.activeWorkout.day
  ].name;
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

    const title = program + " - " + day;
    return title;
  }
);

const getActiveSets = state => {
  if (state.programs[state.activeWorkout.program].sets.length !== 0) {
    return state.programs[state.activeWorkout.program].sets.filter(set => {
      return set.day === state.activeWorkout.day;
    });
  } else {
    return null;
  }
};

const getActiveExercises = state => {
  if (state.programs[state.activeWorkout.program].exercises.length !== 0) {
    let exercises = state.programs[
      state.activeWorkout.program
    ].exercises.filter(exercise => {
      return exercise.day === state.activeWorkout.day;
    });

    exercises.map(exercise => {
      exercise.name = state.exerciseLibrary[exercise.libraryId].name;
    });

    return exercises;
  } else {
    return null;
  }
};

const getCurrentExercise = state => state.activeWorkout.currentExercise;

export const getActiveWorkoutCards = createSelector(
  [getActiveSets, getActiveExercises, getCurrentExercise],
  (activeSets, activeExercises, currentExercise) => {
    const workoutCards = [];

    if (activeExercises !== null) {
      activeExercises.map((exercise, index) => {
        const includeWarmup = exercise.includeWarmup;

        const sets = activeSets.filter(set => {
          if (!includeWarmup) {
            return set.exercise === exercise.id && set.type !== 0;
          }
          return set.exercise === exercise.id;
        });

        const setButtons = sets.map((set, i) => {
          return (
            <SetButton
              key={i}
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

        const card = (
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
    } else {
      return null;
    }
  }
);
