import React, { Component } from 'react';
import { Modal, Text, CheckBox, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Picker } from 'react-native';
import PropTypes from 'prop-types';
import { updateExerciseData } from '../../redux/actions/activeWorkoutActions';
import { connect } from 'react-redux';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class EditExerciseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tmpSupersetNext: props.supersetNext
    };

    this.supersetNextToggle = (val) =>
      props.updateExerciseData(
        props.exerciseId,
        val
      );
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
              <View style={{ flexDirection: 'row' }}>
                <Text style={TEXTSTYLE.modalHeader}>
                  Edit Exercise
                </Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={TEXTSTYLE.modalText}>
                    Superset:
                  </Text>
                  <CheckBox
                    value={this.props.supersetNext}
                    onValueChange={this.supersetNextToggle}
                  />
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

EditExerciseModal.propTypes = {
  visible: PropTypes.bool,
  exerciseId: PropTypes.number,
  supersetNext: PropTypes.bool,
  closeModal: PropTypes.func,
  updateExerciseData: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateExerciseData: (exerciseId, supersetNext) => {
      dispatch(updateExerciseData(exerciseId, supersetNext));
    }
  };
};

export default connect(null, mapDispatchToProps)(EditExerciseModal);