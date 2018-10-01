import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SetButton from '../buttons/SetButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import EditExerciseModal from '../modals/EditExerciseModal';

const TEXTSTYLE = require('../../styles/TextStyle');
const COLORS = require('../../styles/Colors');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class ExerciseCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuModalVisible: false,
    };

    this._onMenuPress = this._onMenuPress.bind(this);
    this.closeMenuModal = this.closeMenuModal.bind(this);
    this.createSetButtons = this.createSetButtons.bind(this);
  }

  _onMenuPress() {
    this.setState({ menuModalVisible: true });
  }

  closeMenuModal() {
    this.setState({ menuModalVisible: false });
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
          type={set.type}
          min={set.restMinutes}
          sec={set.restSeconds} />
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
        <EditExerciseModal
          visible={this.state.menuModalVisible}
          exerciseId={this.props.exerciseId}
          supersetNext={this.props.supersetNext}
          includeWarmup={this.props.includeWarmup}
          lastExercise={this.props.lastExercise}
          closeModal={this.closeMenuModal} />
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
              <TouchableOpacity onPress={this._onMenuPress}>
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

            <View>

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

ExerciseCard.propTypes = {
  exerciseId: PropTypes.number,
  borderStyle: PropTypes.object,
  name: PropTypes.string,
  sets: PropTypes.arrayOf(PropTypes.shape({
    exercise: PropTypes.number,
    weight: PropTypes.number,
    reps: PropTypes.number,
    type: PropTypes.string,
    complete: PropTypes.bool,
    restTime: PropTypes.number
  })),
  supersetNext: PropTypes.bool,
  includeWarmup: PropTypes.bool,
  lastExercise: PropTypes.bool,
};

export default ExerciseCard;