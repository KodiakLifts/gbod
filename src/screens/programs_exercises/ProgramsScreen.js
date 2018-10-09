import React, { Component } from "react";
import { View, Picker } from "react-native";
import SubScreenTemplate from "../templates/SubScreenTemplate";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategoryCards } from "../../redux/selectors/programsSelectors";
import { updateSelectedProgramCategory } from "../../redux/actions/programsActions";
import NewProgramModal from "../../components/modals/NewProgramModal";
import Fab from "../../components/buttons/Fab";

const STYLE = require("./PEStyle");

class Programs extends Component {
  state = {
    tmpCategory: 0,
    newProgramModalVisible: false
  };

  _newProgramPress = () => {
    this.setState({ newProgramModalVisible: true });
  };

  closeModal = () => {
    this.setState({ newProgramModalVisible: false });
  };

  updateTmpCategory = category => {
    this.setState({ tmpCategory: category });
    this.props.updateSelectedProgramCategory(category);
  };

  render() {
    const { cards, categories } = this.props;
    const { tmpCategory, newProgramModalVisible } = this.state;
    return (
      <SubScreenTemplate
        modal={
          <NewProgramModal
            visible={newProgramModalVisible}
            closeModal={this.closeModal}
          />
        }
        headerContent={
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Picker
              style={STYLE.pickerHalf}
              selectedValue={tmpCategory}
              onValueChange={this.updateTmpCategory}
            >
              {createItems(categories)}
            </Picker>
          </View>
        }
        scrollContent={cards}
        footer={<Fab onPress={this._newProgramPress} />}
      />
    );
  }
}

Programs.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  updateSelectedProgramCategory: PropTypes.func
};

const createItems = items => {
  return items.map((item, index) => (
    <Picker.Item key={index} label={item.name} value={item.id} />
  ));
};

const mapStateToProps = state => {
  return {
    cards: getCategoryCards(state.workoutData),
    categories: state.workoutData.programCategories,
    selectedCategory: state.workoutData.selectedProgramCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedProgramCategory: categoryId => {
      dispatch(updateSelectedProgramCategory(categoryId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Programs);
