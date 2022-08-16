import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  Image,
  ListRenderItemInfo,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { View, Text } from "react-native";

import AppStyles from "../styles/AppStyles";
import icons from "./Icons";
import catSample from "../assets/images/rusty.jpg";
import { Cat } from "../types";

export default function PopularCats(props: { cats: Cat[] }) {
  return (
    <View style={AppStyles.popCatParentContainer}>
      <View style={AppStyles.popCatHeaderContainer}>
        <Text style={AppStyles.title}>Popular Cats</Text>

        <TouchableOpacity>
          <Text style={AppStyles.smallButtonText}>
            View All
            <AntDesign name="right" color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        data={props.cats}
        renderItem={PopularCatCard}
        keyExtractor={(cat) => cat.uid as string}
      />
    </View>
  );
}
export function PopularCatCard({ item }: ListRenderItemInfo<Cat>) {
  return (
    <TouchableOpacity
      style={AppStyles.popCatCard}
      // style={AppStyles.popularCatCardTextContainer}
      onPress={() => console.log(item)}
    >
      <ImageBackground
        source={catSample}
        resizeMode="cover"
        style={AppStyles.popCatCardTextContainer}
      >
        <View style={{ padding: 5 }}>
          <Text style={AppStyles.popCatBigText}>{item.name}</Text>
          <Text style={AppStyles.popCatsmallText}>
            <Image source={icons.petsWhite} style={AppStyles.icon} />
            {item.pets}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
