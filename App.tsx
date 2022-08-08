import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
  LondrinaSolid_100Thin,
  LondrinaSolid_300Light,
  LondrinaSolid_400Regular,
  LondrinaSolid_900Black,
} from "@expo-google-fonts/londrina-solid";
import AppLoading from "expo-app-loading";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    LondrinaSolid_100Thin,
    LondrinaSolid_300Light,
    LondrinaSolid_400Regular,
    LondrinaSolid_900Black,
  });

  if (!fontsLoaded || !isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
