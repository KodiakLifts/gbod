import React from "react";
import { createSelector } from "reselect";
import ListCard from "../../components/cards/ListCard";
import ProgramItem from "../../components/cards/ProgramItem";

const NAME_LENGTH = 23;
const ALL_CATEGORIES = 0;
const FAVORITES = 1;

const getPrograms = state => state.programs;

const getProgramCategories = state => state.programCategories;
const getSelectedProgramCategory = state => state.selectedProgramCategory;

export const getCategoryCards = createSelector(
  [getPrograms, getProgramCategories, getSelectedProgramCategory],
  (programs, categories, selectedCategory) => {
    let categoryCards = [];

    categories.map((category, index) => {
      if (category.id !== 0) {
        if (
          selectedCategory === ALL_CATEGORIES ||
          selectedCategory === category.id
        ) {
          let items = [];

          programs.filter((program, i) => {
            if (
              program.category === category.id ||
              (category.id === FAVORITES && program.favorite)
            ) {
              let name = program.name;

              if (name.length > NAME_LENGTH) {
                name = name.substring(0, NAME_LENGTH) + "..";
              }

              items.push(
                <ProgramItem
                  key={i}
                  name={name}
                  programId={program.id}
                  category={program.category}
                  favorite={program.favorite}
                />
              );
            }
          });

          items.sort((a, b) => {
            return a.props.name.localeCompare(b.props.name);
          });

          let card = (
            <ListCard key={index} headerTitle={category.name} items={items} />
          );

          categoryCards.push(card);
        }
      }
    });
    return categoryCards;
  }
);
