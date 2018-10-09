import React, { Component } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Picker,
  CheckBox
} from "react-native";
import PropTypes from "prop-types";
import {
  updateSetData,
  removeSet
} from "../../redux/actions/activeWorkoutActions";
import { connect } from "react-redux";

const COLORS = require("../../styles/Colors");
const STYLE = require("./modalStyle");

const MAX_REPS_LENGTH = 4;
const MAX_WEIGHT_LENGTH = 4;
const MAX_TIME_LENGTH = 4;
const TEXT_ENTRY_WIDTH = 60;
const TIME_ENTRY_WIDTH = 30;

class EditSetModal extends Component {
  state = {
    tmpWeight: this.props.weight,
    tmpReps: this.props.reps,
    prevType: this.props.type,
    tmpType: this.props.type,
    tmpMin: this.props.min,
    tmpSec: this.props.sec,
    tmpRemoveSet: false
  };

  componentWillReceiveProps(newProps) {
    if (this.props.reps !== newProps.reps) {
      this.setState({ tmpReps: newProps.reps });
    }
  }

  toggleRemove = checked => {
    this.setState({ tmpRemoveSet: checked });
  };

  updateTmpWeight = tmpWeight => {
    if (tmpWeight == null) {
      this.setState({ tmpWeight: this.props.weight });
    } else {
      this.setState({ tmpWeight: parseInt(tmpWeight) });
    }
  };

  updateTmpReps = tmpReps => {
    if (tmpReps == null) {
      this.setState({ tmpReps: this.props.reps });
    } else {
      this.setState({ tmpReps: parseInt(tmpReps) });
    }
  };

  updateTmpType = type => {
    this.setState({ tmpType: type });
  };

  updateTmpMin = min => {
    if (min == null) {
      this.setState({ tmpMin: this.props.min });
    } else {
      this.setState({ tmpMin: parseInt(min) });
    }
  };

  updateTmpSec = sec => {
    if (sec == null) {
      this.setState({ tmpSec: this.props.sec });
    } else {
      this.setState({ tmpSec: parseInt(sec) });
    }
  };

  save = () => {
    const {
      updateSetData,
      setId,
      closeModal,
      exerciseId,
      removeSet
    } = this.props;
    const {
      tmpWeight,
      tmpReps,
      tmpType,
      tmpMin,
      tmpSec,
      tmpRemoveSet
    } = this.state;
    this.setState({ prevType: this.state.tmpType });

    if (tmpRemoveSet) {
      removeSet(setId, exerciseId);
    } else {
      updateSetData(setId, tmpWeight, tmpReps, tmpType, tmpMin, tmpSec);
    }

    this.setState({ tmpRemoveSet: false });
    closeModal();
  };

  cancel = () => {
    this.setState({ tmpType: this.state.prevType });
    this.props.closeModal();
  };

  render() {
    const { visible, weight, reps, min, sec, types } = this.props;
    const { tmpType, tmpRemoveSet } = this.state;

    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={STYLE.modalCard}>
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>Set</Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>
                <View style={[STYLE.leftColumn, { paddingLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Weight:</Text>
                  </View>

                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Reps:</Text>
                  </View>

                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Rest Time:</Text>
                  </View>

                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Type:</Text>
                  </View>

                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Remove Set:</Text>
                  </View>
                </View>

                <View style={STYLE.rightColumn}>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        placeholder={String(weight)}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpWeight}
                        maxLength={MAX_WEIGHT_LENGTH}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>

                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        placeholder={String(reps)}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpReps}
                        maxLength={MAX_REPS_LENGTH}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>

                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        placeholder={String(min).padStart(2, "0")}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpMin}
                        maxLength={MAX_TIME_LENGTH}
                        width={TIME_ENTRY_WIDTH}
                      />
                    </View>
                    <Text style={STYLE.timeColon}>:</Text>
                    <View style={STYLE.secInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        placeholder={String(sec).padStart(2, "0")}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpSec}
                        maxLength={MAX_TIME_LENGTH}
                        width={TIME_ENTRY_WIDTH}
                      />
                    </View>
                  </View>

                  <View style={STYLE.rightItem}>
                    <Picker
                      style={STYLE.picker}
                      selectedValue={tmpType}
                      onValueChange={this.updateTmpType}
                    >
                      {createTypeItems(types)}
                    </Picker>
                  </View>

                  <View style={[STYLE.rightItem, { paddingLeft: 22 }]}>
                    <CheckBox
                      value={tmpRemoveSet}
                      onValueChange={this.toggleRemove}
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

const createTypeItems = types => {
  return types.map((type, index) => {
    return <Picker.Item key={index} label={type.name} value={type.id} />;
  });
};

EditSetModal.propTypes = {
  visible: PropTypes.bool,
  setId: PropTypes.number,
  exerciseId: PropTypes.number,
  reps: PropTypes.number,
  weight: PropTypes.number,
  type: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.object),
  min: PropTypes.number,
  sec: PropTypes.number,
  closeModal: PropTypes.func,
  updateSetData: PropTypes.func,
  removeSet: PropTypes.func,
  currentSets: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => {
  return {
    types: state.workoutData.setTypes,
    currentSets:
      state.workoutData.programs[state.workoutData.activeWorkout.program].sets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSetData: (setId, weight, reps, setType, min, sec) => {
      dispatch(updateSetData(setId, weight, reps, setType, min, sec));
    },
    removeSet: (setId, exerciseId, currentSets) => {
      dispatch(removeSet(setId, exerciseId, currentSets));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSetModal);
