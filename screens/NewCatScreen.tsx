import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import { ImagePicker } from "../components/ImagePicker";
export default function NewCatScreen() {
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);

  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.createCatImageContainer}>
        <ImagePicker />
      </View>
      <CreateCat catPictures={selectedPictures} />
    </SafeAreaView>
  );
}
