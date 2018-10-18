import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import { addDay } from "../../redux/actions/activeWorkoutActions";
import { connect } from "react-redux";

const STYLE = require("./modalStyle");
const COLORS = require("../../styles/Colors");

const TEXT_ENTRY_WIDTH = 70;

class NewDayModal extends Component {
  state = {
    prevDayId: this.props.currentDay,
    placeHolder: "Day " + this.props.days.length,
    tmpName: "Day " + this.props.days.length
  };

  updateTmpName = tmpName => {
    if (tmpName == null) {
      this.setState({ tmpName: this.props.days[this.state.currentDay].name });
    } else {
      this.setState({ tmpName: tmpName });
    }
  };

  save = () => {
    const { closeModal, addDay } = this.props;
    const { tmpName } = this.state;
    addDay(tmpName);
    closeModal();
  };

  cancel = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  render() {
    const { visible } = this.props;
    const { placeHolder } = this.state;
    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={STYLE.modalCard}>
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>New Day</Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>
                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Name:</Text>
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
                        maxLength={10}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
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

NewDayModal.propTypes = {
  visible: PropTypes.bool,
  currentDay: PropTypes.number,
  days: PropTypes.arrayOf(PropTypes.object),
  closeModal: PropTypes.func,
  name: PropTypes.string,
  addDay: PropTypes.func
};

const mapStateToProps = state => {
  return {
    days:
      state.workoutData.programs[state.workoutData.activeWorkout.program].days
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDay: name => {
      dispatch(addDay(name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDayModal);
