import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "../components/Themed";
import AppStyles from "../styles/AppStyles";
import { Cat } from "../types/types";

type Props = {
  cat: Cat;
};
export default function CatProfileScreen({ cat }: Props) {
  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.container}>{JSON.stringify(cat)}</View>
    </SafeAreaView>
  );
}
