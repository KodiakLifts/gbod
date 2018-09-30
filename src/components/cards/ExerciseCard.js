import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SetButton from '../../components/buttons/SetButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

const TEXTSTYLE = require('../../styles/TextStyle');
const COLORS = require('../../styles/Colors');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class WorkoutCard extends Component {
  constructor(props) {
    super(props);

    this.createSetButtons = this.createSetButtons.bind(this);
  }


  createSetButtons(exerciseId, sets) {
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
  }

  render() {
    const { exerciseId, sets, name, borderStyle, supersetNext } = this.props;
    const setButtons = this.createSetButtons(exerciseId, sets);
    return (
      <View >
        <View style={{ alignItems: 'center' }}>
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
          <Icon
            name={'link'}
            size={15}
            color={supersetNext ? COLORS.SECONDARYCOLOR : COLORS.BACKCOLOR}
            style={{ transform: [{ rotateZ: '135deg' }] }} />
        </View>
      </View>
    );
  }
}



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
  })),
  supersetNext: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    supersetNext:
      state
        .workoutData
        .programs[state.workoutData.activeWorkout.program]
        .exercises[ownProps.exerciseId].supersetNext
  };
};

export default connect(mapStateToProps)(WorkoutCard);