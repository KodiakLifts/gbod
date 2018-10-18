import React from "react";
import { Text } from "react-native";
import { createSelector } from "reselect";
import ListCard from "../../components/cards/ListCard";
import ExerciseSummaryItem from "../../components/cards/ExerciseSummaryItem";

const CARDSTYLE = require("../../components/cards/cardStyle");

const getExerciseLibrary = state => state.exerciseLibrary;
const getSelectedLogDate = state => state.selectedLogDate;
const getLogs = state => state.logs;
const getPrograms = state => state.programs;

export const getExerciseLogCards = createSelector(
  [getSelectedLogDate, getLogs, getExerciseLibrary, getPrograms],
  (date, logs, exerciseLibrary, programs) => {
    let cards = [];
    let items = [];
    const selectedLogs = logs.map(log => {
      if (log.date === date) {
        return log;
      }
    });
    selectedLogs.forEach((log, index) => {
      items = [];
      log.libraryExercises.forEach(libraryId => {
        const foundExercise = exerciseLibrary.find(exercise => {
          return exercise.id === libraryId;
        });
        if (foundExercise !== undefined) {
          const foundLogs = foundExercise.logs.map(logA => {
            if (logA.date === date) {
              return logA;
            }
          });
          if (foundLogs.length !== undefined) {
            foundLogs.forEach((l, i) => {
              let summary = "";
              l.sets.forEach((set, index) => {
                summary += "" + set.weight + "x" + set.reps;
                if (index !== l.sets.length - 1) {
                  summary += ", ";
                }
              });
              items.push(
                <ExerciseSummaryItem
                  key={getNumber()}
                  libraryId={foundExercise.id}
                  name={foundExercise.name}
                  sets={l.sets}
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

    return cards;
  }
);

const getNumber = () => {
  return (getNumber.number = Math.floor(Math.random() * (1000 + 1))) ===
    getNumber.lastNumber
    ? getNumber()
    : (getNumber.lastNumber = getNumber.number);
};
