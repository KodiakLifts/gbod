import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import ExerciseSummaryModal from "../modals/ExerciseSummaryModal";

const COLORS = require("../../styles/Colors");
const STYLE = require("./cardStyle");

class NotesItem extends Component {
  state = {
    menuModalVisible: false
  };

  _onMenuPress = () => {
    this.setState({ menuModalVisible: true });
  };

  closeMenuModal = () => {
    this.setState({ menuModalVisible: false });
  };

  render() {
    const { logId, notes } = this.props;
    const { menuModalVisible } = this.state;

    return (
      <View>
        <ExerciseSummaryModal
          title={"Notes"}
          visible={menuModalVisible}
          closeModal={this.closeMenuModal}
          logId={logId}
        />
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
            <Text style={STYLE.title}>Notes</Text>

            <TouchableOpacity onPress={this._onMenuPress}>
              <Icon
                name={"ellipsis-h"}
                size={25}
                color={COLORS.SECONDARYCOLOR}
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={STYLE.listItemDetails}>{notes}</Text>
        </View>
      </View>
    );
  }
}

NotesItem.propTypes = {
  logId: PropTypes.number,
  notes: PropTypes.string
};

export default NotesItem;
