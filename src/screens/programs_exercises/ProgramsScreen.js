import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SubScreenTemplate from '../templates/SubScreenTemplate';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ListCard from '../../components/cards/ListCard';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');

const STYLE = require('./PEStyle');

const menuItems = [{ name: "option 1" }, { name: "option 2" }];

class Programs extends Component {
  render() {
    return (
      <SubScreenTemplate
        headerContent={
          <View />
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

export default Programs;