import React, { Component } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateActiveWorkoutData, updateSetData } from '../../redux/actions/setButtonActions';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const activeButton = CONTAINERSTYLE.activeSetButton;
const inactiveButton = CONTAINERSTYLE.inactiveSetButton;
const activeText = TEXTSTYLE.activeSetButtonText;
const inactiveText = TEXTSTYLE.inactiveSetButtonText;

class SetButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      updateWeight: null,
      updateReps: null,
      updateType: null
    };

    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this._checkSetType = this.checkSetType.bind(this);
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

  _onPress() {
    this.props.updateActiveWorkoutData(this.props.setId, this.props.exerciseId);
  }

  _onLongPress() {
    this.setState({ modalVisible: true });
  }

  checkSetType(type) {
    switch (type) {
      case "N": return "";
      case "D": return "-";
      case "F": return "+";
    }
    return "";
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  onWeightChange = (weight) => {
    this.setState({ updateWeight: weight });
  }




  render() {
    return (
      <View>
        <Modal
          transparent
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}
        >
          <TouchableOpacity onPress={this.closeModal} style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.TRANSPARENTOVERLAY
          }}>
            <TouchableWithoutFeedback>
              <View style={CONTAINERSTYLE.modalCard}>
                <View style={{ flexDirection: 'row' }}><Text style={TEXTSTYLE.modalHeader}>Edit</Text></View>
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={TEXTSTYLE.modalText}>
                      Weight:
                    </Text>
                    <View style={{
                      borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 12
                    }}><TextInput
                        style={TEXTSTYLE.modalTextInput}
                        keyboardType="numeric"
                        keyboardAppearance="dark"
                        placeholder={String(this.props.weight)}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.onWeightChange}
                        clearTextOnFocus
                        maxLength={4}
                        width={50}
                      />
                    </View>

                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={TEXTSTYLE.modalText}>
                      Reps:
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={TEXTSTYLE.modalText}>
                      Type:
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>

                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>


          </TouchableOpacity>
        </Modal>
        <TouchableOpacity onPress={this._onPress} onLongPress={this._onLongPress}>
          <View style={this.props.complete ? activeButton : inactiveButton}>
            <Text style={this.props.complete ? activeText : inactiveText}>
              {this.props.weight + "x" + this.props.reps + this.checkSetType(this.props.type)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}



SetButton.propTypes = {
  exerciseId: PropTypes.number,
  setId: PropTypes.number,
  reps: PropTypes.number,
  weight: PropTypes.number,
  type: PropTypes.string,
  updateActiveWorkoutData: PropTypes.func,
  complete: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    complete:
      state
        .workoutData
        .programs[state.workoutData.activeWorkout.program]
        .sets[ownProps.setId].complete
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateActiveWorkoutData: (setId, exerciseId) => {
      dispatch(updateActiveWorkoutData(setId, exerciseId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetButton);