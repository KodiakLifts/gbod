import React, { Component } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  TextInput
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateActiveNotes } from "../../redux/actions/activeWorkoutActions";
import { getCurrentNotes } from "../../redux/selectors/activeWorkoutSelectors";

const STYLE = require("./modalStyle");
const COLORS = require("../../styles/Colors");

class NoteModal extends Component {
  state = {
    noteText: this.props.notes
  };

  componentWillReceiveProps(newProps) {
    if (newProps.notes !== this.state.noteText) {
      this.setState({ noteText: newProps.notes });
    }
  }

  editText = text => {
    this.setState({ noteText: text });
  };

  cancel = () => {
    this.props.closeModal();
  };

  save = () => {
    const { updateActiveNotes, closeModal } = this.props;
    updateActiveNotes(this.state.noteText);
    closeModal();
  };

  render() {
    const { visible } = this.props;
    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: COLORS.PRIMARYCOLOR,
                paddingHorizontal: 12,
                paddingTop: 12,
                borderRadius: 5,
                width: 350,
                flexDirection: "column"
              }}
            >
              <Text style={STYLE.modalHeaderText}>Notes</Text>
              <View style={{ height: 225 }}>
                <TextInput
                  multiline
                  maxLength={265}
                  placeholder={"My workout notes..."}
                  placeholderTextColor={COLORS.INACTIVECOLOR}
                  onChangeText={this.editText}
                  value={this.state.noteText}
                  style={STYLE.noteText}
                />
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

NoteModal.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  notes: PropTypes.string,
  updateActiveNotes: PropTypes.func
};

const mapStateToProps = state => {
  return {
    notes: getCurrentNotes(state.workoutData)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveNotes: notes => {
      dispatch(updateActiveNotes(notes));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteModal);
