import React, { useState, useEffect } from "react";
import { decode } from "base64-arraybuffer";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  size: number;
  fileName: string;
  onUpload: (filePath: string) => void;
}

export default function PhotoUpload({
  size = 150,
  onUpload,
  fileName,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    localUri: string;
  } | null>(null);

  const avatarSize = { height: size, width: size };
  useEffect(() => {
    if (fileName) downloadImage(fileName);
  }, [fileName]);

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
        setSelectedImage({ localUri: fr.result as string });
      };
    } catch (error) {
      if (error instanceof Error) {
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
        setSelectedImage({ localUri: result.uri });

        let { error } = await supabase.storage
          .from("avatars")
          .upload(fileName, decode(result.base64), {
            contentType: "image/png",
            cacheControl: "3600",
            upsert: true,
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

  return (
    <View style={styles.buttonContainer}>
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage.localUri }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}

      <View
          style={styles.button}>
        <FontAwesome.Button

          name="edit"
          backgroundColor="#3b5998"
          onPress={pickImage}
        ></FontAwesome.Button>
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
    alignSelf: "center",
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
