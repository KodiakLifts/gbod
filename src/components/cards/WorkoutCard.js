import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import MoreMenu from '../../components/buttons/MoreMenu';
import SetButton from '../../components/buttons/SetButton';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const menuItems = [{ name: "option 1" }, { name: "option 2" }];

class WorkoutCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sets: this.createSetButtons(props.sets),
      setIndex: 0
    };

  }

  createSetButtons = (sets) => {
    const setButtons = sets.map(set => {
      return (
        <SetButton key={set} content={set.weight + "x" + set.reps + this.checkSetType(set)} />
      );
    });
    return (
      setButtons
    );
  };

  checkSetType = (set) => {
    switch (set.type) {
      case "N": return "";
      case "D": return "-";
      case "F": return "+";
    }
    return "";
  };

  setOnPress = () => {

  }



  render() {
    return (
      <View>
        <View style={CONTAINERSTYLE.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={TEXTSTYLE.listItem}>{this.props.name}</Text>
            <View style={{ marginRight: 12 }}>
              <MoreMenu options={menuItems} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 6, 'flexWrap': 'wrap' }}>
            {this.state.sets}
          </View>
        </View>
      </View>
    );
  }
}

WorkoutCard.propTypes = {
  name: PropTypes.string,
  sets: PropTypes.arrayOf(PropTypes.shape({
    weight: PropTypes.number,
    reps: PropTypes.number,
    type: PropTypes.string
  }))
};

export default WorkoutCard;