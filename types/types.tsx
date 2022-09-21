/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LocationGeocodedAddress, LocationObject } from "expo-location";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type Feeder = {
  uid: string;
};

export type Cat = {
  id: string;
  name: string;
  gender: boolean;
  lastSeen?: Whereabouts[]; //user populated by public by current location
  gallery?: string[];
  temperament?: string;
  description?: string;
  pets: number;
  feeder?: Feeder;
  whereAbouts: Whereabouts | undefined; //populated at creation by current location
};
export type Whereabouts = {
  address: LocationGeocodedAddress[] | undefined;
  location: LocationObject | undefined;
  pictures?: string[];
};

export type EmptyCat = Omit<Cat, "uid" | "id">;

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  New: undefined;
  Explore: undefined;
  Inbox: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
