import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

class SetTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      start: 3,
      now: 3
    };

    this.timer = this.timer.bind(this);

  }


  timer(interval) {
    const pad = (n) => n < 10 ? '0' + n : n;
    const duration = moment.duration(interval);
  }




  render() {
    return (
      <TouchableOpacity>
        <View style={{ flexDirection: 'row', borderColor: COLORS.SECONDARYCOLOR, }}>
          <Text style={{
            fontSize: 24, color: COLORS.SECONDARYCOLOR, textAlignVertical: 'center', includeFontPadding: false
          }}>
            03:
          </Text>
          <Text style={{
            fontSize: 24, color: COLORS.SECONDARYCOLOR, textAlignVertical: 'center', includeFontPadding: false
          }}>
            00
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

}

export default SetTimer;

