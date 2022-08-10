import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { View, Text, ScrollView } from "react-native";

import AppStyles from "../styles/AppStyles";

import { Cat } from "../types";
import { LocationObject } from "expo-location";

export default function PopularCats(props: {
  cats: Cat[];
  location: LocationObject| null;
}) {
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
      <ScrollView horizontal={true}>
        {props.cats.map((c: Cat) => (
          <View style={AppStyles.popCatContainer} key={c.uid}>
            <Text>{c.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
