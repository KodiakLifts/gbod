import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { setSelectedLogId } from "../../redux/actions/logsActions";

const COLORS = require("../../styles/Colors");
const STYLE = require("./cardStyle");

class LogItem extends Component {
  _edit = () => {
    const { navigation, setSelectedLogId, logId } = this.props;
    setSelectedLogId(logId);
    navigation.navigate("EditLog");
  };
  render() {
    const { logTitle } = this.props;
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

            <TouchableOpacity onPress={this._edit}>
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
  }
}

LogItem.propTypes = {
  logId: PropTypes.number,
  logTitle: PropTypes.string,
  navigation: PropTypes.object,
  setSelectedLogId: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedLogId: logId => {
      dispatch(setSelectedLogId(logId));
    }
  };
};

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(LogItem)
);
