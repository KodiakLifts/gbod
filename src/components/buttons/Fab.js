import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";

const STYLE = require("./buttonStyle");
const COLORS = require("../../styles/Colors");

const Fab = props => {
  return (
    <TouchableOpacity
      style={STYLE.fab}
      activeOpacity={0.5}
      onPress={props.onPress}
    >
      <Icon name="plus" size={30} color={COLORS.BACKCOLOR} />
    </TouchableOpacity>
  );
};

Fab.propTypes = {
  onPress: PropTypes.func
};

export default Fab;
