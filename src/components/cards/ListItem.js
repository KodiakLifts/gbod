import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProgramOptionsModal from '../modals/ProgramOptionsModal';

const COLORS = require('../../styles/Colors');
const STYLE = require('./cardStyle');

class ListItem extends Component {
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
    const { name, programId } = this.props;
    const { menuModalVisible } = this.state;
    return (
      <View>
        <ProgramOptionsModal
          title={name}
          visible={menuModalVisible}
          programId={programId}
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

ListItem.propTypes = {
  name: PropTypes.string,
  programId: PropTypes.number
};

export default ListItem;