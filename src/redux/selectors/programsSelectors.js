import React from 'react';
import { createSelector } from 'reselect';
import ListCard from '../../components/cards/ListCard';
import ProgramItem from '../../components/cards/ProgramItem';

const NAME_LENGTH = 31;

const getPrograms = (state) => state.programs;

const getProgramCategories = (state) => state.programCategories;
const getSelectedProgramCategory = (state) => state.selectedProgramCategory;

export const getCategoryCards = createSelector(
  [getPrograms, getProgramCategories, getSelectedProgramCategory],
  (programs, categories, selectedCategory) => {

    let categoryCards = [];

    categories.forEach((category, index) => {
      let items = [];

      programs.filter((program, i) => {
        if (program.category === category.id) {
          let name = program.name;

          if (name.length > NAME_LENGTH) {
            name = name.substring(0, NAME_LENGTH) + "..";
          }

          items.push(<ProgramItem
            key={i}
            name={name}
            programId={program.id}
            category={program.category}
          />);
        }
      });

      let card =
        <ListCard
          key={index}
          headerTitle={category.name}
          items={items}
        />;

      if (selectedCategory === 0 || selectedCategory === category.id) {
        categoryCards.push(card);
      }

    });
    return categoryCards;
  }
);
