import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import MyButton from './MyButton';
export default class BigPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.delete = this.delete.bind(this)
    this.share = this.share.bind(this)
  }
  async delete() {
    await MediaLibrary.deleteAssetsAsync(this.props.route.params.uri.id)
    this.props.route.params.uri.back()
    this.props.navigation.goBack();
  }
  async share() {
    await Sharing.shareAsync(this.props.route.params.uri.uri)
  }
  render() {
    return (
      <View >
        <Image style={css.image} source={{ uri: this.props.route.params.uri.uri }} />
        <View style={css.views}>
          <MyButton funcion={this.delete} text="Delete" />
          <MyButton funcion={this.share} text="share" />
        </View>
        <View style={css.views}>
        <Text style={css.tekst}>{this.props.route.params.uri.height} x {this.props.route.params.uri.width}</Text>
        </View>
      </View>
    );
  }
}
let css = StyleSheet.create({
  image: {
    width: "80%",
    height: "80%",
    alignSelf: 'center',

  },
  views: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tekst: {
    fontSize: 30,
  }
})