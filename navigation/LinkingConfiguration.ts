/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("~/dev/catalogue/catalogue-client")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: "Home",
            },
          },
          Explore: {
            screens: {
              Explore: "Explore",
            },
          },
          Inbox: {
            screens: {
              Inbox: "Inbox",
            },
          },
          Profile: {
            screens: {
              Profile: "Profile",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
