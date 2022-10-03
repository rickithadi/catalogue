import React from "react";
import { View, Text, ImageBackground } from "react-native";
import AppStyles from "../styles/AppStyles";

import { Cat } from "../types/types";

import catSample from "../assets/images/rusty.jpg";

export default function Banner(props: { cat: Cat }) {
  return (
    <View style={AppStyles.bannerContainer}>
      <ImageBackground
        source={catSample}
        resizeMode="cover"
        style={AppStyles.image}
      >
        <View style={AppStyles.bannerTextContainer}>
          <Text style={AppStyles.bannerTitle}>{props.cat.name}</Text>
          <Text style={AppStyles.bannersubText}>{props.cat.description}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
