import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Image,
  Button,
  View,
  Alert,
  Modal,
  Pressable,
} from "react-native";

import AppStyles from "../styles/AppStyles";

interface Props {
  onSubmit: (photos: []) => void;
}
export const PhotoPicker = ({ onSubmit }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [camera, toggleCamera] = useState(false);
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);
  const cameraRef = useRef<Camera>(null);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={AppStyles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (camera) {
      const options = {
        quality: 1,
        base64: true,
        fixOrientation: true,
        exif: true,
      };
      await cameraRef.current?.takePictureAsync(options).then((photo) => {
        photo.exif.Orientation = 1;
        if (photo.base64)
          setSelectedPictures((current) => [
            ...current,
            `data:image/png;base64,${photo.base64}`,
          ]);
      });
      toggleCamera(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={AppStyles.container}>
        <Button title="camera" onPress={() => toggleCamera(!camera)} />
        <View style={AppStyles.modalView}>
          <Text style={AppStyles.modalText}>Hello World!</Text>
          <Pressable
            style={[AppStyles.button, AppStyles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          ></Pressable>
        </View>
      </View>
    </Modal>
  );
};
export default PhotoPicker;
