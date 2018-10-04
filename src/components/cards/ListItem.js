import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const STYLE = require('./cardStyle');

class ListItem extends Component {
  state = {
    optionsModalVisible: false,
  }

  render() {
    const { name, details } = this.props;
    return (
      <View style={STYLE.listItem}>
        <View>
          <TouchableOpacity>
            <Text style={STYLE.listItemText}>{name}</Text>
          </TouchableOpacity>
          <Text style={STYLE.listItemDetails}>{details}</Text>
        </View>
      </View>
    );
  }
}

ListItem.propTypes = {
  name: PropTypes.string,
  details: PropTypes.string
};