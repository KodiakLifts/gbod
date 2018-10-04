import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  CheckBox
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const STYLE = require('./modalStyle');

class ProgramOptionsModal extends Component {
  state = {
    tmpCurrentProgram: this.props.isCurrentProgram
  }

  cancel = () => {
    this.props.closeModal();
  }

  toggleCurrentProgram = (checked) => {
    this.setState({
      tmpCurrentProgram: checked
    });
  }

  render() {
    const { visible, title } = this.props;
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
                      Make Current Program:
                    </Text>
                  </View>
                </View>

                <View style={STYLE.rightColumn}>
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      value={this.state.tmpCurrentProgram}
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

ProgramOptionsModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  isCurrentProgram: PropTypes.bool,
  programId: PropTypes.number,
  closeModal: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    isCurrentProgram:
      state.workoutData.activeWorkout.program === ownProps.programId
  };
};

export default connect(mapStateToProps)(ProgramOptionsModal);