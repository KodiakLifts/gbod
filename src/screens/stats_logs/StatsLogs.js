import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';

const COLORS = require('../../styles/Colors.js');
const TEXTSTYLE = require('../../styles/TextStyle');

class StatsLogs extends Component {
    render() {
        return (
            <ScreenTemplate
                headerContent={
                    <Text style={TEXTSTYLE.headerText}>
                        Stats and Logs
                    </Text>
                }
                scrollContent={
                    <Text>Scroll Area</Text>
                }
            />
        );
    }
}

export default StatsLogs;