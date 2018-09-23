import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Search' };
  }

  render() {
    return (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => this.setState({ text })}
        value={this.state.text}
      />
    );
  }
}

export default Search;