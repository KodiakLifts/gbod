import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const COLORS = require('../../styles/Colors.js');

class ScreenTemplate extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <View style={Style.header}>
                    {this.props.headerContent}
                </View>
                <ScrollView contentContainerStyle={Style.scrollArea}>
                    {this.props.scrollContent}
                </ScrollView>
            </View>
        );
    }
}

ScreenTemplate.propTypes ={
    headerContent: PropTypes.object,
    scrollContent: PropTypes.object
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
    scrollArea: {
        flexGrow: 1,
        alignItems: 'center',
        width: Dimensions.get('window').width,
        backgroundColor: COLORS.BACKCOLOR
    }
});

export default ScreenTemplate;