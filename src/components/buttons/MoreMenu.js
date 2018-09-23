import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const COLORS = require("../../styles/Colors");
const TEXTSTYLE = require("../../styles/TextStyle");

class MoreMenu extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false
        };

        this.showMenu = this.showMenu.bind(this);
    }

    showMenu = (visible) => (e) => {
        e.preventDefault();

        this.setState({ showMenu: visible });
    }

    render() {
        return (
            <View>
            <TouchableWithoutFeedback onPress={this.showMenu(false)}>
                <View>
                <Modal
                    transparent={true}
                    visible={this.state.showMenu}
                    onRequestClose={this.showMenu(false)}
                >
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            flexDirection: 'column',
                            width: 200,
                            alignSelf: 'flex-start',
                            padding: 10,
                            backgroundColor: COLORS.PRIMARYCOLOR,
                            elevation: 4

                        }}>
                            <Text>
                                Hello World
                            </Text>

                        </View>
                        <TouchableOpacity onPress={this.showMenu(false)}>
                        </TouchableOpacity>
                    </View>

                </Modal>
                <TouchableOpacity onPress={this.showMenu(true)}>
                    <Icon style={TEXTSTYLE.icon} name="ellipsis-v" size={28} color={COLORS.SECONDARYCOLOR} />
                </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default MoreMenu;