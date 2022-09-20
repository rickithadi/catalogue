import React, { useContext, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";

import AppStyles from "../styles/AppStyles";
import CreateCat from "../components/CreateCat";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { AssetsSelector } from "expo-images-picker";
import { Asset } from "expo-asset";
import navigation from "../navigation";
import { MediaType } from "expo-media-library";

export default function NewCatScreen() {
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);

  const colorScheme = useColorScheme();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      orderedSelection: true,
      selectionLimit: 5,
      allowsMultipleSelection: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("selected", result);
    if (!result.cancelled && result.selected) {
      result.selected.map((photo) => {
        setSelectedPictures((current) => [
          ...current,
          // `data:image/png;base64,${photo.base64}`,
          photo.uri,
        ]);
      });
    }
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was an error while loading images.",
        hasErrorWithResizing: "There was an error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
      initialLoad: 100,
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: 1,
      maxSelection: 3,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 50,
      compress: 0.7,
      base64: false,
      saveTo: "jpeg",
    }),
    []
  );

  const _textStyle = {
    color: "white",
  };

  const _buttonStyle = {
    backgroundColor: Colors[colorScheme].tint,
    borderRadius: 5,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "finish",
        back: "back",
        selected: "selected",
      },
      midTextColor: "black",
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {},
      onSuccess: (e: any) => console.log(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: "blue",
      widgetWidth: 99,
      widgetHeight: 40,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: "#0eb14970",
        size: 26,
      },
    }),
    []
  );
  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.createCatImageContainer}>
        <AssetsSelector
          Settings={widgetSettings}
          Errors={widgetErrors}
          Styles={widgetStyles}
          Navigator={widgetNavigator}
        />
      </View>
      <CreateCat catPictures={selectedPictures} />
    </SafeAreaView>
  );
}
