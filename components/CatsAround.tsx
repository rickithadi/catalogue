import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { LocationGeocodedAddress } from "expo-location";

import AppStyles from "../styles/AppStyles";
import { Cat } from "../types";

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
      {props.cats.map((c: Cat) => (
        <View style={AppStyles.popCatContainer} key={c.uid}>
          <Text>{c.name}</Text>
        </View>
      ))}
    </View>
  );
}
