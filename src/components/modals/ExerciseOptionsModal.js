import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  CheckBox,
  TextInput,
  Picker
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateProgramData,
  deleteProgram
} from '../../redux/actions/programsActions';
import { updateExerciseData, deleteExercise }
  from '../../redux/actions/exercisesActions';

const STYLE = require('./modalStyle');
const COLORS = require('../../styles/Colors');

const TEXT_ENTRY_WIDTH = 160;
const PICKER_WIDTH = 160;

class ExerciseOptionsModal extends Component {
  state = {
    tmpName: this.props.title,
    tmpOneRepMax: this.props.oneRepMax,
    tmpCategory: this.props.category,
    tmpBodyPart: this.props.bodyPart,
    tmpFavorite: this.props.favorite,
    tmpDelete: false,
  }

  updateTmpOneRepMax = (weight) => {
    if (weight == null) {
      this.setState({ tmpOneRepMax: this.props.oneRepMax });
    } else {
      this.setState({ tmpOneRepMax: parseInt(weight) });
    }
  }

  updateTmpName = (name) => {
    if (name == null) {
      this.setState({ tmpName: this.props.title });
    } else {
      this.setState({ tmpName: name });
    }
  }

  updateTmpCategory = (category) => {
    this.setState({ tmpCategory: category });
  }

  updateTmpBodyPart = (bodyPart) => {
    this.setState({ tmpBodyPart: bodyPart });
  }

  toggleFavorite = (checked) => {
    this.setState({ tmpFavorite: checked });
  }

  toggleDelete = (checked) => {
    this.setState({ tmpDelete: checked });
  }

  cancel = () => {
    this.props.closeModal();
  }

  save = () => {
    const {
      libraryId,
      closeModal,
      deleteExercise,
      updateExerciseData
    } = this.props;
    const {
      tmpOneRepMax,
      tmpBodyPart,
      tmpCategory,
      tmpName,
      tmpFavorite,
      tmpDelete
    } = this.state;

    if (tmpDelete) {
      deleteExercise(libraryId);
    } else {
      updateExerciseData(
        libraryId,
        tmpOneRepMax,
        tmpBodyPart,
        tmpCategory,
        tmpName,
        tmpFavorite,
      );
    }
    closeModal();
  }

  render() {
    const {
      visible,
      title,
      oneRepMax,
      categories,
      bodyParts
    } = this.props;
    const {
      tmpBodyPart,
      tmpCategory,
      tmpFavorite,
      tmpDelete
    } = this.state;
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
                      One Rep max:
                    </Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Rename:
                    </Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Category:
                    </Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Body Part:
                    </Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Favorite:
                    </Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Delete:
                    </Text>
                  </View>
                </View>

                <View style={
                  [STYLE.rightColumn, { alignItems: 'center', paddingRight: 6 }]}>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        keyboardType="numeric"
                        placeholder={String(oneRepMax)}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpOneRepMax}
                        maxLength={4}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        placeholder={title}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpName}
                        maxLength={30}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>
                  <View style={STYLE.rightItem}>
                    <Picker
                      style={[STYLE.picker, { width: PICKER_WIDTH }]}
                      selectedValue={tmpCategory}
                      onValueChange={this.updateTmpCategory}>
                      {createItems(categories)}
                    </Picker>
                  </View>
                  <View style={STYLE.rightItem}>
                    <Picker
                      style={[STYLE.picker, { width: PICKER_WIDTH }]}
                      selectedValue={tmpBodyPart}
                      onValueChange={this.updateTmpBodyPart}>
                      {createItems(bodyParts)}
                    </Picker>
                  </View>
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      value={tmpFavorite}
                      onValueChange={this.toggleFavorite}
                    />
                  </View>
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      value={tmpDelete}
                      onValueChange={this.toggleDelete}
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

const createItems = (items) => {
  return items.map((item, index) => {
    return (
      <Picker.Item key={index} label={item.name} value={item.id} />
    );
  });
};

ExerciseOptionsModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  libraryId: PropTypes.number,
  category: PropTypes.number,
  bodyPart: PropTypes.number,
  favorite: PropTypes.bool,
  oneRepMax: PropTypes.number,
  categories: PropTypes.arrayOf(PropTypes.object),
  bodyParts: PropTypes.arrayOf(PropTypes.object),
  deleteExercise: PropTypes.func,
  updateExerciseData: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    categories: state.workoutData.exerciseCategories.slice(1),
    bodyParts: state.workoutData.bodyParts.slice(1)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteExercise: (libraryId) => {
      dispatch(deleteExercise(libraryId));
    },
    updateExerciseData: (
      libraryId,
      oneRepMax,
      name,
      category,
      bodyPart,
      favorite
    ) => {
      dispatch(updateExerciseData(
        libraryId,
        oneRepMax,
        name,
        category,
        bodyPart,
        favorite
      ));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseOptionsModal);