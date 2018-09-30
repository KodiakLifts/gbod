import React, { Component } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class EditSetModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      updateWeight: null,
      updateReps: null,
      updateType: null
    };
  }

  componentDidMount() {
    this.updateLocalSetOptions;
  }

  updateLocalSetOptions = () => {
    this.setState({
      updateWeight: this.props.weight,
      updateReps: this.props.reps,
      updateType: this.props.type
    });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
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
                      onChangeText={this.onWeightChange}
                      clearTextOnFocus
                      maxLength={4}
                      width={60}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={this.props.closeModal}>
                    <Text style={TEXTSTYLE.selectedTextButton}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.props.closeModal}>
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

}

export default EditSetModal;