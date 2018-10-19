import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  CheckBox,
  TextInput,
  Picker,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const STYLE = require("./modalStyle");
const COLORS = require("../../styles/Colors");

const TEXT_ENTRY_WIDTH = 60;
const PICKER_WIDTH = 150;

class AddMeasurementModal extends Component {
  state = {
    tmpCategory: 0,
    tmpAmmount: 0,
    tmpUnits: 0
  };

  updateTmpCategory = category => {
    this.setState({
      tmpCategory: category,
      tmpUnits: this.props.categories[category - 1].units
    });
  };

  updateTmpAmmount = ammount => {
    this.setState({ tmpAmmount: ammount });
  };

  cancel = () => {
    this.props.closeModal();
  };

  save = () => {
    const { closeModal } = this.props;
    const { tmpCategory } = this.state;

    closeModal();
  };

  render() {
    const { visible, categories, units } = this.props;
    const { tmpCategory, tmpUnits } = this.state;
    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={STYLE.modalCard}>
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>Add Measurement</Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>
                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Measurement:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Ammount:</Text>
                  </View>
                </View>

                <View
                  style={[
                    STYLE.rightColumn,
                    { alignItems: "center", paddingRight: 6 }
                  ]}
                >
                  <View style={STYLE.rightItem}>
                    <Picker
                      style={[STYLE.picker, { width: PICKER_WIDTH }]}
                      selectedValue={tmpCategory}
                      onValueChange={this.updateTmpCategory}
                    >
                      {createItems(categories)}
                    </Picker>
                  </View>
                  <View style={[STYLE.rightItem, { marginRight: 50 }]}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        keyboardType="numeric"
                        placeholder={"0"}
                        placeholderTextColor={COLORS.INACTIVECOLOR}
                        onChangeText={this.updateTmpAmmount}
                        maxLength={4}
                        width={TEXT_ENTRY_WIDTH}
                      />
                    </View>
                    <Text
                      style={[
                        STYLE.modalText,
                        { marginBottom: 0, marginLeft: 12 }
                      ]}
                    >
                      {units[tmpUnits].name}
                    </Text>
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

AddMeasurementModal.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.object),
  units: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => {
  return {
    categories: state.workoutData.measurementCategories.slice(1),
    units: state.workoutData.units
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMeasurementModal);
