import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { View, Text } from "react-native";
import AppStyles from "../styles/AppStyles";
import { Cat } from "../types/types";

type Props = {
  cat: Cat;
};
export default function CatProfileScreen({ cat }: Props) {
  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.container}>
        <Text>{JSON.stringify(cat)}</Text>
      </View>
    </SafeAreaView>
  );
}
