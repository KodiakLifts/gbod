import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import MoreMenu from '../../components/buttons/MoreMenu';

const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');
const menuItems = [{ name: "option 1" }, { name: "option 2" }];

class Workout extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false
        };

        this.showMenu = this.showMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({
            showMenu: true,
        });
    }

    render() {
        return (
            <ScreenTemplate
                headerContent={
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                        <Text style={TEXTSTYLE.headerText}>
                            GreySkull LP
                        </Text>
                        <MoreMenu options={menuItems} />
                    </View>
                }
                scrollContent={
                    <Text>Scroll Area</Text>
                }
            />
        );
    }
}

Workout.propTypes = {
    programName: PropTypes.string
}

export default Workout;