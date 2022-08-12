import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import { LocationObject } from "expo-location";
import { ScrollView } from "react-native";

import { Cat } from "../types";
import AppStyles from "../styles/AppStyles";
import Banner from "../components/Banner";
import PopularCats from "../components/PopularCats";
import CatsAround from "../components/CatsAround";

export default function ExploreScreen() {
  const [location, setLocation] =
    useState<undefined | LocationObject>(undefined);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation(undefined);
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const rusty: Cat = {
    name: "rusty",
    uid: "234",
    gender: "male",
    pets: 900,
    description: "very soft and fluffy, 10/10",
  };
  const loki: Cat = { name: "loki", uid: "1234", gender: "male", pets: 900 };
  return (
    <SafeAreaView style={AppStyles.container}>
      <ScrollView>
        <Banner cat={rusty}></Banner>
        <PopularCats cats={[rusty, loki]}></PopularCats>
        <CatsAround cats={[rusty, loki]} location={location}></CatsAround>
      </ScrollView>
    </SafeAreaView>
  );
}
