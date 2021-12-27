import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Main from "./components/Main"
import Gallery from "./components/Gallery"
import CameraScreen from './components/CameraScreen';
import BigPhoto from './components/BigPhoto';
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="gallery" component={Gallery} />
        <Stack.Screen name="camerascreen" component={CameraScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="bigphoto" component={BigPhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
