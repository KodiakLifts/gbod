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
      name,
      borderStyle,
      supersetNext,
      includeWarmup,
      lastExercise,
      setButtons
    } = this.props;
    const { menuModalVisible } = this.state;
    return (
      <View >
        <EditExerciseModal
          visible={menuModalVisible}
          exerciseId={exerciseId}
          supersetNext={supersetNext}
          includeWarmup={includeWarmup}
          lastExercise={lastExercise}
          closeModal={this.closeMenuModal}
        />

        <View style={STYLE.cardContainer}>
          <View style={borderStyle}>

            <View style={STYLE.exerciseCardHeader}>
              <TouchableOpacity>
                <Text style={STYLE.title}>
                  {name}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._onMenuPress}>
                <Icon
                  name={'ellipsis-h'}
                  size={25}
                  color={COLORS.SECONDARYCOLOR}
                  style={{ marginRight: 12 }}
                />
              </TouchableOpacity>
            </View>

            <View style={STYLE.setButtonsContainer}>
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

ExerciseCard.propTypes = {
  exerciseId: PropTypes.number,
  borderStyle: PropTypes.object,
  name: PropTypes.string,
  supersetNext: PropTypes.bool,
  includeWarmup: PropTypes.bool,
  lastExercise: PropTypes.bool,
  setButtons: PropTypes.arrayOf(PropTypes.object)
};

export default ExerciseCard;