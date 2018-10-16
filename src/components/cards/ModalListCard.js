import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const STYLE = require("./cardStyle");

const ModalListCard = props => {
  const { headerTitle, items } = props;
  return (
    <View>
      <Text style={STYLE.listHeaderText}>{headerTitle}</Text>
      <View style={STYLE.modalCard}>{items}</View>
    </View>
  );
};

ModalListCard.propTypes = {
  headerTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default ModalListCard;
