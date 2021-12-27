import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default class FotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      selected: false,
    };
    this.presik = this.presik.bind(this)
    this.presik2 = this.presik2.bind(this)
  }
  presik(){
    this.props.func(this.props.id)
    if(this.state.selected == false){
      this.setState({opacity: 0.5, selected: true})
    }
    else{
      this.setState({opacity: 1, selected: false})
    }
  }
  presik2(){
    this.props.func2(this.props.id)
  }
  render() {
    return (
      <TouchableOpacity onPress={this.presik2} onLongPress={this.presik}>
        <Image
          style={
            [this.props.style,
            {opacity: this.state.opacity}]
            
          }
          source={{ uri: this.props.source }}
        />
      </TouchableOpacity>
    );
  }
}
