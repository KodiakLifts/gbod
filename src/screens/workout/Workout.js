import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');

class Workout extends Component {
    render() {
        return (
            <ScreenTemplate
                headerContent={
                    <Text style={TEXTSTYLE.headerText}>
                        GreySkull LP
                    </Text>
                }
                scrollContent={
                    <Text>Scroll Area</Text>
                }
            />
        );
    }
}

Workout.propTypes ={
    programName: PropTypes.string
}

export default Workout;