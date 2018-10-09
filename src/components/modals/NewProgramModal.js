import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  CheckBox,
  TextInput,
  Picker
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newProgram } from "../../redux/actions/programsActions";

const STYLE = require("./modalStyle");
const COLORS = require("../../styles/Colors");

const TEXT_ENTRY_WIDTH = 160;
const PICKER_WIDTH = 160;

class NewProgramModal extends Component {
  state = {
    tmpCurrentProgram: true,
    tmpName: "New Program " + this.props.programs.length,
    tmpTemplate: 0,
    tmpCategory: 0,
    tmpDescription: "",
    tmpFavorite: true
  };

  updateTmpName = tmpName => {
    const index = this.props.programs.length;
    const title = "New Program " + index;
    if (tmpName == null) {
      this.setState({ tmpName: title });
    } else {
      this.setState({ tmpName: tmpName });
    }
  };

  updateTmpTemplate = program => {
    this.setState({ tmpTemplate: program });
  };

  updateTmpCategory = category => {
    this.setState({ tmpCategory: category });
  };

  toggleFavorite = checked => {
    this.setState({ tmpFavorite: checked });
  };

  cancel = () => {
    this.props.closeModal();
  };

  toggleCurrentProgram = checked => {
    this.setState({ tmpCurrentProgram: checked });
  };

  save = () => {
    const { closeModal, newProgram } = this.props;
    const {
      tmpCurrentProgram,
      tmpName,
      tmpTemplate,
      tmpCategory,
      tmpDescription,
      tmpFavorite
    } = this.state;

    newProgram(
      tmpCurrentProgram,
      tmpName,
      tmpTemplate,
      tmpCategory + 2,
      tmpDescription,
      tmpFavorite
    );

    closeModal();
  };

  render() {
    const { visible, programs, categories } = this.props;
    const {
      tmpCurrentProgram,
      tmpTemplate,
      tmpCategory,
      tmpFavorite
    } = this.state;
    const index = programs.length;
    const title = "New Program ";
    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={STYLE.modalCard}>
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>{title}</Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>
                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Current Program:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Name:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Template:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Category:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Favorite:</Text>
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
                      value={tmpCurrentProgram}
                      onValueChange={this.toggleCurrentProgram}
                    />
                  </View>
                  <View style={STYLE.rightItem}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        placeholder={title + index}
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
                      selectedValue={tmpTemplate}
                      onValueChange={this.updateTmpTemplate}
                    >
                      {createItems(programs)}
                    </Picker>
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

NewProgramModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  category: PropTypes.number,
  closeModal: PropTypes.func,
  programs: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  newProgram: PropTypes.func
};

const mapStateToProps = state => {
  return {
    programs: state.workoutData.programs,
    categories: state.workoutData.programCategories.slice(2)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newProgram: (
      current,
      name,
      templateId,
      categoryId,
      description,
      favorite
    ) => {
      dispatch(
        newProgram(current, name, templateId, categoryId, description, favorite)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProgramModal);
