import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import logo from '../assets/images/logo.png';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import AppStyles from '../styles/AppStyles';
import React from 'react';

import * as SplashScreen from 'expo-splash-screen';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);
  return (
    <View style={AppStyles.container}>
<Image source={logo} style={AppStyles.logo} />
      <Text style={AppStyles.title}>I like big butts</Text>
      <View style={AppStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
          <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

