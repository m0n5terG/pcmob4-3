import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../database/firebaseDB";

const { width, height } = Dimensions.get("screen");
const auth = firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  function login() {
    Keyboard.dismiss();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Signed In!");
      })
      .catch((error) => {
        console.log("Error!");
        setErrorText(error.message);
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter Email"
          value={email}
          onChangeText={(input) => setEmail(input)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={styles.buttonText}>New User? Sign Up</Text>
        </TouchableWithoutFeedback>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#f11212',
    marginBottom: 10,
  },
  fieldTitle: {
    fontSize: 16,
  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    width: width / 1.5,
    height: height / 15,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
  },
  loginButton: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 20,
    width: width / 2,
  },
  buttonText: {
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
  },
});
