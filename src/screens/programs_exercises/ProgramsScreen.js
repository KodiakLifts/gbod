import React from 'react';
import { View } from 'react-native';
import SubScreenTemplate from '../templates/SubScreenTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategoryCards } from '../../redux/selectors/programsSelectors';

const STYLE = require('./PEStyle');

const Programs = (props) => {
  const { cards } = props;
  return (
    <SubScreenTemplate
      headerContent={
        <View />
      }
      scrollContent={cards}
    />
  );
};

Programs.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
  return {
    cards: getCategoryCards(state.workoutData)
  };
};

export default connect(mapStateToProps)(Programs);