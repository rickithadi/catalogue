import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
    whereabouts: undefined,
  };
  const loki: Cat = {
    name: "loki",
    id: "1234",
    gender: false,
    pets: 900,
    whereabouts: undefined,
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
