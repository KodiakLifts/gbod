import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import SetButton from "../buttons/SetButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import EditExerciseModal from "../modals/EditExerciseModal";
import {
  addSet,
  makeCurrentExercise
} from "../../redux/actions/activeWorkoutActions";
import { connect } from "react-redux";

const COLORS = require("../../styles/Colors");
const STYLE = require("./cardStyle");

class ExerciseCard extends Component {
  state = {
    menuModalVisible: false
  };

  _cardPress = () => {
    const { makeCurrentExercise, exerciseId } = this.props;
    makeCurrentExercise(exerciseId);
  };

  _addSetPress = () => {
    const { addSet, exerciseId } = this.props;
    addSet(exerciseId);
  };

  _onMenuPress = () => {
    this.setState({ menuModalVisible: true });
  };

  closeMenuModal = () => {
    this.setState({ menuModalVisible: false });
  };

  renderControls = active => {
    if (active) {
      return (
        <View style={STYLE.menuPlusContainer}>
          <TouchableOpacity onPress={this._addSetPress}>
            <Icon name={"plus"} size={23} color={COLORS.SECONDARYCOLOR} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onMenuPress}>
            <Icon name={"ellipsis-h"} size={25} color={COLORS.SECONDARYCOLOR} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    const {
      exerciseId,
      name,
      borderStyle,
      supersetNext,
      includeWarmup,
      lastExercise,
      setButtons,
      active
    } = this.props;
    const { menuModalVisible } = this.state;
    return (
      <View>
        <EditExerciseModal
          visible={menuModalVisible}
          exerciseId={exerciseId}
          supersetNext={supersetNext}
          includeWarmup={includeWarmup}
          lastExercise={lastExercise}
          closeModal={this.closeMenuModal}
        />

        <View style={STYLE.cardContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={this._cardPress}>
            <View style={borderStyle}>
              <View style={STYLE.exerciseCardHeader}>
                <TouchableOpacity>
                  <Text style={STYLE.title}>{name}</Text>
                </TouchableOpacity>
                {this.renderControls(active)}
              </View>

              <View style={STYLE.setButtonsContainer}>{setButtons}</View>

              <View style={STYLE.sortContainer} />
            </View>
          </TouchableOpacity>
          <Icon
            name={"link"}
            size={15}
            color={supersetNext ? COLORS.SECONDARYCOLOR : COLORS.BACKCOLOR}
            style={{ transform: [{ rotateZ: "135deg" }], paddingBottom: 2 }}
          />
        </View>
      </View>
    );
  }
}

ExerciseCard.propTypes = {
  exerciseId: PropTypes.number,
  borderStyle: PropTypes.object,
  name: PropTypes.string,
  supersetNext: PropTypes.bool,
  includeWarmup: PropTypes.bool,
  lastExercise: PropTypes.bool,
  setButtons: PropTypes.arrayOf(PropTypes.object),
  addSet: PropTypes.func,
  active: PropTypes.bool,
  makeCurrentExercise: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    addSet: exerciseId => {
      dispatch(addSet(exerciseId));
    },
    makeCurrentExercise: exerciseId => {
      dispatch(makeCurrentExercise(exerciseId));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ExerciseCard);
