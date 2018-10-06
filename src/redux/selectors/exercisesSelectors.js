import React from 'react';
import { createSelector } from 'reselect';
import ListCard from '../../components/cards/ListCard';
import ExerciseItem from '../../components/cards/ExerciseItem';

const ALL_CATEGORIES = 0;
const ALL_BODY_PARTS = 0;
const FAVORITES = 6;

const getExercises = (state) => state.exerciseLibrary;

const getSelectedExerciseCategory = (state) => state.selectedExerciseCategory;

const getSelectedBodyPart = (state) => state.selectedBodyPart;

export const getLibraryCards = createSelector(
  [getExercises, getSelectedExerciseCategory, getSelectedBodyPart],
  (exercises, selectedCategory, selectedBodyPart) => {

    let libraryCards = [];
    let shownAlphabet = [];
    let shownExercises = [];

    exercises.forEach(exercise => {
      if (selectedCategory === ALL_CATEGORIES ||
        selectedCategory === exercise.category ||
        (selectedCategory === FAVORITES && exercise.favorite)) {
        if (selectedBodyPart === ALL_BODY_PARTS ||
          selectedBodyPart === exercise.bodyPart) {
          if (!shownAlphabet.includes(exercise.name.charAt(0).toUpperCase())) {
            shownAlphabet.push(exercise.name.charAt(0).toUpperCase());
          }
          shownExercises.push(exercise);
        }
      }
    });


    shownAlphabet.forEach((letter, index) => {
      if (letter !== '') {
        let items = [];

        shownExercises.forEach((exercise, i) => {
          let name = exercise.name;
          if (name.toUpperCase().startsWith(letter)) {

            items.push(<ExerciseItem
              key={i}
              name={name}
              libraryId={exercise.id}
              category={exercise.category}
              bodyPart={exercise.bodyPart}
              favorite={exercise.favorite}
              oneRepMax={exercise.oneRepMax}
            />);
          }
        });

        items.sort((a, b) => { return a.props.name.localeCompare(b.props.name); });

        let card =
          <ListCard
            key={index}
            headerTitle={letter}
            items={items}
          />;

        libraryCards.push(card);
      }
    }
    );

    return libraryCards;

  }
);

