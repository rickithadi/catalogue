import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, TextInput, ScrollView } from "react-native";

import { db } from "../firebase";
import { Cat } from "../types";

const CreateCat = () => {
  const emptyCat: Cat = {
    name: "",
    description: "",
    gender: "male",
    uid: null,
    pets: 0,
  };

  const [cat, setCat] = useState(emptyCat);

  const handleChangeText = (value: any, name: any) => {
    setCat({ ...cat, [name]: value });
  };

  const saveNewCat = async () => {
    if (cat.name === "") {
      alert("please provide a name");
    } else {
      try {
        await db
          .collection("cats")
          .add(cat)
          .then(() => setCat(emptyCat));
      } catch (error) {
        console.log(error);
      }
    }
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
          onChangeText={(value) => handleChangeText(value, "email")}
          value={cat.description}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="temperament"
          onChangeText={(value) => handleChangeText(value, "phone")}
          value={cat.temperament}
        />
      </View>

      <View>
        <Button title="Create Cat" onPress={() => saveNewCat()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
});

export default CreateCat;
