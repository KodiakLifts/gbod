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
import {
  updateProgramData,
  deleteProgram
} from '../../redux/actions/programsActions';

const STYLE = require('./modalStyle');
const COLORS = require('../../styles/Colors');

const TEXT_ENTRY_WIDTH = 160;

class ProgramOptionsModal extends Component {
  state = {
    tmpCurrentProgram: this.props.isCurrentProgram,
    tmpName: this.props.title,
    tmpDelete: false
  }

  componentWillReceiveProps(newProps) {
    if (this.props.isCurrentProgram !== newProps.isCurrentProgram) {
      this.setState({ tmpCurrentProgram: newProps.isCurrentProgram });
    }
  }

  updateTmpName = (tmpName) => {
    if (tmpName == null) {
      this.setState({ tmpName: this.props.title });
    } else {
      this.setState({ tmpName: tmpName });
    }
  }

  cancel = () => {
    this.props.closeModal();
  }

  toggleCurrentProgram = (checked) => {
    this.setState({
      tmpCurrentProgram: checked
    });
  }

  toggleDelete = (checked) => {
    this.setState({
      tmpDelete: checked
    });
  }

  save = () => {
    const {
      updateProgramData,
      deleteProgram,
      programId,
      closeModal
    } = this.props;
    const { tmpCurrentProgram, tmpName, tmpDelete } = this.state;

    if (tmpDelete) {
      deleteProgram(programId);
    } else {
      updateProgramData(
        programId,
        tmpCurrentProgram,
        tmpName
      );
    }
    closeModal();
  }

  render() {
    const { visible, title, isCurrentProgram } = this.props;
    const { tmpCurrentProgram, tmpDelete } = this.state;
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



                <View style={
                  [STYLE.rightColumn, { alignItems: 'center', paddingRight: 6 }]}>
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      disabled={isCurrentProgram}
                      value={tmpCurrentProgram}
                      onValueChange={this.toggleCurrentProgram}
                    />
                  </View>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        placeholder={title}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpName}
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
                      value={tmpDelete}
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
  closeModal: PropTypes.func,
  updateProgramData: PropTypes.func,
  deleteProgram: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    isCurrentProgram:
      state.workoutData.activeWorkout.program === ownProps.programId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProgramData: (programId, current, name) => {
      dispatch(updateProgramData(programId, current, name));
    },
    deleteProgram: (programId) => {
      dispatch(deleteProgram(programId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgramOptionsModal);