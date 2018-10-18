import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

const STYLE = require("./buttonStyle");
const COLORS = require("../../styles/Colors");

const NoteButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon name={"sticky-note"} size={25} color={COLORS.SECONDARYCOLOR} />
    </TouchableOpacity>
  );
};

NoteButton.propTypes = {
  onPress: PropTypes.func
};

export default NoteButton;
