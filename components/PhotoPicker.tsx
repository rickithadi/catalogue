import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Button,
  View,
  Alert,
  Modal,
  Pressable,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import AppStyles from "../styles/AppStyles";

interface Props {
  show: boolean;
  onSubmit: (photos: string[]) => void;
  initialPics?: string[];
}
export const PhotoPicker = ({ onSubmit, show, initialPics }: Props) => {
  const [camera, toggleCamera] = useState(false);
  const [selectedPictures, setSelectedPictures] = useState<string[]>(
    initialPics || []
  );
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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      result.selected.map((photo) => {
        setSelectedPictures((current) => [
          ...current,
          // `data:image/png;base64,${photo.base64}`,
          photo.uri,
        ]);
      });
    }
  };
  return (
    <Modal animationType="slide" presentationStyle="fullScreen" visible={show}>
      <Text style={AppStyles.modalText}>Select Pictures of Cat</Text>

      <View style={AppStyles.createCatContainer}>
        {selectedPictures.map((picture, index) => (
          <View key={index}>
            <Image
              source={{ uri: picture }}
              style={{ height: 100, width: 100 }}
            />
          </View>
        ))}
      </View>
      <View style={AppStyles.popCatHeaderContainer}>
        <Button title="camera" onPress={() => toggleCamera(!camera)} />
        <Button
          title="Pick an image from camera roll"
          onPress={() => pickImage()}
        />
      </View>
      <Button
        disabled={selectedPictures.length === 0}
        title="Submit"
        onPress={() => {
          onSubmit(selectedPictures);
        }}
      ></Button>
    </Modal>
  );
};
export default PhotoPicker;
