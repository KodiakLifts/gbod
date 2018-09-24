import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SetButton from '../../components/buttons/SetButton';

const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const WorkoutCard = (props) => {
  const setButtons = createSetButtons(props.name, props.sets);
  return (
    <View>
      <View style={CONTAINERSTYLE.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity>
            <Text style={TEXTSTYLE.listItem}>
              {props.name}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 6, 'flexWrap': 'wrap' }}>
          {setButtons}
        </View>
      </View>
    </View>
  );
};

const createSetButtons = (name, sets) => {
  const setButtons = sets.map(set => {
    return (
      <SetButton
        key={set}
        id={"" + name + set}
        content={set.weight + "x" + set.reps + checkSetType(set)} />
    );
  });
  return (
    setButtons
  );
};

const checkSetType = (set) => {
  switch (set.type) {
    case "N": return "";
    case "D": return "-";
    case "F": return "+";
  }
  return "";
};

WorkoutCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  sets: PropTypes.arrayOf(PropTypes.shape({
    weight: PropTypes.number,
    reps: PropTypes.number,
    type: PropTypes.string
  }))
};

const mapStateToProps = (state) => {
  return {

  };
};

export default WorkoutCard;