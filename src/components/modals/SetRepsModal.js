import React, { Component } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import PropTypes from "prop-types";
import { updateSetReps } from "../../redux/actions/activeWorkoutActions";
import { connect } from "react-redux";

const COLORS = require("../../styles/Colors");
const STYLE = require("./modalStyle");

const MAX_LENGTH = 4;
const TEXT_ENTRY_WIDTH = 60;

class SetRepsModal extends Component {
  state = {
    tmpReps: this.props.reps
  };

  updateTmpReps = tmpReps => {
    if (tmpReps == null) {
      this.setState({ tmpReps: this.props.reps });
    } else {
      this.setState({ tmpReps: parseInt(tmpReps) });
    }
  };

  save = () => {
    const { updateSetReps, setId, closeModal } = this.props;
    const { tmpReps } = this.state;
    updateSetReps(setId, tmpReps);
    closeModal();
  };

  cancel = () => {
    this.props.closeModal();
  };

  render() {
    const { visible, reps } = this.props;
    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={STYLE.modalCard}>
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>AMRAP</Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>
                <View style={STYLE.leftColumn}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Reps:</Text>
                  </View>
                </View>

                <View style={STYLE.rightColumn}>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        placeholder={String(reps)}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpReps}
                        maxLength={MAX_LENGTH}
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

SetRepsModal.propTypes = {
  visible: PropTypes.bool,
  setId: PropTypes.number,
  reps: PropTypes.number,
  closeModal: PropTypes.func,
  updateSetReps: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    updateSetReps: (setId, reps) => {
      dispatch(updateSetReps(setId, reps));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SetRepsModal);
