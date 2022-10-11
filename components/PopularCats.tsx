import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { View, Text } from "react-native";

import AppStyles from "../styles/AppStyles";
import icons from "./Icons";
import { Cat } from "../types/types";
import { getCatPics } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";

export function PopularCats(props: { cats: Cat[] }) {
  const navigation = useNavigation();

  const routeToCat = (cat: Cat) =>
    navigation.navigate("CatProfileScreen", { cat: cat });
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
        renderItem={({ item, index }) => (
          <PopularCatCard
            item={item}
            key={index}
            route={(cat: Cat) => routeToCat(cat)}
          />
        )}
        keyExtractor={(cat) => cat.id as string}
      />
    </View>
  );
}

export function PopularCatCard({ item, route }: any) {
  const { data: pictureList } = getCatPics(item.id);

  return (
    <TouchableOpacity style={AppStyles.popCatCard} onPress={() => route(item)}>
      {pictureList && pictureList.length > 0 && (
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
      )}
    </TouchableOpacity>
  );
}
