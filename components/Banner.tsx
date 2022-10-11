import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

import AppStyles from "../styles/AppStyles";
import { Cat } from "../types/types";
import { getCatPics } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";

type Props = {
  cat: Cat;
};

export default function Banner({ cat }: Props) {
  const { data: pictureList } = getCatPics(cat.id);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CatProfileScreen", { cat: cat })}
    >
      <View style={AppStyles.bannerContainer}>
        {pictureList && pictureList.length > 0 && (
          <ImageBackground
            source={{
              uri: pictureList[Math.floor(Math.random() * pictureList.length)],
            }}
            resizeMode="cover"
            style={AppStyles.BannerImage}
          >
            <View style={AppStyles.bannerTextContainer}>
              <Text style={AppStyles.bannerTitle}>{cat.name}</Text>
              <Text style={AppStyles.bannersubText}>{cat.description}</Text>
            </View>
          </ImageBackground>
        )}
      </View>
    </TouchableOpacity>
  );
}
