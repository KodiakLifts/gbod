import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import ExerciseSummaryModal from "../modals/ExerciseSummaryModal";

const COLORS = require("../../styles/Colors");
const STYLE = require("./cardStyle");

class MeasurementsItem extends Component {
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
    const { logId, measurements } = this.props;
    const { menuModalVisible } = this.state;

    return (
      <View>
        <ExerciseSummaryModal
          title={"Measurements"}
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
            <TouchableOpacity>
              <Text style={STYLE.title}>Measurements</Text>
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
          <Text style={STYLE.listItemDetails}>{measurements}</Text>
        </View>
      </View>
    );
  }
}

MeasurementsItem.propTypes = {
  logId: PropTypes.number,
  measurements: PropTypes.string
};

export default MeasurementsItem;
