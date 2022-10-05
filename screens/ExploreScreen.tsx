import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Image, Text } from "react-native";

import { Cat } from "../types/types";
import AppStyles from "../styles/AppStyles";
import Banner from "../components/Banner";
import { PopularCats } from "../components/PopularCats";
import CatsAround from "../components/CatsAround";
import { CurrentWhereAboutsContext } from "../App";
import { getCats, getProximity, supabase } from "../lib/supabase";

export default function ExploreScreen() {
  const { data: cats, isLoading, isSuccess } = getCats();
  const { data: proximity } = getProximity();
  console.log(proximity);

  const whereAbouts = useContext(CurrentWhereAboutsContext);

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
      {cats && cats.length > 0 && (
        <ScrollView>
          {/* TODO implement popularity based on pets */}
          <Banner cat={cats[Math.floor(Math.random() * cats.length)]}></Banner>
          <PopularCats cats={cats}></PopularCats>
          {/* TODO sort cats by proximity */}
          <CatsAround
            cats={[rusty, loki]}
            locationGeocodedAddressList={
              whereAbouts?.address ? whereAbouts.address : undefined
            }
          ></CatsAround>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
