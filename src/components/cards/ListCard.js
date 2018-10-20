import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const STYLE = require("./cardStyle");

const renderHeader = headerTitle => {
  if (headerTitle !== "") {
    return <Text style={STYLE.listHeaderText}>{headerTitle}</Text>;
  } else {
    return <View style={{ margin: 6 }} />;
  }
};

const ListCard = props => {
  const { headerTitle, items } = props;
  return (
    <View>
      {renderHeader(headerTitle)}
      <View style={STYLE.card}>{items}</View>
    </View>
  );
};

ListCard.propTypes = {
  headerTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default ListCard;
