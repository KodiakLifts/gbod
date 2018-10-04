import React from 'react';
import { createSelector } from 'reselect';
import ListCard from '../../components/cards/ListCard';
import ListItem from '../../components/cards/ListItem';

const getPrograms = (state) => state.programs;

const getProgramCategories = (state) => state.programCategories;

export const getCategoryCards = createSelector(
  [getPrograms, getProgramCategories],
  (programs, categories) => {

    let categoryCards = [];

    categories.forEach((category, index) => {
      let items = [];

      programs.filter((program, i) => {
        if (program.category === category.id) {
          items.push(<ListItem
            key={i}
            name={program.name}
            programId={program.id}
          />);
        }
      });

      let card =
        <ListCard
          key={index}
          headerTitle={category.name}
          items={items}
        />;

      categoryCards.push(card);
    });
    return categoryCards;
  }
);
