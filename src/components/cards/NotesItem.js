import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const COLORS = require("../../styles/Colors");
const STYLE = require("./cardStyle");

const NotesItem = props => {
  const { notes } = props;
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
          <Text style={[STYLE.title, { color: COLORS.TEXTCOLOR }]}>Notes</Text>
        </View>
        {renderNotes(notes)}
      </View>
    </View>
  );
};

const renderNotes = notes => {
  if (notes !== "") {
    return <Text style={STYLE.listItemDetails}>{notes}</Text>;
  } else {
    return null;
  }
};

NotesItem.propTypes = {
  logId: PropTypes.number,
  notes: PropTypes.string
};

export default NotesItem;
