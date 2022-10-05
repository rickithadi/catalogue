import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";

import AppStyles from "../styles/AppStyles";
import { Cat } from "../types/types";
import { getCatPics } from "../lib/supabase";

export default function Banner(props: { cat: Cat }) {
  const { data: pictureList } = getCatPics(props.cat.id);

  return (
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
            <Text style={AppStyles.bannerTitle}>{props.cat.name}</Text>
            <Text style={AppStyles.bannersubText}>{props.cat.description}</Text>
          </View>
        </ImageBackground>
      )}
    </View>
  );
}
