import React, { Component } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Picker } from 'react-native';
import PropTypes from 'prop-types';
import { updateDayData } from '../../redux/actions/activeWorkoutActions';
import { connect } from 'react-redux';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class EditDayModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevDayId: props.currentDay,
      tmpDayId: props.currentDay,
      tmpDayName: props.days[props.currentDay]
    };

    this.createDayItems = this.createDayItems.bind(this);
  }

  createDayItems(days) {
    const dayItems = days.map((day, index) => {
      return (
        <Picker.Item key={index} label={day.name} value={day.id} />
      );
    });
    return (dayItems);
  }

  updateTmpDay = (dayId) => {
    const dayName = this.props.days[dayId];
    this.setState({
      tmpDayId: dayId,
      tmpDayName: dayName
    });
  }

  save = () => {
    this.setState({ prevDayId: this.state.tmpDayId });
    this.props.updateDayData(
      this.state.tmpDayId
    );
    this.props.closeModal();
  }

  cancel = () => {
    const dayName = this.props.days[this.state.prevDayId];
    this.setState({
      tmpDayId: this.state.prevDayId,
      tmpDayName: dayName
    });
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        transparent
        visible={this.props.visible}
        onRequestClose={this.props.closeModal}
      >
        <TouchableOpacity onPress={this.props.closeModal} style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.TRANSPARENTOVERLAY
        }}>
          <TouchableWithoutFeedback>
            <View style={CONTAINERSTYLE.modalCard}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={TEXTSTYLE.modalHeader}>
                  Edit Day
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 25 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={TEXTSTYLE.modalText}>
                      Days:
                    </Text>
                  </View>

                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>

                  <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Picker
                      style={{ color: COLORS.SECONDARYCOLOR, width: 100, height: 30, marginLeft: 5, marginBottom: 10 }}
                      selectedValue={this.state.tmpDayId}
                      onValueChange={this.updateTmpDay}>
                      {this.createDayItems(this.props.days)}
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={this.cancel}>
                  <Text style={TEXTSTYLE.selectedTextButton}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.save}>
                  <Text style={TEXTSTYLE.selectedTextButton}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}

EditDayModal.propTypes = {
  visible: PropTypes.bool,
  currentDay: PropTypes.number,
  days: PropTypes.arrayOf(PropTypes.object),
  closeModal: PropTypes.func,
  updateDayData: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    days:
      state
        .workoutData
        .programs[state.workoutData.activeWorkout.program]
        .days,
    currentDay: state.workoutData.activeWorkout.day
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDayData: (dayId) => {
      dispatch(updateDayData(dayId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDayModal);