import React, { useEffect, useState } from "react";
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
import { Cat } from "../types/types";
import { getCatPics } from "../lib/supabase";

export function PopularCats(props: { cats: Cat[] }) {
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
        // renderItem={PopularCatCard}
        renderItem={({ item, index }) => (
          <PopularCatCard item={item} key={index} />
        )}
        keyExtractor={(cat) => cat.id as string}
      />
    </View>
  );
}

export function PopularCatCard({ item }: any) {
  const [pictureList, setPictureList] = useState<string[]>([]);

  useEffect(() => {
    getCatPics(item.id).then((pics) => {
      console.log(pics);
      setPictureList(pics);
    });
  }, [item]);

  return (
    <TouchableOpacity
      style={AppStyles.popCatCard}
      onPress={() => console.log(item)}
    >
      <ImageBackground
        source={{
          uri: pictureList[Math.floor(Math.random() * pictureList.length)],
        }}
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
