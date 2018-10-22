import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import { withNavigation } from "react-navigation";

const COLORS = require("../../styles/Colors");
const STYLE = require("./cardStyle");

const LogItem = props => {
  const { logTitle, navigation } = props;
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
            {logTitle}
          </Text>

          <TouchableOpacity onPress={_edit(navigation)}>
            <Icon
              name={"pen"}
              size={22}
              color={COLORS.SECONDARYCOLOR}
              style={{ marginRight: 12 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const _edit = navigation => {
  navigation.navigate("EditLog");
};

LogItem.propTypes = {
  logId: PropTypes.number,
  logTitle: PropTypes.string,
  navigation: PropTypes.object
};

export default withNavigation(LogItem);
