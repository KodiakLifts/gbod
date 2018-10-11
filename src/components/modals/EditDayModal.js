import React, { Component } from "react";
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
} from "react-native";
import PropTypes from "prop-types";
import {
  updateDayData,
  deleteDay
} from "../../redux/actions/activeWorkoutActions";
import { connect } from "react-redux";

const STYLE = require("./modalStyle");
const COLORS = require("../../styles/Colors");

const TEXT_ENTRY_WIDTH = 70;

class EditDayModal extends Component {
  state = {
    prevDayId: this.props.currentDay,
    currentDay: this.props.currentDay,
    placeHolder: this.props.days[this.props.currentDay].name,
    tmpName: this.props.days[this.props.currentDay].name,
    tmpDelete: false
  };

  componentWillReceiveProps(newProps) {
    if (this.state.placeHolder !== newProps.days[newProps.currentDay].name) {
      this.setState({ placeHolder: newProps.days[newProps.currentDay].name });
    }
  }

  updateTmpName = tmpName => {
    if (tmpName == null) {
      this.setState({ tmpName: this.props.days[this.state.currentDay].name });
    } else {
      this.setState({ tmpName: tmpName });
    }
  };

  toggleDelete = checked => {
    this.setState({
      tmpDelete: checked
    });
  };

  save = () => {
    const { updateDayData, closeModal, currentDay } = this.props;
    const { tmpName, tmpDelete } = this.state;

    this.setState({ prevDayId: currentDay });
    if (tmpDelete) {
      Alert.alert(
        "Delete Day",
        "Are you sure you want to delete day " +
          tmpName +
          " from this program?",
        [
          {
            text: "CONFIRM",
            onPress: () => updateDayData(currentDay, tmpName, tmpDelete)
          },
          {
            text: "CANCEL",
            onPress: () => this.setState({ tmpDelete: false }),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else {
      updateDayData(currentDay, tmpName, tmpDelete);
    }

    this.setState({ tmpDelete: false });
    closeModal();
  };

  cancel = () => {
    const { closeModal, days, currentDay } = this.props;
    const { prevDayId } = this.state;

    this.setState({
      tmpDayId: prevDayId,
      tmpName: days[currentDay].name,
      tmpDelete: false
    });
    closeModal();
  };

  render() {
    const { visible, days } = this.props;
    const { placeHolder } = this.state;
    const deleteDisable = days.length === 1;
    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={STYLE.modalCard}>
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>Day Options</Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>
                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Rename:</Text>
                  </View>

                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Delete Day:</Text>
                  </View>
                </View>

                <View style={STYLE.rightColumn}>
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
                  <Text style={STYLE.selectedTextButton}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.save}>
                  <Text style={STYLE.selectedTextButton}>SAVE</Text>
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
  name: PropTypes.string,
  deleteDay: PropTypes.func
};

const mapStateToProps = state => {
  return {
    days:
      state.workoutData.programs[state.workoutData.activeWorkout.program].days,
    currentDay: state.workoutData.activeWorkout.day
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDayData: (dayId, name, remove) => {
      dispatch(updateDayData(dayId, name, remove));
    },
    deleteDay: dayId => {
      dispatch(deleteDay(dayId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDayModal);
