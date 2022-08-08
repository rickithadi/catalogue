import React from "react";

import { Text, View } from "../components/Themed";
import AppStyles from "../styles/AppStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.container}>
        <Text>nada</Text>
      </View>
    </SafeAreaView>
  );
}
