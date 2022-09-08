import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "../components/Themed";
import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import { LocationGeocodedAddress, LocationObject } from "expo-location";
import PhotoPicker from "../components/PhotoPicker";
import { CurrentWhereAboutsContext } from "../App";

export default function NewCatScreen() {
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);
  const whereAbouts = useContext(CurrentWhereAboutsContext);

  return (
    <SafeAreaView style={AppStyles.container}>
      {selectedPictures.length === 0 ? (
        <PhotoPicker
          onSubmit={(photos: []) => setSelectedPictures(selectedPictures)}
        />
      ) : (
        <View style={AppStyles.container}>
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
