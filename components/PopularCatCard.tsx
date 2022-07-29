import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MonoText } from "./StyledText";

export default function PopularCatCard({ cat }: Cat) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
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
        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        >
          <MonoText>{path}</MonoText>
        </View>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </View>
    </View>
  );
}
