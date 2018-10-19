import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import SubScreenTemplate from "../templates/SubScreenTemplate";
import { getLogCards } from "../../redux/selectors/logsSelectors";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import CalendarModal from "../../components/modals/CalendarModal";
import moment from "moment";
import Fab from "../../components/buttons/Fab";
import AddMeasurementModal from "../../components/modals/AddMeasurementModal";

const STYLE = require("./SLStyle");
const COLORS = require("../../styles/Colors");

class Logs extends Component {
  state = {
    calendarVisible: false,
    measurementModalVisible: false
  };

  parseDate = dateString => {
    return moment(dateString).format("dddd, MMMM Do YYYY");
  };

  _showCalendar = () => {
    this.setState({ calendarVisible: true });
  };

  closeModal = () => {
    this.setState({
      calendarVisible: false,
      measurementModalVisible: false
    });
    this.forceUpdate();
  };

  _showAddMeasurement = () => {
    this.setState({ measurementModalVisible: true });
  };

  render() {
    const { selectedDate, cards } = this.props;
    const { calendarVisible, measurementModalVisible } = this.state;
    return (
      <SubScreenTemplate
        headerContent={
          <View style={STYLE.subHeader}>
            <CalendarModal
              visible={calendarVisible}
              closeModal={this.closeModal}
              selectedDate={selectedDate}
            />
            <AddMeasurementModal
              visible={measurementModalVisible}
              closeModal={this.closeModal}
            />
            <TouchableOpacity
              onPress={this._showCalendar}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 12,
                marginVertical: 6
              }}
            >
              <Icon name={"calendar"} size={22} color={COLORS.SECONDARYCOLOR} />
              <Text style={STYLE.headerText}>
                {this.parseDate(selectedDate)}
              </Text>
            </TouchableOpacity>
          </View>
        }
        scrollContent={cards}
        footer={<Fab onPress={this._showAddMeasurement} />}
      />
    );
  }
}

Logs.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  selectedDate: PropTypes.string
};

const mapStateToProps = state => {
  return {
    cards: getLogCards(state.workoutData),
    selectedDate: state.workoutData.selectedLogDate
  };
};

export default connect(mapStateToProps)(Logs);
