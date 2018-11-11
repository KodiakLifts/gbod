import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";

const STYLE = require("./cardStyle");
const COLORS = require("../../styles/Colors");

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

class GraphItem extends Component {
  render() {
    const { headerTitle, items } = this.props;
    return (
      <View>
        <View
          style={{
            flexDirection: "column",
            borderBottomColor: COLORS.BACKCOLOR,
            borderBottomWidth: 1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Text style={[STYLE.title, { color: COLORS.TEXTCOLOR }]}>
              Current Exercises
            </Text>

            <TouchableOpacity onPress={this._onMenuPress}>
              <Icon
                name={"pen"}
                size={22}
                color={COLORS.SECONDARYCOLOR}
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5fcff"
            }}
          />
        </View>
      </View>
    );
  }
}

GraphItem.propTypes = {
  headerTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default GraphItem;
