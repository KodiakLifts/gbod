import React, { Component } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Picker } from 'react-native';
import PropTypes from 'prop-types';
import { updateSetData } from '../../redux/actions/activeWorkoutActions';
import { connect } from 'react-redux';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class EditExerciseModal extends Component {
  constructor(props) {
    super(props);
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
              <View style={{ flexDirection: 'row' }}><Text style={TEXTSTYLE.modalHeader}>Edit Set</Text></View>
              <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={TEXTSTYLE.modalText}>
                    OPTIONS
                    </Text>
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
  closeModal: PropTypes.func,
};

export default EditExerciseModal;