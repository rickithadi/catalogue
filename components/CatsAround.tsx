import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { View, Text } from "react-native";
import { LocationGeocodedAddress } from "expo-location";

import AppStyles from "../styles/AppStyles";
import catSample from "../assets/images/rusty.jpg";
import icons from "./Icons";
import { Cat } from "../types";

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
              ? props.locationGeocodedAddress[0].name
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
      style={[AppStyles.catsAroundCard, { backgroundColor: "white" }]}
      onPress={() => console.log(item)}
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
            <Image source={icons.pets} style={AppStyles.icon} />
            {item.pets} pets
          </Text>
        </View>
        <View style={AppStyles.cardRow}>
          <Text style={AppStyles.smallText}>
            <Image source={icons.location} style={AppStyles.icon} />
            {item.name}
          </Text>
        </View>
        <View style={AppStyles.cardRow}>
          <Text style={AppStyles.smallText}>
            <Image source={icons.fish} style={AppStyles.icon} />
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
