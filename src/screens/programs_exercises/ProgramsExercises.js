import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';

const COLORS = require('../../styles/Colors.js');
const TEXTSTYLE = require('../../styles/TextStyle');

class ProgramsExercises extends Component {
    render() {
        return (
            <ScreenTemplate
                headerContent={
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Text style={TEXTSTYLE.headerText}>
                        Programs and Exercises
                    </Text>
                </View>
                }
                scrollContent={
                    <Text>Scroll Area</Text>
                }
            />
        );
    }
}

export default ProgramsExercises;