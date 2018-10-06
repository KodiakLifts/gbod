import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ExerciseOptionsModal from '../modals/ExerciseOptionsModal';

const COLORS = require('../../styles/Colors');
const STYLE = require('./cardStyle');

class ExerciseItem extends Component {
  state = {
    menuModalVisible: false,
  }

  _onMenuPress = () => {
    this.setState({ menuModalVisible: true });
  }

  closeMenuModal = () => {
    this.setState({ menuModalVisible: false });
  }

  render() {
    const { name, category, bodyPart, favorite, oneRepMax, libraryId } = this.props;
    const { menuModalVisible } = this.state;

    return (
      <View>
        <ExerciseOptionsModal
          title={name}
          visible={menuModalVisible}
          closeModal={this.closeMenuModal}
          libraryId={libraryId}
          category={category}
          bodyPart={bodyPart}
          favorite={favorite}
          oneRepMax={oneRepMax}
        />
        <View style={STYLE.listItem}>
          <TouchableOpacity>
            <Text style={STYLE.title}>{name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onMenuPress}>
            <Icon
              name={'ellipsis-h'}
              size={25}
              color={COLORS.SECONDARYCOLOR}
              style={{ marginRight: 12 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

ExerciseItem.propTypes = {
  name: PropTypes.string,
  libraryId: PropTypes.number,
  category: PropTypes.number,
  bodyPart: PropTypes.number,
  favorite: PropTypes.bool,
  oneRepMax: PropTypes.number
};

export default ExerciseItem;
