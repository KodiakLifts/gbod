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
import {
  updateMeasurement,
  deleteMeasurement
} from "../../redux/actions/logsActions";

const STYLE = require("./modalStyle");
const COLORS = require("../../styles/Colors");

const TEXT_ENTRY_WIDTH = 60;
const PICKER_WIDTH = 150;

class EditMeasurementModal extends Component {
  state = {
    tmpCategory: this.props.measurements[0].measurementCategory,
    tmpAmmount: this.props.measurements[0].ammount,
    tmpPlaceHolder: this.props.measurements[0].ammount,
    tmpUnits: this.props.categories[
      this.props.measurements[0].measurementCategory
    ].units,
    tmpDelete: false
  };

  componentWillReceiveProps(newProps) {}

  toggleRemove = checked => {
    this.setState({ tmpDelete: checked });
  };

  updateTmpCategory = category => {
    this.setState({
      tmpCategory: category,
      tmpAmmount: this.props.measurements.find(m => {
        return m.measurementCategory === category;
      }).ammount,
      tmpUnits: this.props.categories[category].units,
      tmpPlaceHolder: this.props.measurements.find(m => {
        return m.measurementCategory === category;
      }).ammount
    });
  };

  updateTmpAmmount = ammount => {
    this.setState({ tmpAmmount: parseInt(ammount) });
  };

  cancel = () => {
    this.props.closeModal();
  };

  save = () => {
    const {
      logId,
      categories,
      measurements,
      closeModal,
      updateMeasurement,
      deleteMeasurement
    } = this.props;
    const { tmpCategory, tmpAmmount, tmpDelete } = this.state;
    const measurementId = measurements.find(m => {
      return m.measurementCategory === tmpCategory;
    }).id;

    if (tmpDelete) {
      Alert.alert(
        "Delete Measurement",
        "Are you sure you want to delete " +
          categories[tmpCategory].name +
          " from this log?",
        [
          {
            text: "CONFIRM",
            onPress: () => deleteMeasurement(logId, measurementId)
          },
          {
            text: "CANCEL",
            onPress: () => this.setState({ tmpDelete: false }),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else {
      updateMeasurement(logId, measurementId, tmpAmmount);
    }
    this.setState({ tmpDelete: false });
    closeModal();
  };

  render() {
    const { visible, categories, units, measurements } = this.props;
    const {
      tmpAmmount,
      tmpCategory,
      tmpUnits,
      tmpDelete,
      tmpPlaceHolder
    } = this.state;
    return (
      <Modal transparent visible={visible} onRequestClose={this.cancel}>
        <TouchableOpacity onPress={this.cancel} style={STYLE.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={STYLE.modalCard}>
              <View style={STYLE.modalHeader}>
                <Text style={STYLE.modalHeaderText}>Edit Measurement</Text>
              </View>
              <View style={STYLE.cardColumnsContainer}>
                <View style={[STYLE.leftColumn, { marginLeft: 6 }]}>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Measurement:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Ammount:</Text>
                  </View>
                  <View style={STYLE.leftItem}>
                    <Text style={STYLE.modalText}>Delete:</Text>
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
                      {createItems(measurements, categories)}
                    </Picker>
                  </View>
                  <View style={[STYLE.rightItem, { marginRight: 50 }]}>
                    <View style={STYLE.textInputContainer}>
                      <TextInput
                        style={STYLE.modalTextInput}
                        keyboardAppearance="dark"
                        keyboardType="numeric"
                        placeholder={String(tmpPlaceHolder)}
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
                  <View style={[STYLE.rightItem, { marginRight: 78 }]}>
                    <CheckBox
                      value={tmpDelete}
                      onValueChange={this.toggleRemove}
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

const createItems = (items, categories) => {
  return items.map((item, index) => {
    return (
      <Picker.Item
        key={index}
        label={categories[item.measurementCategory].name}
        value={categories[item.measurementCategory].id}
      />
    );
  });
};

EditMeasurementModal.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.object),
  units: PropTypes.arrayOf(PropTypes.object),
  logId: PropTypes.number,
  measurements: PropTypes.arrayOf(PropTypes.object),
  updateMeasurement: PropTypes.func,
  deleteMeasurement: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.workoutData.measurementCategories,
    units: state.workoutData.units,
    measurements: state.workoutData.measurementLogs[ownProps.logId].measurements
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMeasurement: (logId, measurementId, ammount) => {
      dispatch(updateMeasurement(logId, measurementId, ammount));
    },
    deleteMeasurement: (logId, measurementId) => {
      dispatch(deleteMeasurement(logId, measurementId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMeasurementModal);
