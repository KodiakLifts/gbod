import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ScreenTemplate from "../templates/ScreenTemplate";
import Icon from "react-native-vector-icons/FontAwesome5";

const COLORS = require("../../styles/Colors");
const TEXTSTYLE = require("../../styles/TextStyle");
const scrollContent = [];

class EditLog extends Component {
  _onPress = () => {
    console.log(this.props.navigation.getParam("logId"));
  };
  render() {
    return (
      <ScreenTemplate
        headerContent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15
            }}
          >
            <Text style={TEXTSTYLE.headerText}>EditLog</Text>
            <TouchableOpacity onPress={this._onPress}>
              <Icon name="home" size={28} color={COLORS.SECONDARYCOLOR} />
            </TouchableOpacity>
          </View>
        }
        scrollContent={scrollContent}
      />
    );
  }
}

export default EditLog;
