import React, { useContext, useState } from "react";
import { decode } from "base64-arraybuffer";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Switch } from "react-native-switch";

import { Cat, EmptyCat } from "../types/types";
import { supabase } from "../lib/supabase";
import { CurrentWhereAboutsContext } from "../App";
import AppStyles from "../styles/AppStyles";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { WhereAboutDisplay } from "./WhereAboutDisplay";

const CreateCat = (props: { catPictures: string[] }) => {
  const colorScheme = useColorScheme();
  const whereAbouts = useContext(CurrentWhereAboutsContext);

  const emptyCat: EmptyCat = {
    name: "",
    gender: false,
    description: "",
    temperament: "",
    pets: 69,
    whereAbouts: undefined,
  };
  // TODO lastseen and whereabouts, gallery

  const [cat, setCat] = useState<Cat | EmptyCat>(emptyCat);
  const [loading, setLoading] = useState(false);

  const handleChangeText = (value: string | boolean, name: string) => {
    setCat({ ...cat, [name]: value });
  };

  const createCat = async () => {
    console.log("submiting", cat);
    const { data, error } = await supabase.from("cats").insert(cat).select("*"); // <- new since v2; //insert an object with the key value pair, the key being the column on the table
    if (error) {
      console.log(error);
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
        whereAbouts?.location?.timestamp
          ? whereAbouts?.location?.timestamp
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
    return await updateCatGallery(createdCat.id, publicUrlList);
  };

  const updateCatGallery = async (catId: string, publicUrlList: string[]) => {
    // TODO create whereabouts and pop gallery
    if (publicUrlList.length === 0) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // TODO create whereabouts with relation to cat and user id
      const { data, error } = await supabase
        .from("whereabouts")
        .insert({
          description: "inital whereabouts",
          location: whereAbouts?.location,
          address: whereAbouts?.address,
          user: user?.id,
          cat: catId,
          pictures: publicUrlList,
        })
        .select("*"); // <- new since v2; //insert an object with the key value pair, the key being the column on the table
      // TODO update cat whereabouts with whereabouts id
      console.log("created whereabouts", data, error);
      if (data) {
        await supabase
          .from("cats")
          .update({ whereAbouts: data[0].id })
          .eq("id", catId);
      }
      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={AppStyles.formContainer}>
      {/* Name Input */}
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
      {whereAbouts ? (
        <WhereAboutDisplay whereAbouts={whereAbouts} />
      ) : (
        <Text style={AppStyles.locationStyle}>Singapore</Text>
      )}
      {/* </View> */}
      <View>
        <Button
          title="Create Cat"
          testID="CreateCatButton"
          disabled={
            !cat.description ||
            !cat.name ||
            !cat.temperament ||
            props.catPictures.length === 0
          }
          onPress={() =>
            createCat().then((createdCat) =>
              uploadImage(props.catPictures, createdCat)
            )
          }
        />
      </View>
    </View>
  );
};

export default CreateCat;
