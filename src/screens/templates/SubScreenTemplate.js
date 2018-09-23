import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class SubScreenTemplate extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <View style={CONTAINERSTYLE.subHeader}>
          {this.props.headerContent}
        </View>
        <ScrollView contentContainerStyle={CONTAINERSTYLE.scrollArea}>
          {this.props.scrollContent}
        </ScrollView>
      </View>
    );
  }
}

SubScreenTemplate.propTypes = {
  headerContent: PropTypes.object,
  scrollContent: PropTypes.object
};

export default SubScreenTemplate;