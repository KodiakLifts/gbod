import React from "react";
import { createSelector } from "reselect";
import ListCard from "../../components/cards/ListCard";
import ExerciseSummaryItem from "../../components/cards/ExerciseSummaryItem";
import NotesItem from "../../components/cards/NotesItem";
import MeasurementsItem from "../../components/cards/MeasurementsItem";
import LogItem from "../../components/cards/LogItem";

const getExerciseLibrary = state => state.exerciseLibrary;
const getSelectedLogDate = state => state.selectedLogDate;
const getWorkoutLogs = state => state.workoutLogs;
const getMeasurementLogs = state => state.measurementLogs;
const getMeasurementCategories = state => state.measurementCategories;
const getUnits = state => state.units;

export const getLogCards = createSelector(
  [
    getSelectedLogDate,
    getWorkoutLogs,
    getExerciseLibrary,
    getMeasurementLogs,
    getMeasurementCategories,
    getUnits
  ],
  (
    date,
    workoutLogs,
    exerciseLibrary,
    measurementLogs,
    measurementCategories,
    units
  ) => {
    let cards = [];
    let items = [];
    const selectedLogs = workoutLogs.filter(log => {
      return log.date === date;
    });
    if (selectedLogs.length !== 0) {
      selectedLogs.forEach((log, i1) => {
        items = [];
        if (log.notes !== "") {
          items.push(
            <NotesItem
              key={getKey("n" + i1)}
              notes={log.notes}
              logId={log.id}
            />
          );
        }
        log.libraryExercises.forEach((libraryId, i2) => {
          const foundExercise = exerciseLibrary.find(exercise => {
            return exercise.id === libraryId;
          });
          if (foundExercise !== undefined) {
            const foundLogs = foundExercise.logs.filter(eLog => {
              if (eLog.date === date && eLog.title === log.title) {
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
                    key={getKey("e" + i2)}
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
        if (items.length !== 0) {
          items.unshift(
            <LogItem
              key={getKey("l" + i1)}
              logId={log.id}
              logTitle={log.title}
            />
          );
          cards.push(
            <ListCard key={getKey("c" + i1)} headerTitle={""} items={items} />
          );
        }
      });
    }

    const measurementLog = measurementLogs.find(log => {
      return log.date === date;
    });

    if (measurementLog !== undefined) {
      let labels = [];
      let measurements = [];

      measurementLog.measurements.forEach(measure => {
        labels.push(
          measurementCategories[measure.measurementCategory].name + ": "
        );
        measurements.push(
          "" +
            measure.ammount +
            " " +
            units[measurementCategories[measure.measurementCategory].units].name
        );
      });

      const measurementsItem = (
        <MeasurementsItem
          key={getKey("mItem")}
          logId={measurementLog.id}
          labels={labels}
          measurements={measurements}
        />
      );

      cards.unshift(
        <ListCard
          key={getKey("mCard")}
          headerTitle={""}
          items={[measurementsItem]}
        />
      );
    }
    if (cards.length === 0) {
      cards = null;
    }

    return cards;
  }
);

const getKey = index => {
  return "" + index + new Date().getTime();
};
