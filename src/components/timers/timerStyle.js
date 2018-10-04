import { StyleSheet } from 'react-native';

const COLORS = require('../../styles/Colors');

module.exports = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    borderColor: COLORS.SECONDARYCOLOR,
  },
  timerText: {
    fontSize: 28,
    textAlignVertical: 'center',
    includeFontPadding: false
  }
});