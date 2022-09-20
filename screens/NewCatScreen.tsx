import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { View, Image, TouchableOpacity } from "react-native";

import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import PhotoPicker from "../components/PhotoPicker";
import { CurrentWhereAboutsContext } from "../App";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function NewCatScreen() {
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);

  const colorScheme = useColorScheme();
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
    <SafeAreaView style={AppStyles.container}>

      <View style={AppStyles.container}>
        <View style={AppStyles.createCatContainer}>
          {selectedPictures.map((picture, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                setSelectedPictures((current) =>
                  current.filter((pic) => pic !== picture)
                )
              }
            >
              <Ionicons
                name="trash"
                size={32}
                color={Colors[colorScheme].tint}
              />

              <Image
                source={{ uri: picture }}
                style={{ height: 100, width: 100 }}
              />
            </TouchableOpacity>
          ))}
          {selectedPictures.length < 5 && (
            <View
              style={{
                height: 100,
                width: 100,
                borderColor: Colors[colorScheme].tint,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => pickImage()}>
                <Ionicons
                  name="add-circle"
                  size={32}
                  color={Colors[colorScheme].tint}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <CreateCat catPictures={selectedPictures} />
      </View>
    </SafeAreaView>
  );
}
