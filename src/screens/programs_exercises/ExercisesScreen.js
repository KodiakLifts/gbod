import React, { Component } from 'react';
import { View, Picker } from 'react-native';
import SubScreenTemplate from '../templates/SubScreenTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const STYLE = require('./PEStyle');

class Exercises extends Component {
  state = {
    tmpCategory: 0,
    tmpBodyPart: 0
  }

  render() {
    const { categories, bodyParts } = this.props;
    const { tmpCategory, tmpBodyPart } = this.state;
    return (
      <SubScreenTemplate
        headerContent={
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Picker
              style={STYLE.pickerHalf}
              selectedValue={tmpCategory}
            >
              {createItems(categories)}
            </Picker>
            <Picker
              style={STYLE.pickerHalf}
              selectedValue={tmpBodyPart}
            >
              {createItems(bodyParts)}
            </Picker>

          </View>
        }
        scrollContent={[]}
      />
    );
  }
}

const createItems = (items) => {
  return items.map((item, index) =>
    <Picker.Item key={index} label={item.name} value={item.id} />);
};

Exercises.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  bodyParts: PropTypes.arrayOf(PropTypes.object),
  cards: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
  return {
    categories: state.workoutData.exerciseCategories,
    bodyParts: state.workoutData.bodyParts
    //cards: getLexicalCards(state.workoutData)
  };
};
export default connect(mapStateToProps)(Exercises);