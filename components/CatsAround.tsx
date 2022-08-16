import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from "react-native";
import { View, Text } from "react-native";
import { LocationGeocodedAddress } from "expo-location";

import AppStyles from "../styles/AppStyles";
import catSample from "../assets/images/rusty.jpg";
import pets from "../assets/icons/pets.png";
import location from "../assets/icons/location.png";
import fish from "../assets/icons/fish.png";
import { Cat } from "../types";
import App from "../App";

export default function CatsAround(props: {
  cats: Cat[];
  locationGeocodedAddress: undefined | LocationGeocodedAddress[];
}) {
  return (
    <View style={AppStyles.popCatParentContainer}>
      <View style={AppStyles.popCatHeaderContainer}>
        <Text>
          <Text style={AppStyles.title}>Cats Around </Text>
          <Text style={AppStyles.locationStyle}>
            {props.locationGeocodedAddress
              ? props.locationGeocodedAddress[0].street
              : "Singapore"}
          </Text>
        </Text>
        <TouchableOpacity>
          <Text style={AppStyles.smallButtonText}>
            View All
            <AntDesign name="right" color="black" />
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={props.cats}
        renderItem={CatsAroundCard}
        keyExtractor={(cat) => cat.uid as string}
      />
    </View>
  );
}
export function CatsAroundCard({ item }: ListRenderItemInfo<Cat>) {
  return (
    <TouchableOpacity
      style={AppStyles.catsAroundCard}
      onPress={() => console.log(item.uid)}
    >
      <ImageBackground
        source={catSample}
        resizeMode="cover"
        style={AppStyles.catsAroundImageContainer}
      ></ImageBackground>
      <View style={AppStyles.catsAroundTextContainer}>
        <Text style={AppStyles.title}>{item.name}</Text>

        <View style={AppStyles.cardRow}>
          <Text style={AppStyles.smallText}>
            <Image source={pets} style={AppStyles.icon} />
            {item.pets} pets
          </Text>
        </View>
        <View style={AppStyles.cardRow}>
          <Text style={AppStyles.smallText}>
            <Image source={location} style={AppStyles.icon} />
            {item.name}
          </Text>
        </View>
        <View style={AppStyles.cardRow}>
          <Text style={AppStyles.smallText}>
            <Image source={fish} style={AppStyles.icon} />
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
