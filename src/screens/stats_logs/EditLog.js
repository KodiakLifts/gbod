import React, { Component } from "react";
import { View, TouchableOpacity, Picker, Text, Dimensions } from "react-native";
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
const STYLE = require("./editLogStyle");

let prevDay;
let prevDays;

class EditLog extends Component {
  state = {
    addExerciseModalVisible: false,
    noteModalVisible: false,
    day: this.props.activeDay
  };

  componentWillReceiveProps(newProps) {}

  _addExercisePress = () => {
    this.setState({ addExerciseModalVisible: true });
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

  render() {
    const { title, cards } = this.props;
    const { addExerciseModalVisible, noteModalVisible } = this.state;
    return (
      <ScreenTemplate
        headerContent={
          <View style={STYLE.headerContent}>
            <NoteModal
              closeModal={this.closeModal}
              visible={noteModalVisible}
            />
            <TouchableOpacity>
              <Icon
                name={"arrow-left"}
                size={22}
                color={COLORS.SECONDARYCOLOR}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={STYLE.headerText}>EDIT LOG</Text>
            </TouchableOpacity>

            <NoteButton onPress={this._notePress} />
          </View>
        }
        subHeaderContent={
          <TouchableOpacity activeOpacity={0.6} onPress={this._dayBarPress}>
            <View style={STYLE.subHeader}>
              <Text style={[STYLE.headerText, { fontSize: 18, padding: 6 }]}>
                {title}
              </Text>
              <FinishButton />
              <AddExerciseToWorkoutModal
                closeModal={this.closeModal}
                visible={addExerciseModalVisible}
              />
            </View>
          </TouchableOpacity>
        }
        scrollContent={cards}
        footer={<Fab onPress={this._addExercisePress} />}
      />
    );
  }
}

EditLog.propTypes = {
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
)(EditLog);
