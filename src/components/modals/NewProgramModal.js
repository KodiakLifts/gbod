import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  CheckBox,
  TextInput,
  Picker
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newProgram } from "../../redux/actions/programsActions";

const STYLE = require("./modalStyle");
const COLORS = require("../../styles/Colors");

const TEXT_ENTRY_WIDTH = 160;
const PICKER_WIDTH = 160;

let index;
let title;

class NewProgramModal extends Component {
  state = {
    tmpCurrentProgram: true,
    tmpName: title,
    tmpTemplate: 0
  };

  index = this.props.programs.length;
  title = "New Program " + index;

  updateTmpName = tmpName => {
    if (tmpName == null) {
      this.setState({ tmpName: title });
    } else {
      this.setState({ tmpName: tmpName });
    }
  };

  updateTmpTemplate = program => {
    this.setState({ tmpTemplate: program });
  };

  cancel = () => {
    this.props.closeModal();
  };

  toggleCurrentProgram = checked => {
    this.setState({
      tmpCurrentProgram: checked
    });
  };

  save = () => {
    const { closeModal, newProgram } = this.props;
    const { tmpCurrentProgram, tmpName, tmpTemplate } = this.state;

    newProgram(tmpCurrentProgram, tmpName, tmpTemplate);

    closeModal();
  };

  render() {
    const { visible, programs } = this.props;
    const { tmpCurrentProgram, tmpTemplate } = this.state;
    const index = programs.length;
    const title = "New Program ";
    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={STYLE.modalCard}>
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>{title}</Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>
                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Current Program:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Name:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Template:</Text>
                  </View>
                </View>

                <View
                  style={[
                    STYLE.rightColumn,
                    { alignItems: "center", paddingRight: 6 }
                  ]}
                >
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      value={tmpCurrentProgram}
                      onValueChange={this.toggleCurrentProgram}
                    />
                  </View>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        placeholder={title + index}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpName}
                        maxLength={30}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>
                  <View style={STYLE.rightItem}>
                    <Picker
                      style={[STYLE.picker, { width: PICKER_WIDTH }]}
                      selectedValue={tmpTemplate}
                      onValueChange={this.updateTmpTemplate}
                    >
                      {createItems(programs)}
                    </Picker>
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

const createItems = items => {
  return items.map((item, index) => {
    return <Picker.Item key={index} label={item.name} value={item.id} />;
  });
};

NewProgramModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  category: PropTypes.number,
  closeModal: PropTypes.func,
  programs: PropTypes.arrayOf(PropTypes.object),
  newProgram: PropTypes.func
};

const mapStateToProps = state => {
  return {
    programs: state.workoutData.programs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newProgram: (programId, current, name) => {
      dispatch(newProgram(programId, current, name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProgramModal);
