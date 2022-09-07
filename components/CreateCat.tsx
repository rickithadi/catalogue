import { LocationGeocodedAddress } from "expo-location";
import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Image,
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Cat, emptyCat } from "../types";
import { supabase } from "../lib/supabase";
import AppStyles from "../styles/AppStyles";

const CreateCat = (props: {
  locationGeocodedAddress: LocationGeocodedAddress | null;
}) => {
  const emptyCat: emptyCat = {
    name: "",
    description: "",
    temperament: "",
    gender: false,
    pets: 0,
    gallery: [],
  };

  const [cat, setCat] = useState<Cat | emptyCat>(emptyCat);

  const [camera, toggleCamera] = useState(false);
  const cameraRef = useRef<Camera>(null);

  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
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

  const handleChangeText = (value: string, name: string) => {
    setCat({ ...cat, [name]: value });
  };

  const saveNewCat = async () => {
    if (cat.name === "") {
      alert("please provide a name");
    } else {
      try {
        const { data, error } = await supabase.from("cats").insert(cat);
        console.log(data);
        if (error) {
          console.log;
        }
      } catch (error) {
        console.log(error);
      }
    }
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
        if (photo.base64 && cat.gallery) {
          cat.gallery.push(`data:image/png;base64,${photo.base64}`);
        }
        console.log(cat.gallery?.length);
      });
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={cat.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Description"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "description")}
          value={cat.description}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="temperament"
          onChangeText={(value) => handleChangeText(value, "temperament")}
          value={cat.temperament}
        />
      </View>

      {camera ? (
        <View style={styles.container}>
          {/* <Camera style={styles.camera} type={type}> */}
          <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <Text>Flip Camera</Text>
              </TouchableOpacity>
            </View>

            <Button title="Take Picture" onPress={() => takePicture()} />
          </Camera>
        </View>
      ) : null}

      <Button title="camera" onPress={() => toggleCamera(!camera)} />

      <ScrollView horizontal style={styles.photoContainer}>
        {cat.gallery &&
          cat.gallery.map((photo, i) => (
            <View style={AppStyles.popCatHeaderContainer} key={i}>
              <Text>{i}</Text>
              <Image source={{ uri: photo }} style={styles.image} />
            </View>
          ))}
      </ScrollView>
      <View>
        <Button
          title="Create Cat"
          testID="CreateCatButton"
          onPress={() => saveNewCat()}
          disabled={!cat.description || !cat.name || !cat.temperament}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  photoContainer: {
    height: 100,
    flex: 1,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  image: { height: 150, width: 150 },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});

export default CreateCat;
