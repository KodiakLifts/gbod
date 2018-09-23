import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

const COLORS = require("../../styles/Colors");
const TEXTSTYLE = require("../../styles/TextStyle");
const CONTAINERSTYLE = require("../../styles/ContainerStyle");

class MoreMenu extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
      options: []
    };

    this.showMenu = this.showMenu.bind(this);
  }

  componentDidMount() {
    this.mapOptions(this.props.options);
  }

  mapOptions = (options) => {
    this.setState({
      options: options.map(item => {
        return (
          <TouchableOpacity key={item}>
            <Text style={{ color: 'white' }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })
    });
  }

  showMenu = (visible) => (e) => {
    e.preventDefault();

    this.setState({ showMenu: visible });
  }

  render() {
    return (
      <View>
        <View>
          <Modal
            transparent
            visible={this.state.showMenu}
            onRequestClose={this.showMenu(false)}
          >
            <TouchableWithoutFeedback onPress={this.showMenu(false)}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.TRANSPARENTOVERLAY
              }}>
                <View style={CONTAINERSTYLE.moreMenu}>
                  {this.state.options}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <TouchableOpacity onPress={this.showMenu(true)}>
            <Icon style={TEXTSTYLE.icon} name="ellipsis-v" size={28} color={COLORS.SECONDARYCOLOR} />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

MoreMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,

  }))
};



export default MoreMenu;