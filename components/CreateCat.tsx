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
    description: "",
    temperament: "",
    gender: false,
    pets: 69,
    whereAbouts: whereAbouts || undefined,
  };

  const [cat, setCat] = useState<Cat | EmptyCat>(emptyCat);

  const handleChangeText = (value: string | boolean, name: string) => {
    setCat({ ...cat, [name]: value });
  };

  const createCat = async () => {
    const { data, error } = await supabase.from("cats").insert(cat).select("*"); // <- new since v2; //insert an object with the key value pair, the key being the column on the table
    if (error) {
      console.log(error);
    } else {
      // NOTE sort this type out
      console.log("created", data);
      return data[0];
    }
  };

  const uploadImage = async (gallery: string[], createdCat: Cat) => {
    console.log("uploading", gallery);
    if (!createdCat) return;
    console.log("uploading images for", createdCat.id);
    const publicUrlList: string[] = [];
    gallery.map(async (image, index) => {
      const fileName = `${createdCat?.id}/${index}#${whereAbouts?.location?.timestamp}`;
      console.log("uploading image", index, fileName);
      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, decode(image), {
          contentType: "image/png",
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        console.log(error);
        return;
      }
      const { data: publicURL } = supabase.storage
        .from("cats")
        .getPublicUrl(fileName);
      publicUrlList.push(publicURL.publicUrl);
    });
    // TODO maybe abstract this out
    updateCatGallery(createdCat.id, publicUrlList);
  };
  const updateCatGallery = async (catId: string, publicUrlList: string[]) => {
    console.log("updasing url list", publicUrlList);
    console.log("of cat", catId);
    await supabase
      .from("cats")
      .update({ gallery: publicUrlList })
      .match({ id: catId });
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
      <View style={AppStyles.inputGroup}>
        <Text style={AppStyles.smallButtonText}>Location</Text>
        {whereAbouts ? (
          <WhereAboutDisplay whereAbouts={whereAbouts} />
        ) : (
          <Text style={AppStyles.locationStyle}>"Singapore"</Text>
        )}
      </View>
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
          onPress={
            () => console.log(cat)
            //          createCat().then((createdCat) =>
            // uploadImage(props.catPictures, createdCat)

            // )
          }
        />
      </View>
    </View>
  );
};

export default CreateCat;
