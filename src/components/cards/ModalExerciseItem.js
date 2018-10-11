import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExercise } from "../../redux/actions/activeWorkoutActions";

const STYLE = require("./cardStyle");

const ModalExerciseItem = props => {
  function _onPress() {
    const { libraryId, addExercise, closeModal } = props;
    addExercise(libraryId);
    closeModal();
  }

  const { name, category, bodyPart, favorite, oneRepMax, libraryId } = props;
  return (
    <View>
      <View style={STYLE.modalListItem}>
        <TouchableOpacity onPress={_onPress}>
          <Text style={STYLE.title}>{name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ModalExerciseItem.propTypes = {
  name: PropTypes.string,
  libraryId: PropTypes.number,
  category: PropTypes.number,
  bodyPart: PropTypes.number,
  favorite: PropTypes.bool,
  oneRepMax: PropTypes.number,
  closeModal: PropTypes.func,
  addExercise: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    addExercise: libraryId => {
      dispatch(addExercise(libraryId));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ModalExerciseItem);
