import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

export default class EditSetModal extends Component {
  state = {
    modalVisible: false,
  }
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible}>
          onRequestClose = {() => { console.log("modal closed") }}>
          <View>
            <Text>
              MODAL OPEN
            </Text>
            <TouchableOpacity onPress={() => {
              this.toggleModal(!this.state.modalVisible)
            }}>
              <Text>CLOSE MODAL</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => { this.toggleModal(true) }}>
          <Text>OPEN MODAL</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
