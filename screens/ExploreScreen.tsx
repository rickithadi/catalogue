import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

import { Cat } from "../types";
import AppStyles from "../styles/AppStyles";
import Banner from "../components/Banner";
import PopularCats from "../components/PopularCats";
import { LocationObject } from "expo-location";

export default function ExploreScreen() {
  const [location, setLocation] = useState<null | LocationObject>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation(null);
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
      <Banner cat={rusty}></Banner>
      <PopularCats cats={[rusty, loki]} location={location}></PopularCats>
    </SafeAreaView>
  );
}
