import React from "react";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import AppStyles from "../styles/AppStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InboxScreen() {
  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.container}>
        <Text>nada</Text>
      </View>
    </SafeAreaView>
  );
}
