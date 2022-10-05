/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import InboxScreen from "../screens/InboxScreen";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types/types";
import LinkingConfiguration from "./LinkingConfiguration";
import { supabase } from "../lib/supabase";
import Account from "../components/Account";
import Auth from "../components/Auth";
import NewCatScreen from "../screens/NewCatScreen";
import { ModalScreen } from "../screens/ModalScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [session, setSession] = React.useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {session && session.user ? (
        <RootNavigator key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ session }: { session: Session }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        children={() => (
          <BottomTabNavigator key={session.user.id} session={session} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="SuccessfulCatCreation"
        component={ModalScreen}
        options={({ navigation }) => ({
          title: "Cat Created!",
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ session }: { session: Session }) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        children={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Explore"
        component={() => <ExploreScreen />}
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="compass" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="New"
        // children={() => <NewCatScreen />}
        component={NewCatScreen}
        options={({ navigation }: RootTabScreenProps<"New">) => ({
          title: "New",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                position: "absolute",
                bottom: 10, // space from bottombar
                height: 58,
                width: 58,
                borderRadius: 58,
                borderWidth: 2,
                backgroundColor: Colors[colorScheme].background,
                borderColor: Colors[colorScheme].tint,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabBarIcon name="plus" color={color} />
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          title: "Inbox",
          tabBarIcon: ({ color }) => <TabBarIcon name="inbox" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        children={() => <Account key={session.user.id} session={session} />}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
