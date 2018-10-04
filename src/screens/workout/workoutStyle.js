import { StyleSheet } from 'react-native';

const COLORS = require('../../styles/Colors');

module.exports = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  headerText: {
    color: COLORS.TEXTCOLOR,
    fontSize: 20,

    textAlignVertical: 'center',
    includeFontPadding: false
  },
  subHeaderText: {
    color: COLORS.TEXTCOLOR,
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false
  },
  timerSettingsContainer: {
    width: 96,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerContainer: {
    flexDirection: 'row'
  }
});