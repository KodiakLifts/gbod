import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const STYLE = require('./screenStyle');
const COLORS = require('../../styles/Colors');

const SubScreenTemplate = (props) => {
  const { headerContent, scrollContent, footer, modal } = props;
  return (
    <View style={STYLE.subScreenContainer}>
      {modal}
      <View style={STYLE.subHeader}>
        {headerContent}
      </View>
      <ScrollView
        contentContainerStyle={STYLE.scrollArea}
      >
        {scrollContent}
      </ScrollView>
      {footer}
    </View>
  );
};

SubScreenTemplate.propTypes = {
  headerContent: PropTypes.object,
  scrollContent: PropTypes.arrayOf(PropTypes.object),
  footer: PropTypes.object,
  modal: PropTypes.object
};

export default SubScreenTemplate;