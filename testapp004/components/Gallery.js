import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import FotoItem from './FotoItem';
import MyButton from './MyButton'
export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numColumns: 5,
            photos: [],
            toggle: "list",
            stylek: styles.grid,
            selected: [],
            loading: false,
            backFromBig: false,
        };
        this.push = this.push.bind(this)
        this.camera = this.camera.bind(this)
        this.delete = this.delete.bind(this)
        this.select = this.select.bind(this)
        this.long = this.long.bind(this)
        this.back = this.back.bind(this)
    }
    async componentDidMount() {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        this.setState({loading: true})
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        else {

            let obj = await MediaLibrary.getAssetsAsync({
                first: 100,           // ilość pobranych assetów
                mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
                sortBy: "creationTime"
            })
            this.setState({ photos: obj.assets, loading: false })
            // alert(this.state.photos)
            // ToastAndroid.showWithGravity(
            //     JSON.stringify(this.state.photos[0].uri, null, 4),
            //     ToastAndroid.SHORT,
            //     ToastAndroid.CENTER
            // );
        }
    }
    push() {
        if (this.state.toggle == "grid") {
            this.setState({ numColumns: 5, toggle: "list", stylek: styles.grid })

        }
        else {
            this.setState({ numColumns: 1, toggle: "grid", stylek: styles.list })
        }
    }
    camera() {
        this.props.navigation.navigate("camerascreen", {back: this.back})
    }
    async delete() {
        this.setState({loading: true})
        await MediaLibrary.deleteAssetsAsync(this.state.selected)
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
            sortBy: "creationTime"
        })
        this.setState({
            loading: false,
            photos: obj.assets,
            selected: []
        })
    }
    long(id){
        let uri = {}
        for(let i = 0; i<this.state.photos.length; i++){
            if(this.state.photos[i].id == id){
                uri = {
                    uri: this.state.photos[i].uri,
                    id: id,
                    back: this.back,
                    width: this.state.photos[i].width,
                    height: this.state.photos[i].height
                }
                break;
           }

        }
        this.props.navigation.navigate("bigphoto", {uri: uri})
    }
    select(id) {
        let arr = this.state.photos
        let selected = this.state.selected
        let dl = arr.length
        let dls = selected.length
        let idiczek
        let flag = false
        for (let i = 0; i < dl; i++) {
            if (arr[i].id == id) {
                for (let j = 0; j < dls; j++) {
                    if (selected[j] == id) {
                        flag = true
                        idiczek = i
                    }
                    else {
                        idiczek = i
                    }
                }

            }
        }
        if (flag == true) {
            selected.splice(idiczek, 1)
            this.setState({ selected: selected })
        }
        else {
            selected.push(id)
            this.setState({ selected: selected })
        }

    }
    async back(){
        this.setState({loading: true})
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
            sortBy: "creationTime"
        })
        this.setState({
            loading: false,
            photos: obj.assets,
        })
    }
    render() {
        // <Image source={{ uri: JSON.stringify(this.state.photos[0].uri)}}/>
        // alert(JSON.stringify(this.state.photos))
        return (
            <View style={styles.viewsek}>
                <View style={styles.buttons}>
                    <MyButton funcion={this.push} text="grid/list" />
                    <MyButton funcion={this.camera} text="camera" />
                    <MyButton funcion={this.delete} text="delete" />
                </View>
                {
                        this.state.loading == true ?
                            <ActivityIndicator size="large" color="#ff1493" />
                            :
                            null
                    }
                <FlatList
                    numColumns={this.state.numColumns}
                    data={this.state.photos}
                    key={this.state.numColumns}
                    renderItem={({ item }) => <FotoItem func={this.select} id={item.id} style={this.state.stylek} source={item.uri} width="100%" height={100} func2={this.long}>  </FotoItem>}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    viewsek: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    grid: {
        height: ((Dimensions.get('window').width / 5) - 10),
        width: ((Dimensions.get('window').width / 5) - 10),
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10
    },
    list: {
        height: (Dimensions.get('window').height / 4),
        width: '100%',
        marginBottom: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
    },
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
});