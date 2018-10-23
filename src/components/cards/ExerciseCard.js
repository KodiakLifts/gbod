import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import EditExerciseModal from "../modals/EditExerciseModal";
import {
  addSet,
  makeCurrentExercise,
  shiftExerciseDown,
  shiftExerciseUp,
  deactivateDayBar
} from "../../redux/actions/activeWorkoutActions";
import { connect } from "react-redux";

const COLORS = require("../../styles/Colors");
const STYLE = require("./cardStyle");

class ExerciseCard extends Component {
  state = {
    menuModalVisible: false
  };

  _cardPress = () => {
    const { makeCurrentExercise, exerciseId, deactivateDayBar } = this.props;
    makeCurrentExercise(exerciseId);
    deactivateDayBar();
  };

  _addSetPress = () => {
    const { addSet, exerciseId, deactivateDayBar } = this.props;
    addSet(exerciseId);
    deactivateDayBar();
  };

  _onMenuPress = () => {
    this.setState({ menuModalVisible: true });
    this.props.deactivateDayBar();
  };

  closeMenuModal = () => {
    this.setState({ menuModalVisible: false });
  };

  _shiftUp = () => {
    const { shiftExerciseUp, exerciseId, deactivateDayBar } = this.props;
    shiftExerciseUp(exerciseId);
    deactivateDayBar();
  };

  _shiftDown = () => {
    const { shiftExerciseDown, exerciseId, deactivateDayBar } = this.props;
    shiftExerciseDown(exerciseId);
    deactivateDayBar();
  };

  renderControls = active => {
    const { lastExercise, firstExercise, logExercise } = this.props;
    if (active || logExercise) {
      return (
        <View style={STYLE.menuPlusContainer}>
          {this.renderShiftDown(lastExercise)}
          {this.renderShiftUp(firstExercise)}
          <TouchableOpacity
            onPress={this._addSetPress}
            style={{ margin: 1, paddingHorizontal: 5 }}
          >
            <Icon name={"plus"} size={23} color={COLORS.SECONDARYCOLOR} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onMenuPress}
            style={{ margin: 1, paddingLeft: 5 }}
          >
            <Icon name={"ellipsis-h"} size={25} color={COLORS.SECONDARYCOLOR} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  renderShiftDown = lastExercise => {
    if (!lastExercise) {
      return (
        <TouchableOpacity
          onPress={this._shiftDown}
          style={{ margin: 1, paddingHorizontal: 5 }}
        >
          <Icon name={"angle-down"} size={27} color={COLORS.SECONDARYCOLOR} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  renderShiftUp = firstExercise => {
    if (!firstExercise) {
      return (
        <TouchableOpacity
          onPress={this._shiftUp}
          style={{ margin: 1, paddingHorizontal: 5 }}
        >
          <Icon name={"angle-up"} size={27} color={COLORS.SECONDARYCOLOR} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  renderSupersetLink = (supersetNext, lastExercise) => {
    let linkColor;
    if (supersetNext && !lastExercise) {
      linkColor = COLORS.SECONDARYCOLOR;
    } else {
      linkColor = COLORS.BACKCOLOR;
    }
    return (
      <Icon
        name={"link"}
        size={15}
        color={linkColor}
        style={{ transform: [{ rotateZ: "135deg" }], paddingBottom: 2 }}
      />
    );
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
          {this.renderSupersetLink(supersetNext, lastExercise)}
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
  firstExercise: PropTypes.bool,
  setButtons: PropTypes.arrayOf(PropTypes.object),
  addSet: PropTypes.func,
  active: PropTypes.bool,
  makeCurrentExercise: PropTypes.func,
  shiftExerciseDown: PropTypes.func,
  shiftExerciseUp: PropTypes.func,
  deactivateDayBar: PropTypes.func,
  logExercise: PropTypes.bool
};

const mapDispatchToProps = dispatch => {
  return {
    addSet: exerciseId => {
      dispatch(addSet(exerciseId));
    },
    makeCurrentExercise: exerciseId => {
      dispatch(makeCurrentExercise(exerciseId));
    },
    shiftExerciseDown: exerciseId => {
      dispatch(shiftExerciseDown(exerciseId));
    },
    shiftExerciseUp: exerciseId => {
      dispatch(shiftExerciseUp(exerciseId));
    },
    deactivateDayBar: () => {
      dispatch(deactivateDayBar());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ExerciseCard);
