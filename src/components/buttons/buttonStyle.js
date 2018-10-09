import { StyleSheet } from "react-native";

const COLORS = require("../../styles/Colors");

module.exports = StyleSheet.create({
  activeButton: {
    padding: 12,
    marginHorizontal: 6,
    marginBottom: 12,
    width: 112,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.SECONDARYCOLOR,
    borderRadius: 5
  },
  inactiveButton: {
    padding: 12,
    marginHorizontal: 6,
    marginBottom: 12,
    width: 112,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.INACTIVECOLOR,
    borderRadius: 5
  },
  activeText: {
    fontSize: 18,
    color: "black",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  inactiveText: {
    fontSize: 18,
    color: "white",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  fab: {
    borderWidth: 3,
    borderColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: COLORS.SECONDARYCOLOR,
    borderRadius: 40,
    elevation: 3
  }
});
