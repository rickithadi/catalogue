import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Button,
  View,
  Alert,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";

import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import PhotoPicker from "../components/PhotoPicker";
import { CurrentWhereAboutsContext } from "../App";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function NewCatScreen() {
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);
  const [photoPicker, togglePhotoPicker] = useState(false);
  const whereAbouts = useContext(CurrentWhereAboutsContext);

  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={AppStyles.container}>
      {photoPicker && (
        <PhotoPicker
          show={photoPicker}
          onSubmit={(photos: string[]) => {
            setSelectedPictures(photos);
            togglePhotoPicker(false);
          }}
        />
      )}
      <View style={AppStyles.container}>
        <View style={AppStyles.createCatContainer}>
          {selectedPictures.map((picture, index) => (
            <View key={index}>
              <Image
                source={{ uri: picture }}
                style={{ height: 100, width: 100 }}
              />
            </View>
          ))}
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
            <TouchableOpacity onPress={() => togglePhotoPicker(true)}>
              <Ionicons
                name="add-circle"
                size={32}
                color={Colors[colorScheme].tint}
              />
            </TouchableOpacity>
          </View>
        </View>
        <CreateCat
          locationGeocodedAddressList={
            whereAbouts?.address ? whereAbouts.address : undefined
          }
        />
      </View>
    </SafeAreaView>
  );
}
