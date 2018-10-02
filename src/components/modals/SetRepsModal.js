import React, { Component } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Picker, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { updateSetReps } from '../../redux/actions/activeWorkoutActions';
import { connect } from 'react-redux';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class SetRepsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tmpReps: props.reps,
    };
  }

  updateTmpReps = (tmpReps) => {
    if (tmpReps == null) {
      this.setState({ tmpReps: this.props.reps });
    } else {
      this.setState({ tmpReps: parseInt(tmpReps) });
    }
  }

  save = () => {
    this.props.updateSetReps(
      this.props.setId,
      this.state.tmpReps,
    );
    this.props.closeModal();
  }

  cancel = () => {
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        transparent
        visible={this.props.visible}
        onRequestClose={this.cancel}
      >
        <TouchableOpacity onPress={this.cancel} style={{
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
                  AMRAP
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <View style={styles.leftColumn}>
                  <View style={styles.leftItem}>
                    <Text style={TEXTSTYLE.modalText}>
                      Reps:
                    </Text>
                  </View>
                </View>

                <View style={styles.rightColumn}>
                  <View style={styles.rightItem}>
                    <View style={{
                      borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 6
                    }}><TextInput
                        style={TEXTSTYLE.modalTextInput}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        placeholder={String(this.props.reps)}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpReps}
                        maxLength={4}
                        width={60}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity onPress={this.cancel}>
                  <Text style={TEXTSTYLE.selectedTextButton}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.save}>
                  <Text style={TEXTSTYLE.selectedTextButton}>
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

SetRepsModal.propTypes = {
  visible: PropTypes.bool,
  setId: PropTypes.number,
  reps: PropTypes.number,
  closeModal: PropTypes.func,
  updateSetReps: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSetReps: (setId, reps) => {
      dispatch(updateSetReps(setId, reps));
    }
  };
};

const styles = StyleSheet.create({
  leftColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  leftItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 35
  },
  rightColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10
  },
  rightItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 35
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default connect(null, mapDispatchToProps)(SetRepsModal);