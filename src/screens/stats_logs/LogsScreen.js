import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import PropTypes from "prop-types";
import SubScreenTemplate from "../templates/SubScreenTemplate";
import { getLogCards } from "../../redux/selectors/logsSelectors";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import CalendarModal from "../../components/modals/CalendarModal";
import moment from "moment";
import Fab from "../../components/buttons/Fab";
import AddMeasurementModal from "../../components/modals/AddMeasurementModal";
import { deleteLog } from "../../redux/actions/logsActions";

const STYLE = require("./SLStyle");
const COLORS = require("../../styles/Colors");

class Logs extends Component {
  state = {
    calendarVisible: false,
    measurementModalVisible: false
  };

  parseDate = dateString => {
    return moment(dateString).format("MMM Do, YYYY");
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

  _deleteLog = () => {
    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete all logs for this date?",
      [
        {
          text: "CONFIRM",
          onPress: () => this.props.deleteLog(this.props.selectedDate)
        },
        { text: "CANCEL", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  render() {
    const { selectedDate, cards, anyLogsSelectedDate } = this.props;
    const { calendarVisible, measurementModalVisible } = this.state;
    return (
      <SubScreenTemplate
        headerContent={
          <View style={[STYLE.subHeader, { justifyContent: "space-between" }]}>
            <TouchableOpacity
              onPress={this._showCalendar}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 12,
                marginVertical: 6
              }}
            >
              <Icon
                name={"calendar-alt"}
                size={22}
                color={COLORS.SECONDARYCOLOR}
              />
              <Text style={STYLE.headerText}>
                {this.parseDate(selectedDate)}
              </Text>
            </TouchableOpacity>
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
              disabled={!anyLogsSelectedDate}
              onPress={this._deleteLog}
              style={{ marginRight: 12 }}
            >
              <Icon name={"trash"} size={22} color={COLORS.SECONDARYCOLOR} />
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
  selectedDate: PropTypes.string,
  deleteLog: PropTypes.func,
  anyLogsSelectedDate: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    cards: getLogCards(state.workoutData),
    selectedDate: state.workoutData.selectedLogDate,
    anyLogsSelectedDate: state.workoutData.anyLogsSelectedDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteLog: date => {
      dispatch(deleteLog(date));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logs);
