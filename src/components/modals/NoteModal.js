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

  exit = () => {
    const { updateActiveNotes, closeModal } = this.props;
    updateActiveNotes(this.state.noteText);
    closeModal();
  };

  render() {
    const { visible } = this.props;
    return (
      <View>
        <Modal transparent visible={visible} onRequestClose={this.exit}>
          <TouchableOpacity onPress={this.exit} style={STYLE.modalContainer}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: COLORS.PRIMARYCOLOR,
                  padding: 12,
                  borderRadius: 5,
                  height: 350,
                  width: 350,
                  flexDirection: "column"
                }}
              >
                <Text style={STYLE.modalHeaderText}>Notes</Text>
                <TextInput
                  multiline
                  maxLength={351}
                  placeholder={"My workout notes..."}
                  placeholderTextColor={COLORS.INACTIVECOLOR}
                  onChangeText={this.editText}
                  value={this.state.noteText}
                  style={STYLE.noteText}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
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
    notes: state.workoutData.activeWorkout.notes
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
