import { StyleSheet, Dimensions } from "react-native";

const COLORS = require("../../styles/Colors");

module.exports = StyleSheet.create({
  pickerHalf: {
    height: 40,
    color: COLORS.SECONDARYCOLOR,
    width: Dimensions.get("window").width / 2 - 6
  },
  pickerFull: {
    height: 40,
    color: COLORS.SECONDARYCOLOR,
    width: Dimensions.get("window").width - 12
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARYCOLOR
  }
});
