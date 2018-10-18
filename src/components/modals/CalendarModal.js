import React, { Component } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { updateSelectedLogDate } from "../../redux/actions/logsActions";

const STYLE = require("./modalStyle");
const COLORS = require("../../styles/Colors");

class CalendarModal extends Component {
  state = {};

  componentDidMount() {
    this.onDateChange(moment(new Date()));
  }

  save = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  cancel = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  parseDate = dateString => {
    return moment(dateString);
  };

  onDateChange = date => {
    const formattedDate = date.format("YYYY-MM-DD");
    this.props.updateSelectedLogDate(formattedDate);
  };

  render() {
    const { visible, selectedDate } = this.props;
    const initialDate = this.parseDate(selectedDate);
    return (
      <View>
        <Modal transparent visible={visible} onRequestClose={this.cancel}>
          <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: COLORS.PRIMARYCOLOR,
                  padding: 12,
                  borderRadius: 5
                }}
              >
                <CalendarPicker
                  selectedStartDate={initialDate}
                  initialDate={initialDate}
                  selectedDayTextColor={"black"}
                  todayBackgroundColor={COLORS.INACTIVECOLOR}
                  selectedDayColor={COLORS.SECONDARYCOLOR}
                  textStyle={{
                    color: "white"
                  }}
                  onDateChange={this.onDateChange}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

CalendarModal.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  selectedDate: PropTypes.string,
  updateSelectedLogDate: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedLogDate: date => {
      dispatch(updateSelectedLogDate(date));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CalendarModal);
