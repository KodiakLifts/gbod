import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getActiveWorkoutCards,
  getActiveWorkoutTitle
} from '../../redux/selectors/activeWorkoutSelectors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FinishButton from '../../components/buttons/FinishButton';
import ResetButton from '../../components/buttons/ResetButton';
import SetTimer from '../../components/timers/SetTimer';
import EditDayModal from '../../components/modals/EditDayModal';

const COLORS = require('../../styles/Colors');
const STYLE = require('./workoutStyle');

const ICON_SIZE = 25;
const ICON_NAME = 'cog';

class ActiveWorkout extends Component {
  state = {
    editDayModalVisible: false
  }

  _settingsOnPress = () => {
    this.setState({ editDayModalVisible: true });
  }

  closeModal = () => {
    this.setState({ editDayModalVisible: false });
  }

  render() {
    const { title, cards } = this.props;
    const { editDayModalVisible } = this.state;
    return (
      <ScreenTemplate
        headerContent={
          <View style={STYLE.headerContent}>
            <Text style={STYLE.headerText}>
              {title}
            </Text>
            <View style={STYLE.timerSettingsContainer}>
              <EditDayModal
                title={title}
                closeModal={this.closeModal}
                visible={editDayModalVisible} />
              <SetTimer />
              <TouchableOpacity onPress={this._settingsOnPress}>
                <Icon
                  name={ICON_NAME}
                  size={ICON_SIZE}
                  color={COLORS.SECONDARYCOLOR} />
              </TouchableOpacity>
            </View>
          </View>}
        scrollContent={cards}
        endOfScrollContent={
          < View style={STYLE.footerContainer}>
            <ResetButton />
            <FinishButton />
          </View >
        } />
    );
  }
}

ActiveWorkout.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  return {
    title: getActiveWorkoutTitle(state.workoutData),
    cards: getActiveWorkoutCards(state.workoutData),
  };
};

export default connect(mapStateToProps)(ActiveWorkout);