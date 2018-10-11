import React, { Component } from "react";
import {
  View,
  Picker,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getModalLibraryCards } from "../../redux/selectors/exercisesSelectors";
import {
  updateModalSelectedExerciseCategory,
  updateModalSelectedBodyPart
} from "../../redux/actions/exercisesActions";

const STYLE = require("./modalStyle");

class AddExerciseToWorkoutModal extends Component {
  state = {
    tmpCategory: 0,
    tmpBodyPart: 0
  };

  cancel = () => {
    this.props.closeModal();
  };

  updateTmpCategory = category => {
    this.setState({ tmpCategory: category });
    this.props.updateModalSelectedExerciseCategory(category);
  };

  updateTmpBodyPart = bodyPart => {
    this.setState({ tmpBodyPart: bodyPart });
    this.props.updateModalSelectedBodyPart(bodyPart);
  };

  render() {
    const { categories, bodyParts, cards, visible, closeModal } = this.props;
    const { tmpCategory, tmpBodyPart } = this.state;
    itemsFunctionality(cards, closeModal);

    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={STYLE.exercisePickerCard}>
              <View style={STYLE.exercisePickerHeader}>
                <Picker
                  style={STYLE.pickerHalf}
                  selectedValue={tmpCategory}
                  onValueChange={this.updateTmpCategory}
                >
                  {createItems(categories)}
                </Picker>
                <Picker
                  style={STYLE.pickerHalf}
                  selectedValue={tmpBodyPart}
                  onValueChange={this.updateTmpBodyPart}
                >
                  {createItems(bodyParts)}
                </Picker>
              </View>
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={STYLE.scrollArea}
              >
                <View onStartShouldSetResponder={() => true}>{cards}</View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const itemsFunctionality = (cards, closeModal) => {
  cards.forEach(card => {
    card.props.items.forEach((item, index) => {
      const newItem = {
        ...item,
        props: {
          ...item.props,
          closeModal: closeModal
        }
      };
      card.props.items[index] = newItem;
    });
  });
};

const createItems = items => {
  return items.map((item, index) => (
    <Picker.Item key={index} label={item.name} value={item.id} />
  ));
};

AddExerciseToWorkoutModal.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  bodyParts: PropTypes.arrayOf(PropTypes.object),
  cards: PropTypes.arrayOf(PropTypes.object),
  updateModalSelectedExerciseCategory: PropTypes.func,
  updateModalSelectedBodyPart: PropTypes.func,
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  getModalLibraryCards: PropTypes.func
};

const mapStateToProps = state => {
  return {
    categories: state.workoutData.exerciseCategories,
    bodyParts: state.workoutData.bodyParts,
    cards: getModalLibraryCards(state.workoutData)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateModalSelectedExerciseCategory: categoryId => {
      dispatch(updateModalSelectedExerciseCategory(categoryId));
    },
    updateModalSelectedBodyPart: bodyPartId => {
      dispatch(updateModalSelectedBodyPart(bodyPartId));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExerciseToWorkoutModal);
