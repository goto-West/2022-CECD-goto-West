import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native/dist/camera/camera_stream';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export default function App() {
  const [isTfReady,setIsTfReady] = useState(false);
  const [hasPermission,setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      await checkPermission();
      await checkTfReady();
    })()
  }, [])

  const checkTfReady = async () => {
    await tf.ready()
      .then(() => {
        setIsTfReady(true);
      })
      .catch((error) => {
        console.log("Tensorflow Ready Error", error);
        return error;
      });
  }

  const checkPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  return (
    <View style={styles.container}>
      <Text>Hello gotoWest!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
