import React, { Component } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Picker, StyleSheet } from 'react-native';
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
      tmpWeight: props.weight,
      tmpReps: props.reps,
      prevType: props.type,
      tmpType: props.type,
      tmpMin: props.min,
      tmpSec: props.sec
    };
  }

  componentDidMount() {
    this.mountTypeName(this.props.type, this.props.types);
  }

  createTypeItems = (types) => {
    const typeItems = types.map((type, index) => {
      return (
        <Picker.Item key={index} label={type.name} value={type.id} />
      );
    });
    return (typeItems);
  }

  mountTypeName = (type, types) => {
    this.setState({ typeName: types[type].name });
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

  updateTmpType = (type) => {
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
    this.setState({ prevType: this.state.tmpType });
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

  cancel = () => {
    this.setState({ tmpType: this.state.prevType });
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
                  Edit Set
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <View style={styles.leftColumn}>
                  <View style={styles.leftItem}>
                    <Text style={TEXTSTYLE.modalText}>
                      Weight:
                    </Text>
                  </View>

                  <View style={styles.leftItem}>
                    <Text style={TEXTSTYLE.modalText}>
                      Reps:
                    </Text>
                  </View>

                  <View style={styles.leftItem}>
                    <Text style={TEXTSTYLE.modalText}>
                      Rest Time:
                    </Text>
                  </View>

                  <View style={styles.leftItem}>
                    <Text style={TEXTSTYLE.modalText}>
                      Type:
                    </Text>
                  </View>

                </View>

                <View style={styles.rightColumn}>
                  <View style={styles.rightItem}>
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

                  <View style={styles.rightItem}>
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

                  <View style={styles.rightItem}>
                    <Picker
                      style={{ color: COLORS.SECONDARYCOLOR, width: 100 }}
                      selectedValue={this.state.tmpType}
                      onValueChange={this.updateTmpType}>
                      {this.createTypeItems(this.props.types)}
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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

EditSetModal.propTypes = {
  visible: PropTypes.bool,
  setId: PropTypes.number,
  reps: PropTypes.number,
  weight: PropTypes.number,
  type: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.object),
  min: PropTypes.number,
  sec: PropTypes.number,
  closeModal: PropTypes.func,
  updateSetData: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    types: state.workoutData.setTypes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSetData: (setId, weight, reps, setType, min, sec) => {
      dispatch(updateSetData(setId, weight, reps, setType, min, sec));
    }
  };
};

const styles = StyleSheet.create({
  leftColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 25,
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSetModal);