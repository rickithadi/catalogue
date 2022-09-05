import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { setGoogleApiKey } from "expo-location";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
  LondrinaSolid_100Thin,
  LondrinaSolid_300Light,
  LondrinaSolid_400Regular,
  LondrinaSolid_900Black,
} from "@expo-google-fonts/londrina-solid";
import {
  RobotoMono_100Thin,
  RobotoMono_100Thin_Italic,
  RobotoMono_300Light,
  RobotoMono_300Light_Italic,
  RobotoMono_400Regular,
  RobotoMono_400Regular_Italic,
  RobotoMono_500Medium,
  RobotoMono_500Medium_Italic,
  RobotoMono_700Bold,
  RobotoMono_700Bold_Italic,
} from "@expo-google-fonts/roboto-mono";
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
    RobotoMono_100Thin,
    RobotoMono_100Thin_Italic,
    RobotoMono_300Light,
    RobotoMono_300Light_Italic,
    RobotoMono_400Regular,
    RobotoMono_400Regular_Italic,
    RobotoMono_500Medium,
    RobotoMono_500Medium_Italic,
    RobotoMono_700Bold,
    RobotoMono_700Bold_Italic,
  });

  // TODO use .env
  setGoogleApiKey(Constants.manifest?.extra?.googleApiKey);

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
