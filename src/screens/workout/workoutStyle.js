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
    fontSize: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false
  },
  timerSettingsContainer: {
    width: 115,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerContainer: {
    flexDirection: 'row'
  }
});