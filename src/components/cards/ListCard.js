import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MoreMenu from '../buttons/MoreMenu';
import PropTypes from 'prop-types';

const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const ListCard = (props) => {
  const items = props.items;
  const itemList = items.map(item => {
    return (
      <View key={item} style={CONTAINERSTYLE.listItem}>
        <View>
          <TouchableOpacity>
            <Text style={TEXTSTYLE.listItem}>{item.name}</Text>
          </TouchableOpacity>
          <Text style={TEXTSTYLE.listItemDetails}>{item.details}</Text>
        </View>
        <View style={{ marginRight: 12 }}>
          <MoreMenu options={item.options} />
          <View style={{ marginVertical: 12 }} />
        </View>
      </View>
    );
  });

  return (
    <View>
      <Text style={TEXTSTYLE.listHeader}>{props.headerTitle}</Text>
      <View style={CONTAINERSTYLE.listCard}>
        {itemList}
      </View>
    </View>
  );
};

ListCard.propTypes = {
  headerTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    details: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })),
  })),
};

export default ListCard;