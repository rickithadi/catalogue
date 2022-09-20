import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";

import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import PhotoPicker from "../components/PhotoPicker";
import App, { CurrentWhereAboutsContext } from "../App";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function NewCatScreen() {
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);

  const colorScheme = useColorScheme();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      orderedSelection: true,
      selectionLimit: 5,
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
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.createCatImageContainer}>
        {selectedPictures.map((picture, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              setSelectedPictures((current) =>
                current.filter((pic) => pic !== picture)
              )
            }
          >
            <ImageBackground source={{ uri: picture }} style={AppStyles.image}>
              <Ionicons
                name="trash"
                size={32}
                color={Colors[colorScheme].tint}
                style={AppStyles.imageOverlay}
              />
            </ImageBackground>
          </TouchableOpacity>
        ))}
        {selectedPictures.length < 5 && (
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{
              height: 100,
              width: 100,
              borderColor: Colors[colorScheme].tint,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Ionicons
              name="add-circle"
              size={32}
              color={Colors[colorScheme].tint}
            />
          </TouchableOpacity>
        )}
      </View>
      <CreateCat catPictures={selectedPictures} />
    </SafeAreaView>
  );
}
