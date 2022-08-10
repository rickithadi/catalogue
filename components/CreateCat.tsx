import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, TextInput, ScrollView } from "react-native";

import {db} from "../firebase";

const CreateCat = () => {
  const initalState = {
    name: "",
    email: "",
    phone: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value: any, name: any) => {
    setState({ ...state, [name]: value });
  };



  const saveNewCat = async () => {
    if (state.name === "") {
      alert("please provide a name");
    } else {
      try {
        await db
          .collection("cats")
          .add({
            name: "test",
          })
          .then(() => setState(initalState));
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
          value={state.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="phone"
          onChangeText={(value) => handleChangeText(value, "phone")}
          value={state.phone}
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
