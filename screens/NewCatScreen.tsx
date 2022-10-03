import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";

import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import useColorScheme from "../hooks/useColorScheme";
import { ImagePicker } from "../components/ImagePicker";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function NewCatScreen({ navigation }: any) {
  const [selectedPictures, setSelectedPictures] = useState<any[]>([]);
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={AppStyles.container}>
      {selectedPictures.length > 0 ? (
        <ScrollView>
          <View style={AppStyles.selectedImagesContainer}>
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
            <CreateCat
              catPictures={selectedPictures}
              onSuccess={navigation.navigate("SuccessfulCatCreation")}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={AppStyles.createCatImageContainer}>
          <ImagePicker
            setSelectedPictures={setSelectedPictures}
            back={() => navigation.goBack()}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
