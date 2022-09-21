import { Ionicons } from "@expo/vector-icons";
import { MediaType } from "expo-media-library";
import React, { useMemo } from "react";
import { AssetsSelector } from "expo-images-picker";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import navigation from "../navigation";

type Props = {
  setSelectedPictures: (pictures: any[]) => void;
  back: () => void;
};
export const ImagePicker = ({ setSelectedPictures, back }: Props) => {
  const colorScheme = useColorScheme();
  const _textStyle = {
    color: "white",
  };

  const _buttonStyle = {
    backgroundColor: Colors[colorScheme].tint,
    borderRadius: 5,
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
      assetsType: [MediaType.photo],
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

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "finish",
        back: "back",
        selected: "selected",
      },
      midTextColor: "black",
      backFunction: false,
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {
        back();
      },
      onSuccess: (e: any) => {
        console.log(e);
        setSelectedPictures(e);
      },
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: Colors[colorScheme].tint,
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
    <AssetsSelector
      Settings={widgetSettings}
      Errors={widgetErrors}
      Styles={widgetStyles}
      Navigator={widgetNavigator}
    />
  );
};
