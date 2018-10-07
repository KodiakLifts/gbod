import React, { Component } from 'react';
import {
  Modal,
  Text,
  CheckBox,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { updateExerciseData, removeExercise } from '../../redux/actions/activeWorkout/activeWorkoutActions';
import { connect } from 'react-redux';

const STYLE = require('./modalStyle');

class EditExerciseModal extends Component {
  state = {
    tmpSupersetNext: this.props.supersetNext,
    tmpIncludeWarmup: this.props.includeWarmup,
    tmpRemove: false,
  }

  supersetNextToggle = (checked) => {
    this.setState({ tmpSupersetNext: checked });
  }

  includeWarmupToggle = (checked) => {
    this.setState({ tmpIncludeWarmup: checked });
  }

  toggleRemove = (checked) => {
    this.setState({ tmpRemove: checked });
  }

  save = () => {
    const {
      updateExerciseData,
      exerciseId,
      closeModal,
      removeExercise
    } = this.props;
    const { tmpSupersetNext, tmpIncludeWarmup, tmpRemove } = this.state;
    if (tmpRemove) {
      removeExercise(exerciseId);
    } else {
      updateExerciseData(
        exerciseId,
        tmpSupersetNext,
        tmpIncludeWarmup
      );
    }

    this.setState({ tmpRemove: false });
    closeModal();
  }

  cancel = () => {
    const { supersetNext, includeWarmup, closeModal } = this.props;
    this.setState({
      tmpSupersetNext: supersetNext,
      tmpIncludeWarmup: includeWarmup
    });
    closeModal();
  }

  render() {
    const { visible, lastExercise } = this.props;
    const { tmpSupersetNext, tmpIncludeWarmup, tmpRemove } = this.state;

    return (
      <View>
        <Modal
          transparent
          visible={visible}
          onRequestClose={this.cancel}
        >
          <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={STYLE.modalCard}>
                <View style={STYLE.modalHeader}>
                  <Text style={STYLE.modalHeaderText}>
                    Exercise
                </Text>
                </View>
                <View style={STYLE.cardColumnsContainer}>

                  <View style={STYLE.leftColumn}>
                    <View style={STYLE.leftItem}>
                      <Text style={STYLE.modalText}>
                        Superset Next Exercise:
                      </Text>
                    </View>
                    <View style={STYLE.leftItem}>
                      <Text style={STYLE.modalText}>
                        Include Warmup Sets:
                      </Text>
                    </View>
                    <View style={STYLE.leftItem}>
                      <Text style={STYLE.modalText}>
                        Remove Exercise:
                      </Text>
                    </View>

                  </View>

                  <View style={STYLE.rightColumn}>
                    <View style={STYLE.rightItem}>
                      <CheckBox
                        disabled={lastExercise}
                        value={tmpSupersetNext}
                        onValueChange={this.supersetNextToggle}
                      />
                    </View>
                    <View style={STYLE.rightItem}>
                      <CheckBox
                        value={tmpIncludeWarmup}
                        onValueChange={this.includeWarmupToggle}
                      />
                    </View>
                    <View style={STYLE.rightItem}>
                      <CheckBox
                        value={tmpRemove}
                        onValueChange={this.toggleRemove}
                      />
                    </View>
                  </View>
                </View>

                <View style={STYLE.footer}>
                  <TouchableOpacity onPress={this.cancel}>
                    <Text style={STYLE.selectedTextButton}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.save}>
                    <Text style={STYLE.selectedTextButton}>SAVE</Text>
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
  updateExerciseData: PropTypes.func,
  removeExercise: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateExerciseData: (exerciseId, supersetNext, includeWarmup) => {
      dispatch(updateExerciseData(exerciseId, supersetNext, includeWarmup));
    },
    removeExercise: (exerciseId) => {
      dispatch(removeExercise(exerciseId));
    }
  };
};

export default connect(null, mapDispatchToProps)(EditExerciseModal);