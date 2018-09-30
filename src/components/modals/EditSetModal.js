import React, { Component } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import { updateSetData } from '../../redux/actions/activeWorkoutActions';
import { connect } from 'react-redux';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class EditSetModal extends Component {
  state = {
    modalVisible: false,
    tmpWeight: this.props.weight,
    tmpReps: this.props.reps,
    tmpType: this.props.type,
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  updateTmpWeight = (tmpWeight) => {
    if (tmpWeight == null) {
      this.setState({ tmpWeight: this.props.weight });
    } else {
      this.setState({ tmpWeight: parseInt(tmpWeight) });
    }
  }

  updateTmpReps = (tmpReps) => {
    this.setState({ tmpReps: parseInt(tmpReps) });
  }

  updateTmpType = (tmpType) => {
    this.setState({ tmpType });
  }

  save = () => {
    console.log(this.state)
    this.props.updateSetData(
      this.props.setId,
      this.props.exerciseId,
      this.state.tmpWeight,
      this.state.tmpReps,
      this.state.tmpType
    );
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        transparent
        visible={this.props.visible}
        onRequestClose={this.props.closeModal}
      >
        <TouchableOpacity onPress={this.props.closeModal} style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.TRANSPARENTOVERLAY
        }}>
          <TouchableWithoutFeedback>
            <View style={CONTAINERSTYLE.modalCard}>
              <View style={{ flexDirection: 'row' }}><Text style={TEXTSTYLE.modalHeader}>Edit</Text></View>
              <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={TEXTSTYLE.modalText}>
                    Weight:
                    </Text>
                  <View style={{
                    borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 12, marginRight: 40
                  }}><TextInput
                      style={TEXTSTYLE.modalTextInput}
                      keyboardType="numeric"
                      keyboardAppearance="dark"
                      placeholder={String(this.props.weight)}
                      placeholderTextColor={COLORS.INACTIVECOLOR}
                      onChangeText={this.updateTmpWeight}

                      maxLength={4}
                      width={60}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={this.props.closeModal}>
                    <Text style={TEXTSTYLE.selectedTextButton}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.save}>
                    <Text style={TEXTSTYLE.selectedTextButton}>SAVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}

EditSetModal.propTypes = {
  visible: PropTypes.bool,
  exerciseId: PropTypes.number,
  setId: PropTypes.number,
  reps: PropTypes.number,
  weight: PropTypes.number,
  type: PropTypes.string,
  closeModal: PropTypes.func,
  updateSetData: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSetData: (setId, exerciseId, weight, reps, setType) => {
      dispatch(updateSetData(setId, exerciseId, weight, reps, setType));
    }
  };
};

export default connect(null, mapDispatchToProps)(EditSetModal);