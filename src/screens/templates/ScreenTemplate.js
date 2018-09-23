import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const STYLES = require('../../styles/ContainerStyle');

class ScreenTemplate extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <View style={STYLES.header}>
          {this.props.headerContent}
        </View>
        <ScrollView contentContainerStyle={STYLES.scrollArea}>
          {this.props.scrollContent}
        </ScrollView>
      </View>
    );
  }
}

ScreenTemplate.propTypes = {
  headerContent: PropTypes.object,
  scrollContent: PropTypes.object
};

export default ScreenTemplate;