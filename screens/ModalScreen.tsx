import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Platform, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AppStyles from "../styles/AppStyles";

export const ModalScreen = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  return (
    <View style={AppStyles.centeredView}>
      <Text style={AppStyles.title}>Cat Succesfully created!</Text>
      <View
        style={AppStyles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Ionicons name="checkmark" size={100} color={Colors[colorScheme].tint} />

      <Pressable onPress={() => navigation.navigate("home")}>
        <Text style={AppStyles.smallButtonText}>Back</Text>
      </Pressable>
      <Button
        title="Back Home"
        onPress={() => navigation.navigate("home")}
      ></Button>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};
