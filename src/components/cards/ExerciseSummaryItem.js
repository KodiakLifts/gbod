import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const COLORS = require("../../styles/Colors");
const STYLE = require("./cardStyle");

const ExerciseSummaryItem = props => {
  const { name, summary } = props;
  return (
    <View>
      <View
        style={{
          flexDirection: "column",
          borderBottomColor: COLORS.BACKCOLOR,
          borderBottomWidth: 1
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity>
            <Text style={STYLE.title}>{name}</Text>
          </TouchableOpacity>
        </View>
        <Text style={STYLE.listItemDetails}>{summary}</Text>
      </View>
    </View>
  );
};

ExerciseSummaryItem.propTypes = {
  name: PropTypes.string,
  libraryId: PropTypes.number,
  sets: PropTypes.arrayOf(PropTypes.object),
  summary: PropTypes.string
};

export default ExerciseSummaryItem;
