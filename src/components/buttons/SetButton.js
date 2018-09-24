import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import MoreMenu from '../../components/buttons/MoreMenu';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const activeButton = CONTAINERSTYLE.activeSetButton;
const inactiveButton = CONTAINERSTYLE.inactiveSetButton;
const activeText = TEXTSTYLE.activeSetButtonText;
const inactiveText = TEXTSTYLE.inactiveSetButtonText;

class SetButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      buttonColor: inactiveButton,
      textColor: inactiveText
    };

  }

  setOnPress = () => {
    this.state.active ? this.setState({ active: false, buttonColor: inactiveButton, textColor: inactiveText }) :
      this.setState({ active: true, buttonColor: activeButton, textColor: activeText });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.setOnPress}>
        <View style={this.state.buttonColor}>
          <Text style={this.state.textColor}>
            {this.props.content}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SetButton.propTypes = {
  content: PropTypes.string
};

export default SetButton;