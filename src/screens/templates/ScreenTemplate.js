import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class ScreenTemplate extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <View style={CONTAINERSTYLE.header}>
          {this.props.headerContent}
        </View>
        <ScrollView contentContainerStyle={CONTAINERSTYLE.scrollArea}>
          <View style={{ height: 12 }} />
          {this.props.scrollContent}
          {this.props.endOfScrollContent}
        </ScrollView>
      </View>
    );
  }
}

ScreenTemplate.propTypes = {
  headerContent: PropTypes.object,
  scrollContent: PropTypes.array,
  endOfScrollContent: PropTypes.object
};

export default ScreenTemplate;