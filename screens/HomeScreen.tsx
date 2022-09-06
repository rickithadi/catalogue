import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import { LocationGeocodedAddress, LocationObject } from "expo-location";
import CreateCatPhotoUpload from "../components/CreateCatPhotoUpload";

export default function HomeScreen(props: {
  locationGeocodedAddress: undefined | LocationGeocodedAddress[];
  location: undefined | LocationObject;
}) {
  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.container}>
        <CreateCat
          locationGeocodedAddress={
            props.locationGeocodedAddress
              ? props.locationGeocodedAddress[0]
              : null
          }
        />

      </View>
    </SafeAreaView>
  );
}
