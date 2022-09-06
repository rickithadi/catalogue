import React, { useState, useEffect, useRef } from "react";
import { decode } from "base64-arraybuffer";
import { supabase } from "../lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function CreateCatPhotoUpload({
  url,
  size = 150,
  onUpload,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [camera, toggleCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    localUri: string;
  } | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const avatarSize = { height: size, width: size };
  const cameraRef = useRef<Camera>(null);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

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

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }
  const pickImage = async () => {
    try {
      setUploading(true);

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled && result.base64) {
        console.log(result);
        setSelectedImage({ localUri: result.uri });
        setAvatarUrl(result.uri);

        let { error } = await supabase.storage
          .from("avatars")
          .upload("public.jpg", decode(result.base64), {
            contentType: "image/png",
          });
        if (error) {
          throw error;
        }
        onUpload(result.uri);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  };
  const takePicture = async () => {
    if (camera) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current?.takePictureAsync(options);
      console.log(data);
    }
  };
  return (
    <View>
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage.localUri }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}

      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      <View>
        {camera ? (
          <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleCameraType}
                >
                  <Text>Flip Camera</Text>
                </TouchableOpacity>
              </View>
            </Camera>

            <Button title="Take Picture" onPress={() => takePicture()} />
          </View>
        ) : (
          <>
            <Button
              title={uploading ? "Uploading ..." : "Upload"}
              onPress={pickImage}
              disabled={uploading}
            />
            <Button title="camera" onPress={() => toggleCamera(!camera)} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  avatar: {
    borderRadius: 5,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    border: "1px solid rgb(200, 200, 200)",
    borderRadius: 5,
  },
});
