import { StatusBar } from "expo-status-bar";
/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
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
import * as Location from "expo-location";
import {
  LocationGeocodedAddress,
  LocationObject,
  setGoogleApiKey,
} from "expo-location";
import { QueryClient, QueryClientProvider } from "react-query";

import { Whereabouts } from "./types/types";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export const CurrentWhereAboutsContext = createContext<Whereabouts | undefined>(
  undefined
);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  const [appIsReady, setAppIsReady] = useState(false);
  const [locationGeocodedAddress, setLocationGeocodedAddress] = useState<
    undefined | LocationGeocodedAddress[]
  >(undefined);
  const [location, setLocation] = useState<undefined | LocationObject>(
    undefined
  );

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
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
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    //NOTE dont waste API calls there is a limit
    if (!location || !locationGeocodedAddress) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("geolocation permission denied");
          setLocationGeocodedAddress(undefined);
          setLocation(undefined);
        } else {
          Location.getCurrentPositionAsync({}).then((loc) =>
            Location.reverseGeocodeAsync(loc.coords).then((data) => {
              console.log("got geolocation", data, loc);
              setLocation(loc);
              setLocationGeocodedAddress(data);
            })
          );
        }
      })();
    }
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <CurrentWhereAboutsContext.Provider
          value={{
            location,
            address: locationGeocodedAddress
              ? locationGeocodedAddress
              : undefined,
          }}
        >
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </CurrentWhereAboutsContext.Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
