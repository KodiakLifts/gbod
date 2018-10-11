import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import ExerciseOptionsModal from "../modals/ExerciseOptionsModal";

const COLORS = require("../../styles/Colors");
const STYLE = require("./cardStyle");

class ModalExerciseItem extends Component {
  state = {
    menuModalVisible: false
  };

  render() {
    const {
      name,
      category,
      bodyPart,
      favorite,
      oneRepMax,
      libraryId
    } = this.props;
    const { menuModalVisible } = this.state;

    return (
      <View>
        <View style={STYLE.modalListItem}>
          <TouchableOpacity>
            <Text style={STYLE.title}>{name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ModalExerciseItem.propTypes = {
  name: PropTypes.string,
  libraryId: PropTypes.number,
  category: PropTypes.number,
  bodyPart: PropTypes.number,
  favorite: PropTypes.bool,
  oneRepMax: PropTypes.number
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect()(ModalExerciseItem);
