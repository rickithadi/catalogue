import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import AppStyles from "../styles/AppStyles";

import { Cat } from "../types";
import { MonoText } from "./StyledText";

export default function PopularCatCard(cat: Cat) {
  return (
    <View>
      <View style={AppStyles.container}>
        <Text darkColor="rgba(255,255,255,0.8)">
          Open up the code for this screen:
        </Text>

        <View>
          <TouchableOpacity
            onPress={() => alert("Hello, world!")}
            style={{ backgroundColor: "blue" }}
          >
            <Text style={{ fontSize: 20, color: "#fff" }}>Pick a photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
