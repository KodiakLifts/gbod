import { StyleSheet, Dimensions } from "react-native";

const COLORS = require("../../styles/Colors");

module.exports = StyleSheet.create({
  cardContainer: {
    alignItems: "center"
  },
  exerciseCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  setButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    flexWrap: "wrap"
  },
  title: {
    color: COLORS.SECONDARYCOLOR,
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
    includeFontPadding: false,
    margin: 12
  },
  card: {
    flexDirection: "column",
    width: Dimensions.get("window").width - 24,
    alignSelf: "flex-start",
    backgroundColor: COLORS.PRIMARYCOLOR,
    borderRadius: 5,
    elevation: 2
  },
  modalCard: {
    flexDirection: "column",
    alignSelf: "stretch",
    width: Dimensions.get("window").width - 70,
    backgroundColor: COLORS.PRIMARYCOLOR
  },
  activeCard: {
    flexDirection: "column",
    width: Dimensions.get("window").width - 23,
    alignSelf: "flex-start",
    backgroundColor: COLORS.PRIMARYCOLOR,
    borderRadius: 5,
    borderColor: COLORS.SECONDARYCOLOR,
    borderWidth: 2,
    elevation: 2
  },
  listHeaderText: {
    color: COLORS.TEXTCOLOR,
    fontSize: 22,
    fontWeight: "bold",
    textAlignVertical: "center",
    includeFontPadding: false,
    margin: 10
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: COLORS.BACKCOLOR,
    borderBottomWidth: 1
  },
  modalListItem: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderBottomColor: COLORS.BACKCOLOR,
    borderBottomWidth: 1
  },
  listItemText: {
    color: COLORS.SECONDARYCOLOR,
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
    includeFontPadding: false,
    margin: 12
  },
  listItemDetails: {
    color: COLORS.ACTIVECOLOR,
    fontSize: 18,
    textAlignVertical: "center",
    includeFontPadding: false,
    marginHorizontal: 12,
    marginBottom: 12
  },
  menuPlusContainer: {
    width: 122,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 12
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 160,
    paddingBottom: 6
  }
});
