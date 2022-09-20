import React, { useContext, useState } from "react";
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
    pets: 0,
    gallery: [],
    whereAbouts: undefined,
  };

  const [cat, setCat] = useState<Cat | EmptyCat>(emptyCat);

  const handleChangeText = (value: string, name: string) => {
    setCat({ ...cat, [name]: value });
  };

  const saveNewCat = async () => {
    if (cat.name === "") {
      alert("please provide a name");
    } else {
      const { data, error } = await supabase.from("cats").insert(cat);
      if (error) {
        console.log(error);
      }
    }
  };
  const uploadImage = async (gallery: string[]) => {
    gallery.map(async (image, index) => {
      const { data, error } = await supabase.storage
        .from("cats")
        .upload(
          `${cat.name}${index}${whereAbouts?.location?.timestamp}`,
          image,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );
      if (error) {
        console.log(error);
      }
    });
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
            !props.catPictures
          }
          onPress={() =>
            // uploadImage(props.catPictures).then(() => saveNewCat())
            uploadImage(props.catPictures)
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
