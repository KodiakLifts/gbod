import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SetButton from '../../components/buttons/SetButton';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TEXTSTYLE = require('../../styles/TextStyle');
const COLORS = require('../../styles/Colors');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const WorkoutCard = ({ exerciseId, sets, name, borderStyle }) => {
  const setButtons = createSetButtons(exerciseId, sets);
  return (
    <View>
      <View style={borderStyle}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity>
            <Text style={TEXTSTYLE.listItem}>
              {name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name={'ellipsis-h'} size={25} color={COLORS.SECONDARYCOLOR} style={{ marginRight: 12 }} />
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 6,
          'flexWrap': 'wrap'
        }}>
          {setButtons}
        </View>
      </View>
    </View>
  );
};

const createSetButtons = (exerciseId, sets) => {
  const setButtons = sets.map((set, index) => {
    return (
      <SetButton
        key={index}
        exerciseId={exerciseId}
        setId={set.id}
        reps={set.reps}
        weight={set.weight}
        type={set.type} />
    );
  });
  return (
    setButtons
  );
};

WorkoutCard.propTypes = {
  exerciseId: PropTypes.number,
  borderStyle: PropTypes.object,
  name: PropTypes.string,
  sets: PropTypes.arrayOf(PropTypes.shape({
    exercise: PropTypes.number,
    weight: PropTypes.number,
    reps: PropTypes.number,
    type: PropTypes.string,
    complete: PropTypes.bool
  }))
};

export default WorkoutCard;