import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Picker,
  TextInput,
  CheckBox
} from 'react-native';
import PropTypes from 'prop-types';
import { updateDayData } from '../../redux/actions/activeWorkoutActions';
import { connect } from 'react-redux';

const STYLE = require('./modalStyle');
const COLORS = require('../../styles/Colors');

const TEXT_ENTRY_WIDTH = 70;

class EditDayModal extends Component {
  state = {
    prevDayId: this.props.currentDay,
    tmpDayId: this.props.currentDay,
    tmpName: this.props.days[this.props.currentDay].name,
    tmpDelete: false
  }

  updateTmpName = (tmpName) => {
    if (tmpName == null) {
      this.setState({ tmpName: this.props.days[this.state.tmpDayId].name });
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
      tmpName: this.props.days[dayId].name
    });
  }

  save = () => {
    const { updateDayData, closeModal } = this.props;
    const { tmpDayId, tmpName } = this.state;

    this.setState({ prevDayId: tmpDayId });
    updateDayData(
      tmpDayId,
      tmpName
    );
    closeModal();
  }

  cancel = () => {
    const { closeModal, days, currentDay } = this.props;
    const { prevDayId } = this.state;

    this.setState({ tmpDayId: prevDayId });
    this.setState({ tmpName: days[currentDay].name });
    closeModal();
  }

  render() {
    const { visible, title, days } = this.props;
    const { tmpDayId, tmpName } = this.state;

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
                      Delete:
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
                        placeholder={tmpName}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpName}
                        maxLength={30}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>

                  <View style={[STYLE.rightItem, { paddingLeft: 26 }]}>
                    <CheckBox
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
  name: PropTypes.string
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
    updateDayData: (dayId) => {
      dispatch(updateDayData(dayId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDayModal);