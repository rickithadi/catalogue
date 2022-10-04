import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Image, Text } from "react-native";

import { Cat } from "../types/types";
import AppStyles from "../styles/AppStyles";
import Banner from "../components/Banner";
import PopularCats from "../components/PopularCats";
import CatsAround from "../components/CatsAround";
import { CurrentWhereAboutsContext } from "../App";
import { supabase } from "../lib/supabase";

export default function ExploreScreen() {
  const [cats, setCats] = useState<undefined | Cat[]>(undefined);
  const [loading, setLoading] = useState(false);
  const [pictureMap, setPictureMap] = useState<Record<string, string>>({});

  const whereAbouts = useContext(CurrentWhereAboutsContext);
  useEffect(() => {
    getCats();
  }, []); // TODO mock this

  const getCats = async (done = false) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cats")
      .select("*")
      .order("id", { ascending: true });
    // if (error) throw error;
    setCats(data);
    setLoading(false);
  };

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
      {cats && (
        <ScrollView>
          <Banner cat={cats[0]}></Banner>
          <PopularCats cats={cats}></PopularCats>
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
