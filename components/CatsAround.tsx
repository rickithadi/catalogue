import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";

import { View, Text, ScrollView } from "react-native";

import AppStyles from "../styles/AppStyles";

import { Cat } from "../types";
import { LocationGeocodedAddress, LocationObject } from "expo-location";

export default function CatsAround(props: {
  cats: Cat[];
  locationGeocodedAddress: undefined | LocationGeocodedAddress[];
}) {
  return (
    <View style={AppStyles.popCatParentContainer}>
      <View style={AppStyles.popCatHeaderContainer}>
        <Text style={AppStyles.title}>
          Cats Around {console.log(props.locationGeocodedAddress)}
        </Text>

        <TouchableOpacity>
          <Text style={AppStyles.smallButtonText}>
            View All
            <AntDesign name="right" color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        textInputProps={{ onBlur: () => {} }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyA2VHWlEdfIiMSU8nIMNMVAMChpU-H9s_M",
          language: "en",
        }}
        currentLocation={true}
        currentLocationLabel="Current location"
        enablePoweredByContainer={false}
        requestUrl={{
          url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
          useOnPlatform: "web",
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      /> */}
      {props.cats.map((c: Cat) => (
        <View style={AppStyles.popCatContainer} key={c.uid}>
          <Text>{c.name}</Text>
        </View>
      ))}
    </View>
  );
}
