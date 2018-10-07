import { StyleSheet, Dimensions } from 'react-native';

const COLORS = require('../../styles/Colors');

module.exports = StyleSheet.create({
  cardContainer: {
    alignItems: 'center'
  },
  exerciseCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  setButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    'flexWrap': 'wrap'
  },
  title: {
    color: COLORS.SECONDARYCOLOR,
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    margin: 12
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
  listHeaderText: {
    color: COLORS.TEXTCOLOR,
    fontSize: 22,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    margin: 10
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.BACKCOLOR,
    borderBottomWidth: 1
  },
  listItemText: {
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
});