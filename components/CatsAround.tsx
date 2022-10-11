import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItemInfo,
  ScrollView,
} from "react-native";
import { View, Text } from "react-native";
import { LocationGeocodedAddress } from "expo-location";

import AppStyles from "../styles/AppStyles";
import catSample from "../assets/images/rusty.jpg";
import icons from "./Icons";
import { ProximityCat } from "../types/types";
import { WhereAboutDisplay } from "./WhereAboutDisplay";
import { CurrentWhereAboutsContext } from "../App";
import { getCatPics } from "../lib/supabase";

export default function CatsAround(props: { cats: ProximityCat[] }) {
  const whereabouts = useContext(CurrentWhereAboutsContext);
  return (
    <View style={AppStyles.popCatParentContainer}>
      <View style={AppStyles.popCatHeaderContainer}>
        <Text>
          <Text style={AppStyles.title}>Cats Around </Text>
          {whereabouts ? (
            <WhereAboutDisplay whereAbouts={whereabouts} />
          ) : (
            <Text style={AppStyles.locationStyle}>Singapore</Text>
          )}
        </Text>
        <TouchableOpacity>
          <Text style={AppStyles.smallButtonText}>
            View All
            <AntDesign name="right" color="black" />
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={props.cats}
        renderItem={({ item, index }) => (
          <CatsAroundCard item={item} key={index} />
        )}
        keyExtractor={(cat) => cat.id as string}
      />
    </View>
  );
}
export function CatsAroundCard({ item }: any) {
  const { data: pictureList } = getCatPics(item.id);
  return (
    <TouchableOpacity
      style={[AppStyles.catsAroundCard, { backgroundColor: "white" }]}
      onPress={() => console.log(item)}
    >
      {pictureList && pictureList.length > 0 && (
        <ImageBackground
          source={{
            uri: pictureList[Math.floor(Math.random() * pictureList.length)],
          }}
          resizeMode="cover"
          style={AppStyles.catsAroundImageContainer}
        ></ImageBackground>
      )}

      <View style={AppStyles.catsAroundTextContainer}>
        <Text style={AppStyles.title}>{item.name}</Text>

        <View style={AppStyles.cardRow}>
          <Text style={AppStyles.smallText}>
            <Image source={icons.pets} style={AppStyles.icon} />
            {item.pets} pets
          </Text>
        </View>
        <View style={AppStyles.cardRow}>
          <Text style={AppStyles.smallText}>
            <Image source={icons.location} style={AppStyles.icon} />
            {item.distance.toFixed(2)} km away
          </Text>
        </View>
        <View style={AppStyles.cardRow}>
          <Text style={AppStyles.smallText}>
            <Image source={icons.fish} style={AppStyles.icon} />
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
