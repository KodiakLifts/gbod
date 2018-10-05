import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ExerciseOptionsModal from '../modals/ProgramOptionsModal';

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
    const { name } = this.props;
    const { menuModalVisible } = this.state;

    return (
      <View>
        <ExerciseOptionsModal
          title={name}
          visible={menuModalVisible}
          closeModal={this.closeMenuModal}
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
  name: PropTypes.string
};
