import React, { Component } from "react";
import { View, Picker } from "react-native";
import SubScreenTemplate from "../templates/SubScreenTemplate";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLibraryCards } from "../../redux/selectors/exercisesSelectors";
import {
  updateSelectedExerciseCategory,
  updateSelectedBodyPart
} from "../../redux/actions/exercisesActions";
import Fab from "../../components/buttons/Fab";
import NewExerciseModal from "../../components/modals/NewExerciseModal";

const STYLE = require("./PEStyle");

class Exercises extends Component {
  state = {
    tmpCategory: 0,
    tmpBodyPart: 0,
    newExerciseModalVisible: false
  };

  _newExercisePress = () => {
    this.setState({ newExerciseModalVisible: true });
  };

  closeModal = () => {
    this.setState({ newExerciseModalVisible: false });
  };

  updateTmpCategory = category => {
    this.setState({ tmpCategory: category });
    this.props.updateSelectedExerciseCategory(category);
  };

  updateTmpBodyPart = bodyPart => {
    this.setState({ tmpBodyPart: bodyPart });
    this.props.updateSelectedBodyPart(bodyPart);
  };

  render() {
    const { categories, bodyParts, cards } = this.props;
    const { tmpCategory, tmpBodyPart, newExerciseModalVisible } = this.state;
    return (
      <SubScreenTemplate
        modal={
          <NewExerciseModal
            visible={newExerciseModalVisible}
            closeModal={this.closeModal}
          />
        }
        headerContent={
          <View style={[STYLE.subHeader, { paddingHorizontal: 6 }]}>
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
        }
        scrollContent={cards}
        footer={<Fab onPress={this._newExercisePress} />}
      />
    );
  }
}

const createItems = items => {
  return items.map((item, index) => (
    <Picker.Item key={index} label={item.name} value={item.id} />
  ));
};

Exercises.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  bodyParts: PropTypes.arrayOf(PropTypes.object),
  cards: PropTypes.arrayOf(PropTypes.object),
  updateSelectedExerciseCategory: PropTypes.func,
  updateSelectedBodyPart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    categories: state.workoutData.exerciseCategories,
    bodyParts: state.workoutData.bodyParts,
    cards: getLibraryCards(state.workoutData)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedExerciseCategory: categoryId => {
      dispatch(updateSelectedExerciseCategory(categoryId));
    },
    updateSelectedBodyPart: bodyPartId => {
      dispatch(updateSelectedBodyPart(bodyPartId));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exercises);
