import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RadioButton from './RadioButton';
export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        IDPressed: 0,
    };
    this.press = this.press.bind(this)
  }
  press(id){
    console.log(id)
    this.setState({IDPressed: id})
    let options = this.props.options
    console.log(options)
    for(let i=0; i<this.props.len; i++){
        console.log("for is running")
        if(i == id){
            console.log(options[i])
            this.props.funcion(options[i])
        }
    }
  }
  render() {
    let group
    let options = this.props.options
    let title = this.props.title
    let pressed
    group = options.map((element, index) => {
        if(this.state.IDPressed == index){
            pressed = true
        }
        else{
            pressed = false
        }
        return <RadioButton option = {element} thisID ={index} press={this.press} pressed={pressed}/>
    })
    return (
      <View>
        <Text style={{color:"white"}}>{title}</Text>
        {group}
      </View>
    );
  }
}
