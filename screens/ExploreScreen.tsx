import React from "react";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import AppStyles from "../styles/AppStyles";

export default function ExploreScreen() {
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.title}>Explore tab</Text>
    </View>
  );
}
