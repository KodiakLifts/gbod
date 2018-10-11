import { StyleSheet, Dimensions } from "react-native";

const COLORS = require("../../styles/Colors");

module.exports = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  headerText: {
    color: COLORS.TEXTCOLOR,
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  subHeaderText: {
    color: COLORS.TEXTCOLOR,
    fontSize: 16,
    fontWeight: "bold",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  timerSettingsContainer: {
    width: 98,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  footerContainer: {
    flexDirection: "row"
  },
  picker: {
    height: 40,
    marginLeft: 6,
    color: COLORS.SECONDARYCOLOR,
    width: Dimensions.get("window").width / 3 + 12
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARYCOLOR
  },
  menuPlusContainer: {
    width: 59,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 12
  }
});
