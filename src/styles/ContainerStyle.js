import { StyleSheet, Dimensions } from 'react-native';

const COLORS = require('./Colors');

module.exports = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width,
    paddingTop: 15,
    paddingBottom: 12,
    backgroundColor: COLORS.BACKCOLOR,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  subHeader: {
    width: Dimensions.get('window').width,
    paddingTop: 15,
    paddingBottom: 12,
    backgroundColor: COLORS.BACKCOLOR,
    elevation: 0,
  },
  scrollArea: {
    flexGrow: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: COLORS.BACKCOLOR
  },
  card: {
    flexDirection: 'column',
    width: (Dimensions.get('window').width - 24),
    alignSelf: 'flex-start',
    backgroundColor: COLORS.PRIMARYCOLOR,
    borderRadius: 5,
    elevation: 2,


  },
  activeCard: {
    flexDirection: 'column',
    width: (Dimensions.get('window').width - 24),
    alignSelf: 'flex-start',
    backgroundColor: COLORS.PRIMARYCOLOR,
    borderRadius: 5,
    borderColor: COLORS.SECONDARYCOLOR,
    borderWidth: 1,
    elevation: 2,


  },
  modalCard: {
    flexDirection: 'column',
    padding: 12,
    backgroundColor: COLORS.PRIMARYCOLOR,
    borderRadius: 5,
    elevation: 5,
  },
  listCard: {
    flexDirection: 'column',
    width: (Dimensions.get('window').width - 24),
    alignSelf: 'flex-start',
    backgroundColor: COLORS.PRIMARYCOLOR,
    borderRadius: 5,
    elevation: 2
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.BACKCOLOR,
    borderBottomWidth: 1
  },
  moreMenu: {
    flexDirection: 'column',
    backgroundColor: COLORS.PRIMARYCOLOR,
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 4
  },
  activeSetButton: {
    padding: 12,
    marginHorizontal: 6,
    marginBottom: 12,
    width: 112,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.SECONDARYCOLOR,
    borderRadius: 5
  },
  inactiveSetButton: {
    padding: 12,
    marginHorizontal: 6,
    marginBottom: 12,
    width: 112,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.INACTIVECOLOR,
    borderRadius: 5
  },
  textInputArea: {
    width: 50,
    height: 30,
    backgroundColor: COLORS.backgroundColor,
    borderColor: 'black',
    borderWidth: 1,
  }
});