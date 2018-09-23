import { StyleSheet } from 'react-native';

const COLORS = require('./Colors');

module.exports = StyleSheet.create({
  headerText: {
    color: COLORS.TEXTCOLOR,
    fontSize: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: COLORS.SHADOWCOLOR,
    textShadowRadius: 2
  },
  icon: {
    elevation: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowColor: COLORS.SHADOWCOLOR,
    textShadowRadius: 2,
    paddingLeft: 6
  }
});