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

class ExerciseOptionsModal extends Component {
  state = {

  }

  cancel = () => {
    this.props.closeModal();
  }

  render() {
    const { visible, title } = this.props;
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

                </View>



                <View style={
                  [STYLE.rightColumn, { alignItems: 'center', paddingRight: 6 }]}>
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      value={tmpCurrentProgram}
                      onValueChange={this.toggleCurrentProgram}
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

ExerciseOptionsModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
};