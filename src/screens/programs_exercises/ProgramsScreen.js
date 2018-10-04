import React from 'react';
import { View } from 'react-native';
import SubScreenTemplate from '../templates/SubScreenTemplate';
import PropTypes from 'prop-types';

const STYLE = require('./PEStyle');

const Programs = (props) => {

  return (
    <SubScreenTemplate
      headerContent={
        <View />
      }
      scrollContent={<View />}
    />
  );
};

Programs.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object)
};

export default Programs;