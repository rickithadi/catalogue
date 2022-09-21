import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageComponent,
} from "react-native";

import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import useColorScheme from "../hooks/useColorScheme";
import { ImagePicker } from "../components/ImagePicker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
export default function NewCatScreen() {
  const [selectedPictures, setSelectedPictures] = useState<any[]>([]);
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={AppStyles.container}>
      {selectedPictures.length > 0 ? (
        <View style={AppStyles.container}>
          <View style={AppStyles.selectedImageContainer}>
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
                  style={AppStyles.imageOverlay}
                  size={32}
                  color={Colors[colorScheme].tint}
                />

                <Image
                  source={{ uri: picture.uri }}
                  key={index}
                  style={AppStyles.createCatImage}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={AppStyles.createCatImageContainer}>
            <CreateCat catPictures={selectedPictures} />
          </View>
        </View>
      ) : (
        <View style={AppStyles.createCatImageContainer}>
          <ImagePicker setSelectedPictures={setSelectedPictures} />
        </View>
      )}
    </SafeAreaView>
  );
}

// <View style={AppStyles.createCatContainer}>
//   {selectedPictures.map((picture, index) => (
//     <TouchableOpacity
//       key={index}
//       onPress={() =>
//         setSelectedPictures((current) =>
//           current.filter((pic) => pic !== picture)
//         )
//       }
//     >
//       <Ionicons
//         name="trash"
//         size={32}
//         color={Colors[colorScheme].tint}
//       />

//       <Image
//         source={{ uri: picture }}
//         style={{ height: 100, width: 100 }}
//       />
//     </TouchableOpacity>
