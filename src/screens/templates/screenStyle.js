import { StyleSheet, Dimensions } from 'react-native';

const COLORS = require('../../styles/Colors');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    width: Dimensions.get('window').width,
    paddingTop: 15,
    paddingBottom: 12,
    backgroundColor: COLORS.BACKCOLOR,
    elevation: 4,
  },
  scrollArea: {
    elevation: 0,
    flexGrow: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: COLORS.BACKCOLOR
  },
  subHeader: {
    width: Dimensions.get('window').width,
    backgroundColor: COLORS.BACKCOLOR,
    elevation: 2,
  },
  subScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomColor: COLORS.BACKCOLOR,
    borderBottomWidth: 3
  }
});