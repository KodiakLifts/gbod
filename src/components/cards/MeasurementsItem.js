import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import EditMeasurementModal from "../modals/EditMeasurementModal";

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

  renderLabels = labels => {
    return labels.map((label, index) => {
      return (
        <Text
          key={index}
          style={[STYLE.listItemDetails, { textAlign: "left" }]}
        >
          {label}
        </Text>
      );
    });
  };

  renderMeasures = measurements => {
    return measurements.map((measure, index) => {
      return (
        <Text
          key={index}
          style={[STYLE.listItemDetails, { textAlign: "left" }]}
        >
          {measure}
        </Text>
      );
    });
  };

  render() {
    const { logId, labels, measurements } = this.props;
    const { menuModalVisible } = this.state;

    return (
      <View>
        <EditMeasurementModal
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
            <Text style={STYLE.title}>Measurements</Text>

            <TouchableOpacity onPress={this._onMenuPress}>
              <Icon
                name={"ellipsis-h"}
                size={25}
                color={COLORS.SECONDARYCOLOR}
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <View style={{ flexDirection: "column" }}>
              {this.renderLabels(labels)}
            </View>
            <View style={{ flexDirection: "column" }}>
              {this.renderMeasures(measurements)}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

MeasurementsItem.propTypes = {
  logId: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string),
  measurements: PropTypes.arrayOf(PropTypes.string)
};

export default MeasurementsItem;
