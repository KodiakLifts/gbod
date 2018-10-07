import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const STYLE = require('./screenStyle');
const SCROLL_TOP_PADDING = 12;

const ScreenTemplate = (props) => {
  const { headerContent, scrollContent, endOfScrollContent } = props;
  return (
    <View style={STYLE.container}>
      <View style={STYLE.header}>
        {headerContent}
      </View>
      <ScrollView contentContainerStyle={STYLE.scrollArea}>
        <View style={{ height: SCROLL_TOP_PADDING }} />
        {scrollContent}
        {endOfScrollContent}
      </ScrollView>
    </View>
  );
};

ScreenTemplate.propTypes = {
  headerContent: PropTypes.object,
  scrollContent: PropTypes.arrayOf(PropTypes.object),
  endOfScrollContent: PropTypes.object
};

export default ScreenTemplate;