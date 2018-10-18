import React from "react";
import { Text } from "react-native";
import { createSelector } from "reselect";
import ListCard from "../../components/cards/ListCard";
import ExerciseSummaryItem from "../../components/cards/ExerciseSummaryItem";
import NotesItem from "../../components/cards/NotesItem";
import MeasurementsItem from "../../components/cards/MeasurementsItem";

const CARDSTYLE = require("../../components/cards/cardStyle");

const getExerciseLibrary = state => state.exerciseLibrary;
const getSelectedLogDate = state => state.selectedLogDate;
const getWorkoutLogs = state => state.workoutLogs;
const getPrograms = state => state.programs;
const getMeasurementLogs = state => state.measurementLogs;

export const getLogCards = createSelector(
  [
    getSelectedLogDate,
    getWorkoutLogs,
    getExerciseLibrary,
    getPrograms,
    getMeasurementLogs
  ],
  (date, workoutLogs, exerciseLibrary, programs, measurements) => {
    let cards = [];
    let items = [];
    const selectedLogs = workoutLogs.filter(log => {
      return log.date === date;
    });
    selectedLogs.forEach(log => {
      items = [];
      items.push(<NotesItem key={getNumber} notes={log.notes} />);
      log.libraryExercises.forEach(libraryId => {
        const foundExercise = exerciseLibrary.find(exercise => {
          return exercise.id === libraryId;
        });
        if (foundExercise !== undefined) {
          const foundLogs = foundExercise.logs.filter(eLog => {
            if (
              eLog.date === date &&
              eLog.program === log.program &&
              eLog.day === log.day
            ) {
              return eLog;
            }
          });
          if (foundLogs.length !== 0) {
            foundLogs.forEach(fLog => {
              let summary = "";
              fLog.sets.forEach((set, index) => {
                summary += "" + set.weight + "x" + set.reps;
                if (index !== fLog.sets.length - 1) {
                  summary += ", ";
                }
              });
              items.push(
                <ExerciseSummaryItem
                  key={getNumber()}
                  libraryId={foundExercise.id}
                  name={foundExercise.name}
                  sets={fLog.sets}
                  summary={summary}
                />
              );
            });
          }
        }
      });
      let header =
        "" +
        programs[log.program].name +
        " - " +
        programs[log.program].days[log.day].name;
      cards.push(
        <ListCard key={getNumber()} headerTitle={header} items={items} />
      );
    });

    const measurementsItem = <MeasurementsItem />;

    // cards.unshift(
    //   <ListCard key={getNumber()} headerTitle={date} items={measurementsItem} />
    // );

    return cards;
  }
);

const getNumber = () => {
  return (getNumber.number = Math.floor(Math.random() * (1000 + 1))) ===
    getNumber.lastNumber
    ? getNumber()
    : (getNumber.lastNumber = getNumber.number);
};
