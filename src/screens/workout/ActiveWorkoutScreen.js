import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveWorkoutCards, getActiveWorkoutTitle } from '../../redux/selectors/activeWorkoutSelectors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FinishButton from '../../components/buttons/FinishButton';
import ResetButton from '../../components/buttons/ResetButton';
import SetTimer from '../../components/timers/SetTimer';
import EditDayModal from '../../components/modals/EditDayModal';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class ActiveWorkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editDayModalVisible: false
    };
  }

  _settingsOnPress = () => {
    this.setState({ editDayModalVisible: true });
  }

  closeModal = () => {
    this.setState({ editDayModalVisible: false });
  }

  render() {
    return (
      <ScreenTemplate
        headerContent={<View style={CONTAINERSTYLE.headerContent}>
          <Text style={TEXTSTYLE.headerText}>
            {this.props.title}
          </Text>
          <View style={{ width: 115, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <EditDayModal closeModal={this.closeModal} visible={this.state.editDayModalVisible} />
            <SetTimer />
            <TouchableOpacity onPress={this._settingsOnPress}>
              <Icon name={'cog'} size={25} color={COLORS.SECONDARYCOLOR} />
            </TouchableOpacity>
          </View>
        </View>}
        scrollContent={this.props.cards}
        endOfScrollContent={
          < View style={{
            flexDirection: 'row',
          }}>
            <ResetButton />
            <FinishButton />
            <View style={{ backgroundColor: COLORS.SECONDARYCOLOR, height: 500 }} />
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