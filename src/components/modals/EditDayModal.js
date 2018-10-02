import React, { Component } from 'react';
import { Modal, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, Picker } from 'react-native';
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
      tmpDayId: props.currentDay
    };
  }

  createDayItems = (days) => {
    const dayItems = days.map((day, index) => {
      return (
        <Picker.Item key={index} label={day.name} value={day.id} />
      );
    });
    return (dayItems);
  }

  updateTmpDay = (dayId) => {
    this.setState({ tmpDayId: dayId });
  }

  save = () => {
    this.setState({ prevDayId: this.state.tmpDayId });
    this.props.updateDayData(
      this.state.tmpDayId
    );
    this.props.closeModal();
  }

  cancel = () => {
    this.setState({ tmpDayId: this.state.prevDayId });
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        transparent
        visible={this.props.visible}
        onRequestClose={this.cancel}
      >
        <TouchableOpacity onPress={this.cancel} style={{
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
                  Day
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <View style={styles.leftColumn}>
                  <View style={styles.leftItem}>
                    <Text style={TEXTSTYLE.modalText}>
                      Select Day:
                    </Text>
                  </View>
                </View>

                <View style={styles.rightColumn}>
                  <View style={styles.rightItem}>
                    <Picker
                      style={{ color: COLORS.SECONDARYCOLOR, width: 100 }}
                      selectedValue={this.state.tmpDayId}
                      onValueChange={this.updateTmpDay}>
                      {this.createDayItems(this.props.days)}
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
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

const styles = StyleSheet.create({
  leftColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 6
  },
  leftItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 35
  },
  rightColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10
  },
  rightItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 35
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDayModal);