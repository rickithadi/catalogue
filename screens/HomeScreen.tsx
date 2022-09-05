import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.container}>
        <CreateCat />
      </View>
    </SafeAreaView>
  );
}
