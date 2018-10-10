import { StyleSheet, Dimensions } from "react-native";

const COLORS = require("../../styles/Colors");

module.exports = StyleSheet.create({
  pickerHalf: {
    height: 40,
    marginLeft: 6,
    color: COLORS.SECONDARYCOLOR,
    width: Dimensions.get("window").width / 2
  },
  pickerFull: {
    height: 40,
    marginLeft: 6,
    color: COLORS.SECONDARYCOLOR,
    width: Dimensions.get("window").width
  }
});
