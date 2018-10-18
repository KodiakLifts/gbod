import React, { Component } from "react";
import { View, TouchableOpacity, Picker, Text } from "react-native";
import ScreenTemplate from "../templates/ScreenTemplate";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getActiveWorkoutCards,
  getActiveWorkoutTitle
} from "../../redux/selectors/activeWorkoutSelectors";
import Icon from "react-native-vector-icons/FontAwesome5";
import FinishButton from "../../components/buttons/FinishButton";
import SetTimer from "../../components/timers/SetTimer";
import EditDayModal from "../../components/modals/EditDayModal";
import NewDayModal from "../../components/modals/NewDayModal";
import AddExerciseToWorkoutModal from "../../components/modals/AddExerciseToWorkoutModal";
import NoteModal from "../../components/modals/NoteModal";
import Fab from "../../components/buttons/Fab";
import NoteButton from "../../components/buttons/NoteButton";
import {
  updateActiveDay,
  dayBarPress,
  shiftDayDown,
  shiftDayUp
} from "../../redux/actions/activeWorkoutActions";

const COLORS = require("../../styles/Colors");
const STYLE = require("./workoutStyle");

let prevDay;
let prevDays;

class ActiveWorkout extends Component {
  state = {
    editDayModalVisible: false,
    newDayModalVisible: false,
    addExerciseModalVisible: false,
    noteModalVisible: false,
    day: this.props.activeDay,
    days: this.props.days
  };

  componentDidMount() {
    prevDay = this.props.activeDay;
    prevDays = this.props.days;
  }

  componentWillReceiveProps(newProps) {
    if (this.state.day !== newProps.activeDay) {
      this.setState({ day: newProps.activeDay });
    }
    if (this.state.days !== newProps.days) {
      this.setState({ days: newProps.days });
    }
  }

  switchDay = dayId => {
    let nameChange = false;
    if (this.state.days.length === prevDays.length) {
      for (let i = 0; i < this.state.days.length; i++) {
        if (this.state.days[i].name !== prevDays[i].name) {
          nameChange = true;
          break;
        }
      }
    }
    if (nameChange) {
      prevDays = this.state.days;
      this.setState({ day: prevDay });
    } else {
      prevDay = dayId;
      this.props.updateActiveDay(dayId);
    }
  };

  _addExercisePress = () => {
    this.setState({ addExerciseModalVisible: true });
  };

  _newDayPress = () => {
    this.setState({ newDayModalVisible: true });
  };

  _dayMenuPress = () => {
    this.setState({ editDayModalVisible: true });
  };

  _notePress = () => {
    this.setState({ noteModalVisible: true });
  };

  closeModal = () => {
    this.setState({
      editDayModalVisible: false,
      newDayModalVisible: false,
      addExerciseModalVisible: false,
      noteModalVisible: false
    });
  };

  renderControls = (day, days, dayBarActive) => {
    const lastDay = day === days.length - 1 ? true : false;
    const firstDay = day === 0 ? true : false;
    if (dayBarActive) {
      return (
        <View style={STYLE.menuPlusContainer}>
          <FinishButton />
          {this.renderShiftDown(lastDay)}
          {this.renderShiftUp(firstDay)}
          <TouchableOpacity
            onPress={this._newDayPress}
            style={{ margin: 1, paddingHorizontal: 5 }}
          >
            <Icon name={"plus"} size={23} color={COLORS.SECONDARYCOLOR} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._dayMenuPress}
            style={{ margin: 1, paddingLeft: 5 }}
          >
            <Icon name={"ellipsis-h"} size={25} color={COLORS.SECONDARYCOLOR} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={STYLE.menuPlusContainerCollapsed}>
          <FinishButton />
        </View>
      );
    }
  };

  renderShiftDown = lastExercise => {
    if (!lastExercise) {
      return (
        <TouchableOpacity
          onPress={this._shiftDayDown}
          style={{ margin: 1, paddingHorizontal: 5 }}
        >
          <Icon name={"angle-down"} size={27} color={COLORS.SECONDARYCOLOR} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  renderShiftUp = firstExercise => {
    if (!firstExercise) {
      return (
        <TouchableOpacity
          onPress={this._shiftDayUp}
          style={{ margin: 1, paddingHorizontal: 5 }}
        >
          <Icon name={"angle-up"} size={27} color={COLORS.SECONDARYCOLOR} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  _shiftDayDown = () => {
    const { shiftDayDown, activeDay } = this.props;
    shiftDayDown(activeDay);
  };

  _shiftDayUp = () => {
    const { shiftDayUp, activeDay } = this.props;
    shiftDayUp(activeDay);
  };

  _dayBarPress = () => {
    this.props.dayBarPress();
  };

  deactivateDayBar = () => {
    this.props.dayBarPress();
  };

  render() {
    const { title, cards, dayBarActive } = this.props;
    const {
      editDayModalVisible,
      newDayModalVisible,
      addExerciseModalVisible,
      noteModalVisible,
      day,
      days
    } = this.state;
    return (
      <ScreenTemplate
        headerContent={
          <View style={STYLE.headerContent}>
            <TouchableOpacity>
              <Text style={STYLE.headerText}>{title}</Text>
            </TouchableOpacity>
            <NoteModal
              closeModal={this.closeModal}
              visible={noteModalVisible}
            />
            <View style={STYLE.timerSettingsContainer}>
              <SetTimer />
              <NoteButton onPress={this._notePress} />
            </View>
          </View>
        }
        subHeaderContent={
          <TouchableOpacity activeOpacity={0.6} onPress={this._dayBarPress}>
            <View
              style={dayBarActive ? STYLE.subHeaderHighlight : STYLE.subHeader}
            >
              <Picker
                style={STYLE.picker}
                selectedValue={day}
                onValueChange={this.switchDay}
              >
                {createItems(days)}
              </Picker>
              <EditDayModal
                closeModal={this.closeModal}
                visible={editDayModalVisible}
              />
              <NewDayModal
                closeModal={this.closeModal}
                visible={newDayModalVisible}
              />
              <AddExerciseToWorkoutModal
                closeModal={this.closeModal}
                visible={addExerciseModalVisible}
              />
              {this.renderControls(day, days, dayBarActive)}
            </View>
          </TouchableOpacity>
        }
        scrollContent={cards}
        footer={<Fab onPress={this._addExercisePress} />}
      />
    );
  }
}

const createItems = items => {
  return items.map((item, index) => (
    <Picker.Item key={index} label={item.name} value={item.id} />
  ));
};

ActiveWorkout.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  days: PropTypes.arrayOf(PropTypes.object),
  activeDay: PropTypes.number,
  updateActiveDay: PropTypes.func,
  dayBarActive: PropTypes.bool,
  dayBarPress: PropTypes.func,
  shiftDayDown: PropTypes.func,
  shiftDayUp: PropTypes.func
};

const mapStateToProps = state => {
  return {
    title: getActiveWorkoutTitle(state.workoutData),
    cards: getActiveWorkoutCards(state.workoutData),
    activeDay: state.workoutData.activeWorkout.day,
    dayBarActive: state.workoutData.activeWorkout.dayBarActive,
    days:
      state.workoutData.programs[state.workoutData.activeWorkout.program].days
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveDay: dayId => {
      dispatch(updateActiveDay(dayId));
    },
    dayBarPress: () => {
      dispatch(dayBarPress());
    },
    shiftDayDown: dayId => {
      dispatch(shiftDayDown(dayId));
    },
    shiftDayUp: dayId => {
      dispatch(shiftDayUp(dayId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveWorkout);
