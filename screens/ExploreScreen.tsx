import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { LocationGeocodedAddress } from "expo-location";
import { ScrollView } from "react-native";

import { Cat } from "../types";
import AppStyles from "../styles/AppStyles";
import Banner from "../components/Banner";
import PopularCats from "../components/PopularCats";
import CatsAround from "../components/CatsAround";

export default function ExploreScreen(props: {
  locationGeocodedAddress: undefined | LocationGeocodedAddress[];
}) {
  // TODO mock this
  const rusty: Cat = {
    name: "rusty",
    uid: "234",
    gender: "male",
    pets: 900,
    description: "very soft and fluffy, 10/10",
    location: {
      city: "Singapore",
      country: "Singapore",
      isoCountryCode: "SG",
      name: "862 Tampines Street 83",
      postalCode: "520862",
      street: "Tampines Street 83",

      streetNumber: "862",
      district: "862",
      subregion: "862",
      region: "862",
      timezone: "862",
    },
  };
  const loki: Cat = {
    name: "loki",
    uid: "1234",
    gender: "male",
    pets: 900,
    location: {
      city: "Singapore",
      country: "Singapore",
      isoCountryCode: "SG",
      name: "862 Tampines Street 83",
      postalCode: "520862",
      street: "Tampines Street 83",

      streetNumber: "862",
      district: "862",
      subregion: "862",
      region: "862",
      timezone: "862",
    },
  };
  return (
    <SafeAreaView style={AppStyles.container}>
      <ScrollView>
        <Banner cat={rusty}></Banner>
        <PopularCats cats={[rusty, loki]}></PopularCats>
        <CatsAround
          cats={[rusty, loki]}
          locationGeocodedAddress={locationGeocodedAddress}
        ></CatsAround>
      </ScrollView>
    </SafeAreaView>
  );
}
