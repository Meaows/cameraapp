import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import { BackHandler } from "react-native"
import CircleButton from "./CircleButton"
import Options from "./Options"
export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
      type: Camera.Constants.Type.back,  // typ kamery
      isHidden: true,
      ratio: "4:3",
      sizes: [],
      sizesLen: null,
      ps: "",
      wb: "",
      fm: ""
    };
    this.makePhoto = this.makePhoto.bind(this)
    this.changeCamera = this.changeCamera.bind(this)
    this.toggle = this.toggle.bind(this)
    this.ratio = this.ratio.bind(this)
    this.size = this.size.bind(this)
    this.fm = this.fm.bind(this)
    this.wb = this.wb.bind(this)
    this.abc = this.abc.bind(this)
  }
  async componentDidMount() {
    let { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status == 'granted' });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.getSizes()
    let white = Camera.Constants.WhiteBalance
    let whitearr = Object.keys(white)
    let flash = Camera.Constants.FlashMode
    let flasharr = Object.keys(flash)
    this.setState({wb: whitearr[0], fm: flasharr[0]})
  }
  async componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    //tutaj wywołanie funkcji odświeżającej gallery, przekazanej w props-ach
    //...
    this.props.route.params.back()
    //powrót do ekranu poprzedniego
    this.props.navigation.goBack()
    return true;
  }
  async makePhoto() {
    if (this.camera) {
      let foto = await this.camera.takePictureAsync();
      let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM

      ToastAndroid.showWithGravity(
        "Photo taken!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }
  changeCamera() {

    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }
  toggle() {
    console.log(this.state.isHidden)
    this.setState({ isHidden: !this.state.isHidden })

  }
  getSizes = async () => {
    if (this.camera) {
      const sizes = await this.camera.getAvailablePictureSizesAsync(this.state.ratio)
      this.setState({ sizes: sizes, sizesLen: sizes.length, ps: sizes[0] })
      console.log(this.state.sizes)
    }
  };
  async ratio(ratio) {
    this.setState({ratio: ratio})
    this.getSizes()
    console.log(ratio)
  }
  size(size){
    console.log(size)
    this.setState({ps: size})
  }
  wb(wb){
    console.log(wb)
    this.setState({wb: wb})
  }
  fm(fm){
    console.log(fm)
    this.setState({fm: fm})
  }
  abc(abc){
    alert(abc)
  }
  render() {
    const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
    if (hasCameraPermission == null) {
      return <View />;
    } else if (hasCameraPermission == false) {
      return <Text>brak dostępu do kamery</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref; // Uwaga: referencja do kamery używana później
            }}
            style={{ flex: 1 }}
            type={this.state.type} 
            onCameraReady={() => console.log("camera ready")}
            ratio={this.state.ratio}
            whiteBalance={this.state.wb}
            pictureSize={this.state.ps}
            flashMode={this.state.fm}
            >

            <View style={styles.buttons}>
              {/* tutaj wstaw buttony do obsługi kamery, które widać na filmie*/}

              <CircleButton funcion={this.changeCamera} style={styles.roundButtonChange} />

              <CircleButton funcion={this.makePhoto} style={styles.roundButtonPhoto} />

              <CircleButton funcion={this.toggle} style={styles.roundButtonOptions} />

            </View>
            <Options style={styles.roundButtonOptions} isHidden={this.state.isHidden} toggle={this.toggle} whiteBalances={Camera.Constants.WhiteBalance}
              flashMode={Camera.Constants.FlashMode} sizes={this.state.sizes} sizesLen={this.state.sizesLen} ratio={this.ratio} size={this.size} fm={this.fm} wb={this.wb} abc={["a", "b", "c"]} abca={this.abc}/>
          </Camera>
        </View>
      );
    }
  }

}
const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  roundButtonPhoto: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'white',
    borderColor: "black",
    borderWidth: 5
  },
  roundButtonChange: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'blue',
  },
  roundButtonOptions: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'green',
  },
});