import React from "react";
import { View, Text, ScrollViewComponent, ScrollView } from "react-native";
import AppStyles from "../styles/AppStyles";

import { Cat } from "../types";

export default function PopularCats(props: { cats: Cat[] }) {
  return (
    <View style={AppStyles.popCatParentContainer}>
      <Text style={AppStyles.title}>Popular Cats</Text>
      <ScrollView horizontal={true}>
        {props.cats.map((c: Cat) => (
          <View style={AppStyles.popCatContainer}>
            <Text>{c.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
