import React from "react";
import { createSelector } from "reselect";
import ListCard from "../../components/cards/ListCard";
import ExerciseSummaryItem from "../../components/cards/ExerciseSummaryItem";
import NotesItem from "../../components/cards/NotesItem";
import MeasurementsItem from "../../components/cards/MeasurementsItem";

const getExerciseLibrary = state => state.exerciseLibrary;
const getSelectedLogDate = state => state.selectedLogDate;
const getWorkoutLogs = state => state.workoutLogs;
const getPrograms = state => state.programs;
const getMeasurementLogs = state => state.measurementLogs;
const getMeasurementCategories = state => state.measurementCategories;
const getUnits = state => state.units;

export const getLogCards = createSelector(
  [
    getSelectedLogDate,
    getWorkoutLogs,
    getExerciseLibrary,
    getPrograms,
    getMeasurementLogs,
    getMeasurementCategories,
    getUnits
  ],
  (
    date,
    workoutLogs,
    exerciseLibrary,
    programs,
    measurementLogs,
    measurementCategories,
    units
  ) => {
    let cards = [];
    let items = [];
    const selectedLogs = workoutLogs.filter(log => {
      return log.date === date;
    });
    if (selectedLogs !== undefined) {
      selectedLogs.forEach((log, i1) => {
        items = [];
        items.push(
          <NotesItem key={getKey("n" + i1)} notes={log.notes} logId={log.id} />
        );
        log.libraryExercises.forEach((libraryId, i2) => {
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
        let header =
          "" +
          programs[log.program].name +
          " - " +
          programs[log.program].days[log.day].name;
        cards.push(
          <ListCard key={getKey("c" + i1)} headerTitle={header} items={items} />
        );
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

    return cards;
  }
);

const getKey = index => {
  return "" + index + new Date().getTime();
};
