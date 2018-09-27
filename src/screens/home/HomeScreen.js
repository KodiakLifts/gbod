import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import NavigateIconButton from '../../components/buttons/NavigateIconButton';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const scrollContent = [];

class Home extends Component {
    render() {
        return (
            <ScreenTemplate
                headerContent={
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                        <Text style={TEXTSTYLE.headerText}>
                            Home
                        </Text>
                        <NavigateIconButton iconName="cog" iconSize={28} />
                    </View>
                }
                scrollContent={scrollContent} />
        );
    }
}

export default Home;