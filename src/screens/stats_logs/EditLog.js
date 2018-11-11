import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  TextInput
} from "react-native";
import ScreenTemplate from "../templates/ScreenTemplate";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getEditLogCards,
  getLogTitle
} from "../../redux/selectors/logsSelectors";
import Icon from "react-native-vector-icons/FontAwesome5";
import FinishButton from "../../components/buttons/FinishButton";
import AddExerciseToWorkoutModal from "../../components/modals/AddExerciseToWorkoutModal";
import NoteModal from "../../components/modals/NoteModal";
import Fab from "../../components/buttons/Fab";
import NoteButton from "../../components/buttons/NoteButton";
import { cancelLogEdit } from "../../redux/actions/logsActions";

const COLORS = require("../../styles/Colors");
const STYLE = require("./editLogStyle");

class EditLog extends Component {
  state = {
    addExerciseModalVisible: false,
    noteModalVisible: false,
    tmpTitle: this.props.title
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    const { cancelLogEdit, navigation } = this.props;
    cancelLogEdit();
    navigation.goBack();
    return true;
  };
  _addExercisePress = () => {
    this.setState({ addExerciseModalVisible: true });
  };

  _notePress = () => {
    this.setState({ noteModalVisible: true });
  };

  _backArrow = () => {
    const { navigation, cancelLogEdit } = this.props;
    cancelLogEdit();
    navigation.goBack();
  };

  updateTmpTitle = title => {
    this.setState({ tmpTitle: title });
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
    const { addExerciseModalVisible, noteModalVisible, tmpTitle } = this.state;
    return (
      <ScreenTemplate
        headerContent={
          <View style={STYLE.headerContent}>
            <NoteModal
              closeModal={this.closeModal}
              visible={noteModalVisible}
            />
            <TouchableOpacity onPress={this._backArrow}>
              <Icon
                name={"arrow-left"}
                size={25}
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
              <TextInput
                style={[STYLE.headerText, { fontSize: 18, padding: 6 }]}
                keyboardAppearance="dark"
                placeholder={title}
                placeholderTextColor={"white"}
                onChangeText={this.updateTmpTitle}
                maxLength={30}
                width={200}
              />

              <FinishButton logEdit newTitle={tmpTitle} />
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
  navigation: PropTypes.object,
  cancelLogEdit: PropTypes.func
};

const mapStateToProps = state => {
  return {
    title: getLogTitle(state.workoutData),
    cards: getEditLogCards(state.workoutData)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelLogEdit: () => {
      dispatch(cancelLogEdit());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLog);
