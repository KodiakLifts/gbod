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
    measurementModalVisible: false,
    anyLogsSelectedDate: this.props.anyLogsSelectedDate
  };

  componentWillReceiveProps(newProps) {
    if (this.state.anyLogsSelectedDate !== newProps.anyLogsSelectedDate) {
      this.setState({ anyLogsSelectedDate: newProps.anyLogsSelectedDate });
    }
  }

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

  renderDeleteIcon = anyLogsSelectedDate => {
    if (anyLogsSelectedDate) {
      return (
        <TouchableOpacity onPress={this._deleteLog} style={{ marginRight: 12 }}>
          <Icon name={"minus-circle"} size={22} color={COLORS.SECONDARYCOLOR} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  render() {
    const { selectedDate, cards } = this.props;
    const {
      calendarVisible,
      measurementModalVisible,
      anyLogsSelectedDate
    } = this.state;
    return (
      <SubScreenTemplate
        headerContent={
          <View style={[STYLE.subHeader, { justifyContent: "space-between" }]}>
            <TouchableOpacity
              onPress={this._showCalendar}
              style={{
                flexDirection: "row",
                marginLeft: 4,
                marginVertical: 6
              }}
            >
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
            {this.renderDeleteIcon(anyLogsSelectedDate)}
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
