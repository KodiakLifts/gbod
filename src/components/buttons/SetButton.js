import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
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
      textColor: inactiveText,
      behavior: this.enabledOnPress
    };

  }

  activateButton = () => {
    this.setState({ behavior: this.enabledOnPress });
  }

  disabledOnPress = () => {

  }

  enabledOnPress = () => {
    this.state.active ? this.setState({ active: false, buttonColor: inactiveButton, textColor: inactiveText }) :
      this.setState({ active: true, buttonColor: activeButton, textColor: activeText });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.state.behavior}>
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