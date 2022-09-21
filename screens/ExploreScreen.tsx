import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { LocationGeocodedAddress } from "expo-location";
import { ScrollView, View } from "react-native";

import { Cat } from "../types/types";
import AppStyles from "../styles/AppStyles";
import Banner from "../components/Banner";
import PopularCats from "../components/PopularCats";
import CatsAround from "../components/CatsAround";
import { CurrentWhereAboutsContext } from "../App";

export default function ExploreScreen() {
  const whereAbouts = useContext(CurrentWhereAboutsContext);

  // TODO mock this
  const rusty: Cat = {
    name: "rusty",
    id: "234",
    gender: true,
    pets: 900,
    description: "very soft and fluffy, 10/10",
    whereAbouts: {
      address: [
        {
          streetNumber: "862",
          street: "Tampines Street 83",
          city: "Singapore",
          country: "Singapore",
          isoCountryCode: "SG",
          postalCode: "520862",
          name: "862 Tampines Street 83",
          // TODO find out why these arent coming back
          district: null,
          region: null,
          timezone: null,
          subregion: null,
        },
      ],
      location: {
        coords: {
          latitude: 1.3545155,
          longitude: 103.9364254,
          altitude: null,
          accuracy: 14.636,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: 1662433415304,
      },
    },
  };
  const loki: Cat = {
    name: "loki",
    id: "1234",
    gender: false,
    pets: 900,
    whereAbouts: {
      address: [
        {
          streetNumber: "862",
          street: "Tampines Street 83",
          city: "Singapore",
          country: "Singapore",
          isoCountryCode: "SG",
          postalCode: "520862",
          name: "862 Tampines Street 83",
          // TODO find out why these arent coming back
          district: "520862",
          region: "520862",
          timezone: "520862",
          subregion: "520862",
        },
      ],
      location: {
        coords: {
          latitude: 1.3545155,
          longitude: 103.9364254,
          altitude: null,
          accuracy: 14.636,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: 1662433415304,
      },
    },
  };
  return (
    <SafeAreaView style={AppStyles.container}>
      <ScrollView>
        <Banner cat={rusty}></Banner>
        <PopularCats cats={[rusty, loki]}></PopularCats>
        <CatsAround
          cats={[rusty, loki]}
          locationGeocodedAddressList={
            whereAbouts?.address ? whereAbouts.address : undefined
          }
        ></CatsAround>
      </ScrollView>
    </SafeAreaView>
  );
}
