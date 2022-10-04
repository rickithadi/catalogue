import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import AppStyles from "../styles/AppStyles";

import { Cat } from "../types/types";

import catSample from "../assets/images/rusty.jpg";
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
      if (nestedPictureList) {
        console.log("pictureList", nestedPictureList);
        const { pictures } = nestedPictureList[0];
        setPictureList(pictures);
      }
      // setPictureList(pictureList);
    };
    getCatPics();
  }, [props.cat]);

  return (
    <View style={AppStyles.bannerContainer}>
      <ImageBackground
        source={{ uri: pictureList[0] }}
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
