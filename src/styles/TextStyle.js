import { StyleSheet } from 'react-native';

const COLORS = require('./Colors');

module.exports = StyleSheet.create({
  headerText: {
    color: COLORS.TEXTCOLOR,
    fontSize: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false
  },
  icon: {
    elevation: 1,
    paddingLeft: 6
  },
  listHeader: {
    color: COLORS.TEXTCOLOR,
    fontSize: 22,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    margin: 10
  },
  listItem: {
    color: COLORS.SECONDARYCOLOR,
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    margin: 12
  },
  listItemDetails: {
    color: COLORS.ACTIVECOLOR,
    fontSize: 18,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginHorizontal: 12,
    marginBottom: 12
  },
  activeSetButtonText: {
    fontSize: 18,
    color: 'black',
    textAlignVertical: 'center',
    includeFontPadding: false
  },
  inactiveSetButtonText: {
    fontSize: 18,
    color: 'white',
    textAlignVertical: 'center',
    includeFontPadding: false
  }

});