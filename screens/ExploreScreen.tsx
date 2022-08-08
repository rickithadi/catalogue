import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Cat } from "../types";
import AppStyles from "../styles/AppStyles";
import Banner from "../components/Banner";
import PopularCats from "../components/PopularCats";

// get location
export default function ExploreScreen() {
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
      <PopularCats cats={[rusty, loki]}></PopularCats>
      {/* cats around location */}
    </SafeAreaView>
  );
}
