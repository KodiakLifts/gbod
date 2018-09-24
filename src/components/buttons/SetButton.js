import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      buttonColor: inactiveButton,
      textColor: inactiveText,
    };
  }

  onPress = () => {
    if (this.state.active) {
      this.setState({
        buttonColor: inactiveButton, textColor: inactiveText
      });
      this.props.setIncomplete(this.props.exerciseNum, this.props.setNum);
    } else {
      this.setState({
        buttonColor: activeButton, textColor: activeText
      });
      this.props.setComplete(this.props.exerciseNum, this.props.setNum);
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={this.state.buttonColor}>
          <Text style={this.state.textColor}>
            {this.props.content}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SetButton.propTypes = {
  exerciseNum: PropTypes.number,
  setNum: PropTypes.number,
  content: PropTypes.string,
  setComplete: PropTypes.func,
  setIncomplete: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    setComplete: (exerciseNum, setNum) => {
      dispatch({ type: 'SET_COMPLETE', exerciseNum: exerciseNum, setNum: setNum });
    },
    setIncomplete: (exerciseNum, setNum) => {
      dispatch({ type: 'SET_INCOMPLETE', exerciseNum: exerciseNum, setNum: setNum });
    }
  };
};

export default connect(mapDispatchToProps)(SetButton);