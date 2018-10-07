import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Picker,
  TextInput,
  CheckBox,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import {
  updateDayData,
  deleteDay
} from '../../redux/actions/activeWorkoutActions';
import { connect } from 'react-redux';

const STYLE = require('./modalStyle');
const COLORS = require('../../styles/Colors');

const TEXT_ENTRY_WIDTH = 70;

class EditDayModal extends Component {
  state = {
    prevDayId: this.props.currentDay,
    tmpDayId: this.props.currentDay,
    placeHolder: this.props.days[this.props.currentDay].name,
    tmpName: this.props.days[this.props.currentDay].name,
    tmpDelete: false
  }

  componentWillReceiveProps(newProps) {
    if (this.state.placeHolder !== newProps.days[newProps.currentDay].name) {
      this.setState({ placeHolder: newProps.days[newProps.currentDay].name });
    }
    if (this.state.tmpDayId !== newProps.currentDay) {
      this.setState({ tmpDayId: newProps.currentDay });
    }
  }

  updateTmpName = (tmpName) => {
    if (tmpName == null) {
      this.setState({ tmpName: this.props.days[this.state.currentDay].name });
    } else {
      this.setState({ tmpName: tmpName });
    }
  }

  toggleDelete = (checked) => {
    this.setState({
      tmpDelete: checked
    });
  }

  updateTmpDay = (dayId) => {
    this.setState({
      tmpDayId: dayId,
      tmpName: this.props.days[dayId].name,
      placeHolder: this.props.days[dayId].name
    });
  }

  save = () => {
    const { updateDayData, closeModal } = this.props;
    const { tmpDayId, tmpName, tmpDelete } = this.state;

    this.setState({ prevDayId: tmpDayId });
    if (tmpDelete) {
      Alert.alert(
        'Delete Exercise',
        'Are you sure you want to delete '
        + tmpName + " from the exercise library?",
        [
          {
            text: 'CONFIRM', onPress: () => updateDayData(
              tmpDayId,
              tmpName,
              tmpDelete
            )
          },
          {
            text: 'CANCEL', onPress: () => this.setState({ tmpDelete: false }), style: 'cancel'
          }
        ],
        { cancelable: false }
      );
    } else {
      updateDayData(
        tmpDayId,
        tmpName,
        tmpDelete
      );
    }

    this.setState({ tmpDelete: false });
    closeModal();
  }

  cancel = () => {
    const { closeModal, days, currentDay } = this.props;
    const { prevDayId } = this.state;

    this.setState({
      tmpDayId: prevDayId,
      tmpName: days[currentDay].name,
      tmpDelete: false
    });
    closeModal();
  }

  render() {
    const { visible, title, days } = this.props;
    const { tmpDayId, placeHolder } = this.state;
    const deleteDisable = days.length === 1;
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
              <View style={[STYLE.modalHeader, { marginBottom: 20 }]}>
                {title}
              </View>
              <View style={STYLE.cardColumnsContainer}>

                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Select Day:
                    </Text>
                  </View>

                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Rename:
                    </Text>
                  </View>

                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Delete Day:
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

                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        placeholder={placeHolder}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpName}
                        maxLength={20}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>

                  <View style={[STYLE.rightItem, { paddingLeft: 26 }]}>
                    <CheckBox
                      disabled={deleteDisable}
                      value={this.state.tmpDelete}
                      onValueChange={this.toggleDelete}
                    />
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
  title: PropTypes.object,
  visible: PropTypes.bool,
  currentDay: PropTypes.number,
  days: PropTypes.arrayOf(PropTypes.object),
  closeModal: PropTypes.func,
  updateDayData: PropTypes.func,
  name: PropTypes.string,
  deleteDay: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    days:
      state
        .workoutData
        .programs[state.workoutData.activeWorkout.program]
        .days,
    currentDay: state.workoutData.activeWorkout.day,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDayData: (dayId, name, remove) => {
      dispatch(updateDayData(dayId, name, remove));
    },
    deleteDay: (dayId) => {
      dispatch(deleteDay(dayId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDayModal);