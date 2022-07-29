import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import AppStyles from "../styles/AppStyles";

import { Cat } from "../types";
import { MonoText } from "./StyledText";

export default function PopularCatCard(props: { cat: Cat }) {
  return (
    <View style={AppStyles.fullWidthContainer}>
      <Text style={AppStyles.title}>{props.cat.name}</Text>
      <Text>cat goes here</Text>
    </View>
  );
}
