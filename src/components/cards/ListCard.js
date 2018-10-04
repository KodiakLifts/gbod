import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const STYLE = require('./cardStyle');

const ListCard = (props) => {
  const { headerTitle, items } = props;
  return (
    <View>
      <Text style={STYLE.listHeaderText}>{headerTitle}</Text>
      <View style={STYLE.listCard}>
        {items}
      </View>
    </View >
  );
};

ListCard.propTypes = {
  headerTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default ListCard;