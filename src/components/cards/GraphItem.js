import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";

const STYLE = require("./cardStyle");
const COLORS = require("../../styles/Colors");

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
              COMING SOON!
            </Text>

            {/* <TouchableOpacity onPress={this._onMenuPress}>
              <Icon
                name={"pen"}
                size={22}
                color={COLORS.SECONDARYCOLOR}
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity> */}
          </View>
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
