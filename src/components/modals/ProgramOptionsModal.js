import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  CheckBox,
  TextInput,
  Alert,
  Picker
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateProgram,
  deleteProgram
} from "../../redux/actions/programsActions";

const STYLE = require("./modalStyle");
const COLORS = require("../../styles/Colors");

const TEXT_ENTRY_WIDTH = 160;
const PICKER_WIDTH = 160;

class ProgramOptionsModal extends Component {
  state = {
    tmpCurrentProgram: this.props.isCurrentProgram,
    tmpName: this.props.title,
    tmpCategory: this.props.category,
    tmpFavorite: this.props.favorite,
    tmpDelete: false
  };

  componentWillReceiveProps(newProps) {
    if (this.props.isCurrentProgram !== newProps.isCurrentProgram) {
      this.setState({ tmpCurrentProgram: newProps.isCurrentProgram });
    }
    if (this.props.favorite !== newProps.favorite) {
      this.setState({ tmpFavorite: newProps.tmpFavorite });
    }
  }

  toggleFavorite = checked => {
    this.setState({ tmpFavorite: checked });
  };

  updateTmpCategory = categoryId => {
    this.setState({ tmpCategory: categoryId });
  };

  updateTmpName = tmpName => {
    if (tmpName == null) {
      this.setState({ tmpName: this.props.title });
    } else {
      this.setState({ tmpName: tmpName });
    }
  };

  cancel = () => {
    this.props.closeModal();
  };

  toggleCurrentProgram = checked => {
    this.setState({ tmpCurrentProgram: checked });
  };

  toggleDelete = checked => {
    this.setState({ tmpDelete: checked });
  };

  save = () => {
    const {
      updateProgramData,
      deleteProgram,
      programId,
      closeModal,
      title
    } = this.props;
    const {
      tmpCurrentProgram,
      tmpName,
      tmpDelete,
      tmpCategory,
      tmpFavorite
    } = this.state;

    if (tmpDelete) {
      Alert.alert(
        "Delete Exercise",
        "Are you sure you want to delete " +
          title +
          " from the programs library?",
        [
          { text: "CONFIRM", onPress: () => deleteProgram(programId) },
          {
            text: "CANCEL",
            onPress: () => this.setState({ tmpDelete: false }),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else {
      updateProgramData(
        programId,
        tmpCurrentProgram,
        tmpName,
        tmpCategory,
        tmpFavorite
      );
    }
    closeModal();
  };

  render() {
    const { visible, title, isCurrentProgram, categories } = this.props;
    const {
      tmpCurrentProgram,
      tmpDelete,
      tmpCategory,
      tmpFavorite
    } = this.state;
    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={STYLE.modalCard}>
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>{title} Options</Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>
                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Current Program:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Rename:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Category:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Favorite:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Delete Program:</Text>
                  </View>
                </View>

                <View
                  style={[
                    STYLE.rightColumn,
                    { alignItems: "center", paddingRight: 6 }
                  ]}
                >
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      disabled={isCurrentProgram}
                      value={tmpCurrentProgram}
                      onValueChange={this.toggleCurrentProgram}
                    />
                  </View>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        placeholder={title}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpName}
                        maxLength={30}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                  </View>
                  <View style={STYLE.rightItem}>
                    <Picker
                      style={[STYLE.picker, { width: PICKER_WIDTH }]}
                      selectedValue={tmpCategory}
                      onValueChange={this.updateTmpCategory}
                    >
                      {createItems(categories)}
                    </Picker>
                  </View>
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      value={tmpFavorite}
                      onValueChange={this.toggleFavorite}
                    />
                  </View>
                  <View style={STYLE.rightItem}>
                    <CheckBox
                      value={tmpDelete}
                      onValueChange={this.toggleDelete}
                    />
                  </View>
                </View>
              </View>

              <View style={STYLE.footer}>
                <TouchableOpacity onPress={this.cancel}>
                  <Text style={STYLE.selectedTextButton}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.save}>
                  <Text style={STYLE.selectedTextButton}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const createItems = items => {
  return items.map((item, index) => {
    return <Picker.Item key={index} label={item.name} value={item.id} />;
  });
};

ProgramOptionsModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  isCurrentProgram: PropTypes.bool,
  programId: PropTypes.number,
  category: PropTypes.number,
  closeModal: PropTypes.func,
  updateProgramData: PropTypes.func,
  deleteProgram: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.object),
  favorite: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    isCurrentProgram: state.workoutData.activeProgramId === ownProps.programId,
    categories: state.workoutData.programCategories.slice(2)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProgramData: (programId, current, name, category, favorite) => {
      dispatch(updateProgram(programId, current, name, category, favorite));
    },
    deleteProgram: programId => {
      dispatch(deleteProgram(programId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramOptionsModal);
