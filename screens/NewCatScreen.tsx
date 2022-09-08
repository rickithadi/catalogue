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
} from "react-native";

import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import PhotoPicker from "../components/PhotoPicker";
import { CurrentWhereAboutsContext } from "../App";

export default function NewCatScreen() {
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);
  const whereAbouts = useContext(CurrentWhereAboutsContext);

  return (
    <SafeAreaView style={AppStyles.container}>
      {selectedPictures?.length === 0 ? (
        <PhotoPicker
          onSubmit={(photos: string[]) => setSelectedPictures(photos)}
        />
      ) : (
        <View style={AppStyles.container}>
          <View style={AppStyles.container}>
            {selectedPictures.map((picture, index) => (
              <View key={index}>
                <Image
                  source={{ uri: picture }}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            ))}
          </View>
          <CreateCat
            locationGeocodedAddressList={
              whereAbouts?.address ? whereAbouts.address : undefined
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}
