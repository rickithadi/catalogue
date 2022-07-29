import React from "react";

import { Text, View } from "../components/Themed";
import { Cat, RootTabScreenProps } from "../types";
import AppStyles from "../styles/AppStyles";
import PopularCatCard from "../components/PopularCatCard";
import App from "../App";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const localCat: Cat = { name: "bob", uid: "1234", gender: "male", pets: 900 };
  return (
    <SafeAreaView style={AppStyles.container}>
      <View>
        <PopularCatCard cat={localCat}></PopularCatCard>
      </View>
    </SafeAreaView>
  );
}
