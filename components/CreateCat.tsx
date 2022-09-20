import React, { useContext, useState } from "react";
import { decode } from "base64-arraybuffer";
import { Button, View, StyleSheet, TextInput, ScrollView } from "react-native";

import { Cat, EmptyCat } from "../types/types";
import { supabase } from "../lib/supabase";
import { CurrentWhereAboutsContext } from "../App";

const CreateCat = (props: { catPictures: string[] }) => {
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

  const handleChangeText = (value: string, name: string) => {
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
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={cat.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Description"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "description")}
          value={cat.description}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="temperament"
          onChangeText={(value) => handleChangeText(value, "temperament")}
          value={cat.temperament}
        />
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
          onPress={() =>
            createCat().then((createdCat) =>
              uploadImage(props.catPictures, createdCat)
            )
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 35,
  },
  photoContainer: {
    height: 100,
    flex: 1,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  image: { height: 150, width: 150 },
});

export default CreateCat;
