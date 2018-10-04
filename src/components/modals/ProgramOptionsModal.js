import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  CheckBox,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const STYLE = require('./modalStyle');
const COLORS = require('../../styles/Colors');

const TEXT_ENTRY_WIDTH = 160;
const CUSTOM_CATEGORY = 0;

class ProgramOptionsModal extends Component {
  state = {
    tmpCurrentProgram: this.props.isCurrentProgram,
    tmpDelete: false
  }

  cancel = () => {
    this.props.closeModal();
  }

  toggleCurrentProgram = (checked) => {
    this.setState({
      tmpCurrentProgram: checked
    });
  }

  rename = (newName) => {

  }

  copy = (copyName) => {

  }

  toggleDelete = (checked) => {
    this.setState({
      tmpDelete: checked
    });
  }

  render() {
    const { visible, title, category } = this.props;
    const editable = (category === CUSTOM_CATEGORY);
    console.log(editable)
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
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>
                  {title}
                </Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>

                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Current Program:
                    </Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Rename:
                    </Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Copy:
                    </Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Delete:
                    </Text>
                  </View>
                </View>



                <View style={[STYLE.rightColumn, { alignItems: 'center', paddingRight: 6 }]}>
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      value={this.state.tmpCurrentProgram}
                      onValueChange={this.toggleCurrentProgram}
                    />
                  </View>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        editable={editable}
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        placeholder={title}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.rename}
                        maxLength={30}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        placeholder={"Copy Name"}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.copy}
                        maxLength={30}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      disabled={!editable}
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

ProgramOptionsModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  isCurrentProgram: PropTypes.bool,
  programId: PropTypes.number,
  category: PropTypes.number,
  closeModal: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    isCurrentProgram:
      state.workoutData.activeWorkout.program === ownProps.programId
  };
};

export default connect(mapStateToProps)(ProgramOptionsModal);