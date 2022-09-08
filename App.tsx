import { StatusBar } from "expo-status-bar";
import "react-native-url-polyfill/auto";
import React, { createContext, useEffect, useState } from "react";
import Constants from "expo-constants";

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
import {
  LocationGeocodedAddress,
  LocationObject,
  setGoogleApiKey,
} from "expo-location";
import * as Location from "expo-location";
import { Whereabouts } from "./types/types";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [locationGeocodedAddress, setLocationGeocodedAddress] = useState<
    undefined | LocationGeocodedAddress[]
  >(undefined);
  const [location, setLocation] = useState<undefined | LocationObject>(
    undefined
  );

  const CurrentWhereAboutsContext = createContext<Whereabouts | undefined>(
    undefined
  );

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
  setGoogleApiKey(Constants.manifest?.extra?.googleApiKey);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationGeocodedAddress(undefined);
      } else {
        Location.getCurrentPositionAsync({}).then((loc) =>
          Location.reverseGeocodeAsync(loc.coords).then((data) => {
            console.log(data, loc);
            setLocation(loc);
            setLocationGeocodedAddress(data);
          })
        );
      }
    })();
  }, []);

  if (!fontsLoaded || !isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <CurrentWhereAboutsContext.Provider
          value={{ location, address: locationGeocodedAddress }}
        >
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </CurrentWhereAboutsContext.Provider>
      </SafeAreaProvider>
    );
  }
}
