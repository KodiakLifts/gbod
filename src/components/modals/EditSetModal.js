import React, { Component } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Picker } from 'react-native';
import PropTypes from 'prop-types';
import { updateSetData } from '../../redux/actions/activeWorkoutActions';
import { connect } from 'react-redux';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class EditSetModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      typeName: "",
      tmpWeight: props.weight,
      tmpReps: props.reps,
      tmpType: props.type,
    };
  }

  componentDidMount() {
    this.mountTypeName(this.props.type);
  }

  mountTypeName = (type) => {
    let name;
    switch (type) {
      case "N": name = "Normal"; break;
      case "F": name = "Failure"; break;
      case "D": name = "Drop"; break;
      default: name = ""; break;
    }
    this.setState({ typeName: name });
  }

  updateTmpWeight = (tmpWeight) => {
    if (tmpWeight == null) {
      this.setState({ tmpWeight: this.props.weight });
    } else {
      this.setState({ tmpWeight: parseInt(tmpWeight) });
    }
  }

  updateTmpReps = (tmpReps) => {
    if (tmpReps == null) {
      this.setState({ tmpReps: this.props.reps });
    } else {
      this.setState({ tmpReps: parseInt(tmpReps) });
    }
  }

  updateTmpType = (name) => {
    let type;
    switch (name) {
      case "Normal": type = "N"; break;
      case "Failure": type = "F"; break;
      case "Drop": type = "D"; break;
      default: type = "N"; break;
    }
    this.setState({ typeName: name });
    this.setState({ tmpType: type });
  }

  save = () => {
    this.props.updateSetData(
      this.props.setId,
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
              <View style={{ flexDirection: 'row' }}><Text style={TEXTSTYLE.modalHeader}>Edit Set</Text></View>
              <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={TEXTSTYLE.modalText}>
                    Weight:
                    </Text>
                  <View style={{
                    borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 12, marginRight: 40, marginLeft: 6
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
                <View style={{ flexDirection: 'row' }}>
                  <Text style={TEXTSTYLE.modalText}>
                    Reps:
                    </Text>
                  <View style={{
                    borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 12, marginRight: 40, marginLeft: 6
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
                <View style={{ flexDirection: 'row' }}>
                  <Text style={TEXTSTYLE.modalText}>
                    Type:
                  </Text>

                  <Picker
                    style={{ color: COLORS.SECONDARYCOLOR, width: 100, height: 20, marginLeft: 5 }}
                    selectedValue={this.state.typeName}
                    onValueChange={this.updateTmpType}>
                    <Picker.Item label="Normal" value="Normal" />
                    <Picker.Item label="Failure" value="Failure" />
                    <Picker.Item label="Drop" value="Drop" />
                  </Picker>

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
  setId: PropTypes.number,
  reps: PropTypes.number,
  weight: PropTypes.number,
  type: PropTypes.string,
  closeModal: PropTypes.func,
  updateSetData: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSetData: (setId, weight, reps, setType) => {
      dispatch(updateSetData(setId, weight, reps, setType));
    }
  };
};

export default connect(null, mapDispatchToProps)(EditSetModal);