import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";

import AppStyles from "../styles/AppStyles";
import { Cat } from "../types/types";
import { supabase } from "../lib/supabase";

export default function Banner(props: { cat: Cat }) {
  const [pictureList, setPictureList] = useState<string[]>([]);

  useEffect(() => {
    const getCatPics = async () => {
      // TODO fix array response
      const { data: nestedPictureList, error } = await supabase
        .from("whereabouts")
        .select("pictures")
        .eq("cat_id", props.cat.id);
      if (nestedPictureList && nestedPictureList[0]) {
        console.log("pictureList", nestedPictureList);
        const { pictures } = nestedPictureList[0];
        setPictureList(pictures);
      } else {
        console.log("error", error);
        return [];
      }
    };
    getCatPics();
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
