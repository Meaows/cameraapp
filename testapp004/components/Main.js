import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.next = this.next.bind(this)
  }
  next(){
    this.props.navigation.navigate("gallery", {back: false})
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.next}
        style={css.main}
      >
        <Text style={css.text}>Camera</Text>
        <Text style={css.text}>App</Text>
      </TouchableOpacity>
    );
  }
}
let css = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#ff1493",
        justifyContent: "center",
        alignItems: "center",
        

    },
    text: {
        fontSize: 72,
    }
})