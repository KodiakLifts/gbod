import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const COLORS = require('../../styles/Colors.js');

class Home extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <View style={Style.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                        <Text style={Style.headerText}>{this.props.headerText}</Text>
                    </View>
                </View>
                <ScrollView>
                    <Text>Scroll</Text>
                </ScrollView>
            </View>
        );
    }
}

Home.propTypes ={
    headerText: PropTypes.string
};

const Style = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width,
        paddingTop: 35,
        paddingBottom: 12,
        backgroundColor: COLORS.BACKCOLOR,
        borderBottomColor: COLORS.BORDERCOLOR,
        borderBottomWidth: 2,
        elevation: 5,
        shadowColor: COLORS.SHADOWCOLOR,
        shadowOpacity: 100
    },
    headerText: {
        color: COLORS.TEXTCOLOR,
        fontSize: 24,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        includeFontPadding: false,
        textShadowOffset: {
            width: 2,
            height: 2,
        },
        textShadowColor: COLORS.SHADOWCOLOR,
        textShadowRadius: 2
    }
});

export default Home;