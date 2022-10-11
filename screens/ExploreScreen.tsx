import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Image, Text } from "react-native";

import { Cat, ProximityCat } from "../types/types";
import AppStyles from "../styles/AppStyles";
import Banner from "../components/Banner";
import { PopularCats } from "../components/PopularCats";
import CatsAround from "../components/CatsAround";
import { CurrentWhereAboutsContext } from "../App";
import { getCats, getCatsInProximity } from "../lib/supabase";

export default function ExploreScreen() {
  const { data: cats } = getCats();
  const whereAbouts = useContext(CurrentWhereAboutsContext);

  const { data: proximityCats, refetch } = getCatsInProximity(
    whereAbouts?.location?.coords.longitude || 0,
    whereAbouts?.location?.coords.latitude || 0,
    200,
    10
  );

  useEffect(() => {
    refetch();
  }, [whereAbouts]);

  return (
    <SafeAreaView style={AppStyles.container}>
      {cats && cats.length > 0 && (
        <ScrollView>
          {/* TODO implement popularity based on pets */}
          <Banner cat={cats[Math.floor(Math.random() * cats.length)]}></Banner>
          <PopularCats cats={cats}></PopularCats>
          {/* TODO sort cats by proximity */}
          <CatsAround cats={proximityCats as ProximityCat[]}></CatsAround>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
