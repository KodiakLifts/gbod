import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SetButton from '../buttons/SetButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EditExerciseModal from '../modals/EditExerciseModal';

const COLORS = require('../../styles/Colors');
const STYLE = require('./cardStyle');

class ExerciseCard extends Component {
  state = {
    menuModalVisible: false,
  }

  _onMenuPress = () => {
    this.setState({ menuModalVisible: true });
  }

  closeMenuModal = () => {
    this.setState({ menuModalVisible: false });
  }

  render() {
    const {
      exerciseId,
      sets,
      name,
      borderStyle,
      supersetNext,
      includeWarmup,
      lastExercise
    } = this.props;
    const { menuModalVisible } = this.state;
    const setButtons = createSetButtons(exerciseId, sets);

    return (
      <View >
        <EditExerciseModal
          visible={menuModalVisible}
          exerciseId={exerciseId}
          supersetNext={supersetNext}
          includeWarmup={includeWarmup}
          lastExercise={lastExercise}
          closeModal={this.closeMenuModal} />

        <View style={STYLE.cardWrapper}>
          <View style={borderStyle}>

            <View style={STYLE.exerciseCardHeader}>
              <TouchableOpacity>
                <Text style={STYLE.exerciseName}>
                  {name}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._onMenuPress}>
                <Icon name={'ellipsis-h'} size={25} color={COLORS.SECONDARYCOLOR} style={{ marginRight: 12 }} />
              </TouchableOpacity>
            </View>

            <View style={STYLE.setButtonsWrapper}>
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

const createSetButtons = (exerciseId, sets) => {
  return sets.map((set, index) => {
    return (
      <SetButton
        key={index}
        exerciseId={exerciseId}
        setId={set.id}
        reps={set.reps}
        weight={set.weight}
        type={set.type}
        min={set.restMinutes}
        sec={set.restSeconds}
        timerOn={set.timerOn}
      />
    );
  });
};

ExerciseCard.propTypes = {
  exerciseId: PropTypes.number,
  borderStyle: PropTypes.object,
  name: PropTypes.string,
  sets: PropTypes.arrayOf(PropTypes.shape({
    exercise: PropTypes.number,
    weight: PropTypes.number,
    reps: PropTypes.number,
    type: PropTypes.number,
    complete: PropTypes.bool,
    restTime: PropTypes.number
  })),
  supersetNext: PropTypes.bool,
  includeWarmup: PropTypes.bool,
  lastExercise: PropTypes.bool,
};

export default ExerciseCard;