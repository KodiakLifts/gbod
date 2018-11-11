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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARYCOLOR
  },
  headerText: {
    color: COLORS.SECONDARYCOLOR,
    marginLeft: 8,
    fontSize: 22,
    fontWeight: "bold"
  }
});
