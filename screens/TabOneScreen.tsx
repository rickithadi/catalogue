import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import EditScreenInfo from "../components/EditScreenInfo";
import logo from "../assets/images/logo.png";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import AppStyles from "../styles/AppStyles";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  type ImagePath = {
    localUri: string;
  };

  const [selectedImage, setSelectedImage] = useState<ImagePath | any>(null);
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };
  // if (selectedImage !== null) {
  //   return (
  //     <View style={AppStyles.container}>
  //       <Image
  //         source={{ uri: selectedImage.localUri }}
  //         style={AppStyles.thumbnail}
  //       />
  //     </View>
  //   );
  // }

  return (
    <View style={AppStyles.container}>
      <Image source={logo} style={AppStyles.logo} />
      {selectedImage && (
        <View style={AppStyles.container}>
          <Image
            source={{ uri: selectedImage?.localUri }}
            style={AppStyles.thumbnail}
          />
        </View>
      )}

      <Text style={AppStyles.title}>I like big butts</Text>
      <View
        style={AppStyles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TouchableOpacity onPress={openImagePickerAsync} style={AppStyles.button}>
        <Text style={AppStyles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}
