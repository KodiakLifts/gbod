import React from 'react';
import { createSelector } from 'reselect';
import ListCard from '../../components/cards/ListCard';
import ProgramItem from '../../components/cards/ProgramItem';

const ALL_CATEGORIES = 0;
const ALL_BODY_PARTS = 0;

const getExercises = (state) => state.exerciseLibrary;

const getSelectedExerciseCategory = (state) => state.selectedExerciseCategory;

const getSelectedBodyPart = (state) => state.selectedBodyPart;

export const getLibraryCards = createSelector(
  [getExercises,]
);