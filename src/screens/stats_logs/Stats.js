import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SubScreenTemplate from '../templates/SubScreenTemplate';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ListCard from '../../components/cards/ListCard';

const COLORS = require('../../styles/Colors.js');
const TEXTSTYLE = require('../../styles/TextStyle');

const menuItems = [{ name: "option 1" }, { name: "option 2" }];

class Stats extends Component {
  render() {
    return (
      <SubScreenTemplate
        headerContent={
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>

            <TouchableOpacity style={{ flexDirection: 'row' }}>
              <Icon name="search" size={25} color={COLORS.SECONDARYCOLOR} />

              <Text style={{ color: COLORS.INACTIVECOLOR, textAlignVertical: 'center', paddingLeft: 12, fontSize: 16 }}>
                Search
                </Text>

            </TouchableOpacity>

          </View>
        }
        scrollContent={
          <ListCard headerTitle="A" items={[
            { name: 'Exercise 1', details: '125x5, 125x5, 125x5+', options: menuItems },
            { name: 'Exercise 2', details: '125x5, 125x5, 125x5+', options: menuItems }
          ]} />
        }
      />
    );
  }
}

export default Stats;