import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";

import AppStyles from "../styles/AppStyles";
import { Cat } from "../types/types";
import { getCatPics, supabase } from "../lib/supabase";

export default function Banner(props: { cat: Cat }) {
  const [pictureList, setPictureList] = useState<string[]>([]);

  useEffect(() => {
    getCatPics(props.cat.id).then((pics) => {
      setPictureList(pics);
    });
  }, [props.cat]);

  return (
    <View style={AppStyles.bannerContainer}>
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
    </View>
  );
}
