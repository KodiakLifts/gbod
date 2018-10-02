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
      typeName: "",
      tmpWeight: props.weight,
      tmpReps: props.reps,
      tmpType: props.type,
      tmpMin: props.min,
      tmpSec: props.sec
    };
  }

  componentDidMount() {
    this.mountTypeName(this.props.type);
  }

  mountTypeName = (type) => {
    let name;
    switch (type) {
      case "W": name = "Warmup"; break;
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
      case "Warmup": type = "W"; break;
      case "Normal": type = "N"; break;
      case "Failure": type = "F"; break;
      case "Drop": type = "D"; break;
      default: type = "N"; break;
    }
    this.setState({ typeName: name });
    this.setState({ tmpType: type });
  }

  updateTmpMin = (min) => {

    if (min == null) {
      this.setState({ tmpMin: this.props.min });
    } else {
      this.setState({ tmpMin: parseInt(min) });
    }

  }

  updateTmpSec = (sec) => {
    if (sec == null) {
      this.setState({ tmpSec: this.props.sec });
    } else {
      this.setState({ tmpSec: parseInt(sec) });
    }

  }

  save = () => {
    this.props.updateSetData(
      this.props.setId,
      this.state.tmpWeight,
      this.state.tmpReps,
      this.state.tmpType,
      this.state.tmpMin,
      this.state.tmpSec
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
              <View style={{ flexDirection: 'row' }}>
                <Text style={TEXTSTYLE.modalHeader}>
                  Edit Set
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 25 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={TEXTSTYLE.modalText}>
                      Weight:
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={TEXTSTYLE.modalText}>
                      Reps:
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={TEXTSTYLE.modalText}>
                      Rest Time:
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={TEXTSTYLE.modalText}>
                      Type:
                    </Text>
                  </View>

                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                    <View style={{
                      borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 6
                    }}>
                      <TextInput
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

                  <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
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

                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{
                      borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 6
                    }}><TextInput
                        style={TEXTSTYLE.modalTextInput}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        placeholder={String(this.props.min).padStart(2, '0')}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpMin}
                        maxLength={2}
                        width={30}
                      />
                    </View>
                    <Text style={[TEXTSTYLE.modalText, { color: COLORS.INACTIVECOLOR, fontWeight: 'bold', paddingTop: 12 }]}>:</Text>
                    <View style={{
                      borderBottomColor: 'black', borderBottomWidth: 1,
                    }}><TextInput
                        style={TEXTSTYLE.modalTextInput}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        placeholder={String(this.props.sec).padStart(2, '0')}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpSec}
                        maxLength={2}
                        width={30}
                      />
                    </View>
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Picker
                      style={{ color: COLORS.SECONDARYCOLOR, width: 100, height: 30, marginLeft: 5, marginBottom: 10 }}
                      selectedValue={this.state.typeName}
                      onValueChange={this.updateTmpType}>
                      <Picker.Item label="Warmup" value="Warmup" />
                      <Picker.Item label="Normal" value="Normal" />
                      <Picker.Item label="Failure" value="Failure" />
                      <Picker.Item label="Drop" value="Drop" />
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={this.props.closeModal}>
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

EditSetModal.propTypes = {
  visible: PropTypes.bool,
  setId: PropTypes.number,
  reps: PropTypes.number,
  weight: PropTypes.number,
  type: PropTypes.string,
  min: PropTypes.number,
  sec: PropTypes.number,
  closeModal: PropTypes.func,
  updateSetData: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSetData: (setId, weight, reps, setType, min, sec) => {
      dispatch(updateSetData(setId, weight, reps, setType, min, sec));
    }
  };
};

export default connect(null, mapDispatchToProps)(EditSetModal);