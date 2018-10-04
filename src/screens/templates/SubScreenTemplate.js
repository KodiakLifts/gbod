import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const STYLE = require('./screenStyle');

const SubScreenTemplate = (props) => {
  const { headerContent, scrollContent } = props;
  return (
    <View style={STYLE.subScreenContainer}>
      <View style={STYLE.subHeader}>
        {headerContent}
      </View>
      <ScrollView contentContainerStyle={STYLE.scrollArea}>
        {scrollContent}
      </ScrollView>
    </View>
  );
};

SubScreenTemplate.propTypes = {
  headerContent: PropTypes.object,
  scrollContent: PropTypes.arrayOf(PropTypes.object)
};

export default SubScreenTemplate;