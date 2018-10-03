import React, { Component } from 'react';
import {
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Picker
} from 'react-native';
import PropTypes from 'prop-types';
import { updateDayData } from '../../redux/actions/activeWorkoutActions';
import { connect } from 'react-redux';

const STYLE = require('./modalStyle');

class EditDayModal extends Component {
  state = {
    prevDayId: this.props.currentDay,
    tmpDayId: this.props.currentDay
  }

  updateTmpDay = (dayId) => {
    this.setState({ tmpDayId: dayId });
  }

  save = () => {
    const { updateDayData, closeModal } = this.props;
    const { tmpDayId } = this.state;

    this.setState({ prevDayId: tmpDayId });
    updateDayData(
      tmpDayId
    );
    closeModal();
  }

  cancel = () => {
    const { closeModal } = this.props;
    const { prevDayId } = this.state;

    this.setState({ tmpDayId: prevDayId });
    closeModal();
  }

  render() {
    const { visible, title, days } = this.props;
    const { tmpDayId } = this.state;

    return (
      <Modal
        transparent
        visible={visible}
        onRequestClose={this.cancel}
      >
        <TouchableOpacity
          onPress={this.cancel}
          style={STYLE.modalContainer}
        >
          <TouchableWithoutFeedback>
            <View style={STYLE.modalCard}>
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>
                  {title}
                </Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>

                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Select Day:
                    </Text>
                  </View>
                </View>

                <View style={STYLE.rightColumn}>
                  <View style={STYLE.rightItem}>
                    <Picker
                      style={STYLE.picker}
                      selectedValue={tmpDayId}
                      onValueChange={this.updateTmpDay}>
                      {createDayItems(days)}
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={STYLE.footer}>
                <TouchableOpacity onPress={this.cancel}>
                  <Text style={STYLE.selectedTextButton}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.save}>
                  <Text style={STYLE.selectedTextButton}>
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

const createDayItems = (days) => {
  const dayItems = days.map((day, index) => {
    return (
      <Picker.Item key={index} label={day.name} value={day.id} />
    );
  });
  return (dayItems);
};

EditDayModal.propTypes = {
  title: PropTypes.string,
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