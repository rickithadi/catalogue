import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, ScrollViewComponent, ScrollView } from "react-native";
import AppStyles from "../styles/AppStyles";

import { Cat } from "../types";

export default function PopularCats(props: { cats: Cat[] }) {
  return (
    <View style={AppStyles.popCatParentContainer}>
      <View style={AppStyles.popCatHeaderContainer}>
        <Text style={AppStyles.title}>Popular Cats</Text>

        <TouchableOpacity>
          <Text style={AppStyles.smallButtonText}>See More</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        {props.cats.map((c: Cat) => (
          <View style={AppStyles.popCatContainer} key={c.uid}>
            <Text>{c.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
