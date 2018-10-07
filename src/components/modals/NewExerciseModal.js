import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  CheckBox,
  TextInput,
  Picker,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateProgramData,
  deleteProgram
} from '../../redux/actions/programsActions';
import { newExercise }
  from '../../redux/actions/exercisesActions';

const STYLE = require('./modalStyle');
const COLORS = require('../../styles/Colors');

const TEXT_ENTRY_WIDTH = 160;
const PICKER_WIDTH = 160;

class NewExerciseModal extends Component {
  state = {
    tmpName: "New Exercise",
    tmpOneRepMax: 0,
    tmpCategory: 9,
    tmpBodyPart: 9,
    tmpFavorite: false,
  }

  updateTmpOneRepMax = (weight) => {
    if (weight == null) {
      this.setState({ tmpOneRepMax: 0 });
    } else {
      this.setState({ tmpOneRepMax: parseInt(weight) });
    }
  }

  updateTmpName = (name) => {
    if (name == null) {
      this.setState({ tmpName: "New Exercise" });
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

  cancel = () => {
    this.props.closeModal();
  }

  save = () => {
    const {
      closeModal,
      newExercise,
      exercises
    } = this.props;
    const {
      tmpName,
      tmpOneRepMax,
      tmpCategory,
      tmpBodyPart,
      tmpFavorite,
    } = this.state;



    newExercise(
      tmpName,
      tmpOneRepMax,
      tmpCategory,
      tmpBodyPart,
      tmpFavorite,
    );

    closeModal();
  }

  render() {
    const {
      visible,
      categories,
      bodyParts
    } = this.props;
    const {
      tmpBodyPart,
      tmpCategory,
      tmpFavorite,
      tmpOneRepMax,
      tmpName
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
                  New Exercise
                </Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>

                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      Name:
                    </Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>
                      One Rep max:
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
                </View>

                <View style={
                  [STYLE.rightColumn, { alignItems: 'center', paddingRight: 6 }]}>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        placeholder={"New Exercise"}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpName}
                        maxLength={30}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        keyboardType="numeric"
                        placeholder={String(tmpOneRepMax)}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpOneRepMax}
                        maxLength={4}
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

NewExerciseModal.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.object),
  bodyParts: PropTypes.arrayOf(PropTypes.object),
  newExercise: PropTypes.func,
  exercises: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
  return {
    exercises: state.workoutData.exerciseLibrary,
    categories: state.workoutData.exerciseCategories.slice(1),
    bodyParts: state.workoutData.bodyParts.slice(1)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newExercise: (
      name,
      oneRepMax,
      category,
      bodyPart,
      favorite
    ) => {
      dispatch(newExercise(
        name,
        oneRepMax,
        category,
        bodyPart,
        favorite
      ));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewExerciseModal);