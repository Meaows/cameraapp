import { WhiteBalance } from 'expo-camera/build/Camera.types';
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Animated } from "react-native";
import CircleButton from "./CircleButton"
import RadioGroup from './RadioGroup';
class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: new Animated.Value( ((Dimensions.get('window').height))),  //startowa pozycja y wysuwanego View
            isHidden: true
        };
        console.log(this.state.pos)
        this.toggle = this.toggle.bind(this)
        this.ratio = this.ratio.bind(this)
        this.size = this.size.bind(this)
        this.fm = this.fm.bind(this)
        this.wb = this.wb.bind(this)
        this.abc = this.abc.bind(this)
    }
    componentDidMount(){
        this.setState({isHidden: this.props.isHidden})
    }
    componentDidUpdate(){
        if(this.state.isHidden != this.props.isHidden){
            this.setState({isHidden: this.props.isHidden})
            this.toggle()
        }
        
    }
    toggle() {
        let toPos
        if (this.state.isHidden) toPos = 0; else toPos =  ((Dimensions.get('window').height))

        //animacja

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver:true
            }
        ).start();
        this.setState({isHidden: !this.state.isHidden})
    }
    ratio(ratio){
        this.props.ratio(ratio)
    }
    size(size){
        this.props.size(size)
    }
    fm(fm){
        this.props.fm(fm)
    }
    wb(wb){
        this.props.wb(wb)
    }
    abc(abc){
        console.log(abc)
        this.props.abca(abc)
    }
    render() {
        let whitebalances = Object.keys(this.props.whiteBalances)
        let a = whitebalances.length
        let flashmode = Object.keys(this.props.flashMode)
        let c = this.props.sizesLen
        return (
            <View>

                <Animated.View
                    style={[
                        styles.animatedView,
                        {
                            transform: [
                                { translateY: this.state.pos }
                            ]
                        }]} >
                    <ScrollView>
                        <Text style={styles.tekscik}>USTAWIENIA</Text>
                        <RadioGroup title="RATIOS" options={["4:3", "16:9"]} funcion={this.ratio} len={2}/>
                        <RadioGroup title="WHITE BALANCES" options={whitebalances} len={a} funcion={this.wb}/>
                        <RadioGroup title="FLASH MODE" options={flashmode} len={flashmode.length} funcion={this.fm}/>
                        <RadioGroup title="SIZES" options={this.props.sizes} funcion={this.size} len={c}/>
                        <RadioGroup title="ABC" options={["a", "b", "c"]} funcion={this.abc} len={3}/>
                    </ScrollView>
                        
                </Animated.View>

            </View>
        );
    }
}


var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",

        height: ((Dimensions.get('window').height)),
        width: "50%",
        
    },
    tekscik: {
        color: "#FFFFFF",
        fontSize: 20
    }
});

export default Options