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
      tmpSupersetNext: props.supersetNext,
      tmpIncludeWarmup: props.includeWarmup
    };

  }

  supersetNextToggle = (checked) => {
    this.setState({
      tmpSupersetNext: checked
    });
  }

  includeWarmupToggle = (checked) => {
    this.setState({
      tmpIncludeWarmup: checked
    });
  }

  save = () => {
    this.props.updateExerciseData(
      this.props.exerciseId,
      this.state.tmpSupersetNext,
      this.state.tmpIncludeWarmup
    );
    this.props.closeModal();
  }

  cancel = () => {
    this.setState({
      tmpSupersetNext: this.props.supersetNext,
      tmpIncludeWarmup: this.props.includeWarmup
    });
    this.props.closeModal();
  }

  render() {
    return (
      <View>
        <Modal
          transparent
          visible={this.props.visible}
          onRequestClose={this.props.closeModal}
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
                    Edit Exercise
                </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <Text style={TEXTSTYLE.modalText}>
                        Superset:
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <Text style={TEXTSTYLE.modalText}>
                        Include Warmup Sets:
                      </Text>
                    </View>

                  </View>

                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 2 }}>
                      <CheckBox
                        disabled={this.props.lastExercise}
                        value={this.state.tmpSupersetNext}
                        onValueChange={this.supersetNextToggle}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 }}>
                      <CheckBox
                        value={this.state.tmpIncludeWarmup}
                        onValueChange={this.includeWarmupToggle}
                      />
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={this.cancel}>
                    <Text style={TEXTSTYLE.selectedTextButton}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.save}>
                    <Text style={TEXTSTYLE.selectedTextButton}>SAVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

EditExerciseModal.propTypes = {
  visible: PropTypes.bool,
  exerciseId: PropTypes.number,
  lastExercise: PropTypes.bool,
  supersetNext: PropTypes.bool,
  includeWarmup: PropTypes.bool,
  closeModal: PropTypes.func,
  updateExerciseData: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateExerciseData: (exerciseId, supersetNext, includeWarmup) => {
      dispatch(updateExerciseData(exerciseId, supersetNext, includeWarmup));
    }
  };
};

export default connect(null, mapDispatchToProps)(EditExerciseModal);