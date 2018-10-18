import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import ExerciseSummaryModal from "../modals/ExerciseSummaryModal";

const COLORS = require("../../styles/Colors");
const STYLE = require("./cardStyle");

class ExerciseSummaryItem extends Component {
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
    const { name, sets, libraryId, summary } = this.props;
    const { menuModalVisible } = this.state;

    return (
      <View>
        <ExerciseSummaryModal
          title={name}
          visible={menuModalVisible}
          closeModal={this.closeMenuModal}
          libraryId={libraryId}
          sets={sets}
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
            <TouchableOpacity>
              <Text style={STYLE.title}>{name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onMenuPress}>
              <Icon
                name={"ellipsis-h"}
                size={25}
                color={COLORS.SECONDARYCOLOR}
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={STYLE.listItemDetails}>{summary}</Text>
        </View>
      </View>
    );
  }
}

ExerciseSummaryItem.propTypes = {
  name: PropTypes.string,
  libraryId: PropTypes.number,
  sets: PropTypes.arrayOf(PropTypes.object),
  summary: PropTypes.string
};

export default ExerciseSummaryItem;
