import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.select = this.select.bind(this)
    }
    select() {
            this.props.press(this.props.thisID)

    }
    render() {

        return (
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{color: "white"}}>{this.props.option}</Text>
                <TouchableOpacity style={styles.radio} onPress={this.select}>
                {
                        this.props.pressed == true ?
                            <View style={styles.select}></View>
                            :
                            null
                    }

                </TouchableOpacity>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    radio: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 2,
        marginRight: 10,
        borderColor: '#ff1493',
        alignItems: "center",
        justifyContent: "center"
    },
    select: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: '#ff1493',
    },
    non: {

    }

});
