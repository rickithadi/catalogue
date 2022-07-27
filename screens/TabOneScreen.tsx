import { StyleSheet } from 'react-native';
import { Image} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import logo from '../assets/images/logo.png';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import AppStyles from '../styles/AppStyles';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={AppStyles.container}>
<Image source={logo} style={AppStyles.logo} />
      <Text style={AppStyles.title}>I like big butts</Text>
      <View style={AppStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

