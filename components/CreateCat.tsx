import React, { useContext, useState } from "react";
import { decode } from "base64-arraybuffer";
import { Button, View, Text, TextInput, ActivityIndicator } from "react-native";
import { Switch } from "react-native-switch";

import { Cat, EmptyCat } from "../types/types";
import { supabase } from "../lib/supabase";
import { CurrentWhereAboutsContext } from "../App";
import AppStyles from "../styles/AppStyles";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { WhereAboutDisplay } from "./WhereAboutDisplay";

type Props = {
  catPictures: string[];
  onSuccess: () => void;
};
export const CreateCat = ({ catPictures, onSuccess }: Props) => {
  const colorScheme = useColorScheme();
  const whereabouts = useContext(CurrentWhereAboutsContext);

  const emptyCat: EmptyCat = {
    name: "",
    gender: false,
    description: "",
    temperament: "",
  };

  const [cat, setCat] = useState<Cat | EmptyCat>(emptyCat);
  const [loading, setLoading] = useState(false);

  const handleChangeText = (value: string | boolean, name: string) => {
    setCat({ ...cat, [name]: value });
  };

  const createCat = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("cats").insert(cat).select("*"); // <- new since v2; //insert an object with the key value pair, the key being the column on the table
    if (error) {
      console.log(error);
      resetForm();
    } else {
      // NOTE sort this type out
      return data[0];
    }
  };

  const uploadImage = async (gallery: any[], createdCat: Cat) => {
    const publicUrlList: string[] = [];

    if (!createdCat) return;

    gallery.map((image, index) => {
      const fileName = `${
        whereabouts?.location?.timestamp
          ? whereabouts?.location?.timestamp
          : Date.now()
      }`;
      const filePath = `${createdCat?.id}/${fileName}-${index}.png`;

      supabase.storage.from("cats").upload(filePath, decode(image.base64), {
        contentType: "image/png",
        cacheControl: "3600",
        upsert: false,
      });

      const { data: publicURL } = supabase.storage
        .from("cats")
        .getPublicUrl(filePath);

      publicUrlList.push(publicURL.publicUrl);
    });
    return await updateCatGallery(createdCat, publicUrlList);
  };

  const updateCatGallery = async (createdCat: Cat, publicUrlList: string[]) => {
    if (publicUrlList.length === 0) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: whereAboutsData, error } = await supabase
        .from("whereabouts")
        .insert({
          description: "inital whereabouts",
          initial: true,
          location: whereabouts?.location,
          address: whereabouts?.address,
          user_id: user?.id,
          cat_id: createdCat.id,
          pictures: publicUrlList,
          lat: whereabouts?.location?.coords?.latitude,
          long: whereabouts?.location?.coords?.longitude,
          postal: whereabouts?.address[0].postalCode,
          geog: null,
        })
        .select("*"); // <- new since v2; //insert an object with the key value pair, the key being the column on the table

      if (whereAboutsData) {
        const updatedCat = {
          ...createdCat,
          last_seen_id: whereAboutsData[0].id,
        };

        const { error } = await supabase.from("cats").upsert(updatedCat);
        if (error) throw error;
      }

      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      onSuccess();
      resetForm();
    }
  };

  const resetForm = () => {
    setLoading(false);
    setCat(emptyCat);
  };

  return (
    <View style={AppStyles.formContainer}>
      <View style={AppStyles.formVerticalEven}>
        <View style={[{ flex: 3, marginTop: 20 }, AppStyles.inputGroup]}>
          <TextInput
            placeholder="Name"
            onChangeText={(value) => handleChangeText(value, "name")}
            value={cat.name}
          />
        </View>

        <View style={[{ flex: 1, paddingBottom: 20 }, AppStyles.evenlyVert]}>
          <Text style={AppStyles.smallButtonText}>
            {cat.gender ? "male" : "female"}
          </Text>
          <Switch
            containerStyle={{ flex: 1 }}
            activeText={"M"}
            inActiveText={"F"}
            circleSize={40}
            circleBorderWidth={0}
            backgroundActive={Colors[colorScheme].tabIconSelected}
            backgroundInactive={Colors[colorScheme].tabIconDefault}
            circleActiveColor={Colors[colorScheme].tabIconDefault}
            circleInActiveColor={Colors[colorScheme].tabIconSelected}
            onValueChange={(value: boolean) =>
              handleChangeText(value, "gender")
            }
            value={cat.gender}
          />
        </View>
      </View>
      {/* Email Input */}
      <View style={AppStyles.inputGroup}>
        <TextInput
          placeholder="Description"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "description")}
          value={cat.description}
        />
      </View>
      {/* Input */}
      <View style={AppStyles.inputGroup}>
        <TextInput
          placeholder="temperament"
          onChangeText={(value) => handleChangeText(value, "temperament")}
          value={cat.temperament}
        />
      </View>
      {/* <View style={AppStyles.inputGroup}> */}
      <Text style={AppStyles.smallButtonText}>Location</Text>
      {whereabouts ? (
        <WhereAboutDisplay whereAbouts={whereabouts} />
      ) : (
        <Text style={AppStyles.locationStyle}>Singapore</Text>
      )}

      <View>
        {loading ? (
          <ActivityIndicator size="large" style={AppStyles.spinner} />
        ) : (
          <Button
            title="Create Cat"
            testID="CreateCatButton"
            disabled={
              !cat.description ||
              !cat.name ||
              !cat.temperament ||
              catPictures.length === 0
            }
            onPress={() =>
              createCat().then((createdCat) =>
                uploadImage(catPictures, createdCat)
              )
            }
          />
        )}
      </View>
    </View>
  );
};

export default CreateCat;
