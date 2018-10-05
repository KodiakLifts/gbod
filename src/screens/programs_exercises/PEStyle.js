import { StyleSheet, Dimensions } from 'react-native';

const COLORS = require('../../styles/Colors');

module.exports = StyleSheet.create({
  pickerHalf: {
    color: COLORS.SECONDARYCOLOR,
    width: (Dimensions.get('window').width / 2)
  },
  pickerFull: {
    color: COLORS.SECONDARYCOLOR,
    width: Dimensions.get('window').width
  }
});