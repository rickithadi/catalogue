import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "../components/Themed";
import AppStyles from "../styles/AppStyles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.container}>home</View>
    </SafeAreaView>
  );
}
