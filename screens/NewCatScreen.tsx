import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "../components/Themed";
import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import { LocationGeocodedAddress, LocationObject } from "expo-location";
import PhotoPicker from "../components/PhotoPicker";

export default function NewCatScreen(props: {
  locationGeocodedAddress: undefined | LocationGeocodedAddress[];
  location: undefined | LocationObject;
}) {
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);

  return (
    <SafeAreaView style={AppStyles.container}>
      {selectedPictures.length > 0 ? (
        <PhotoPicker
          onSubmit={(photos: []) => setSelectedPictures(selectedPictures)}
        />
      ) : (
        <View style={AppStyles.container}>
          <CreateCat
            locationGeocodedAddress={
              props.locationGeocodedAddress
                ? props.locationGeocodedAddress[0]
                : null
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}
