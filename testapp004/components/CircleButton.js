import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.props.funcion}>
        <Text> {this.props.text} </Text>
      </TouchableOpacity>
    );
  }
}
MyButton.propTypes = {
  funcion: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  button: {
      color: "#212121",
      textTransform: 'uppercase',
      fontFamily: "monospace",
      fontSize: 20,
  },
  touchas: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: 'center',
  },

});
