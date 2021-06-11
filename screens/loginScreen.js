import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input } from "react-native-elements";
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
        const user = userCredential.user;
        console.log("Signed In!");
      })
      .catch((error) => {
        console.log("Error!");
        setErrorText(error.message);
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        navigation.replace("Chat");
      } else {
        navigation.navigate("Login");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <Input
          style={styles.input}
          autoCapitalize="none"
          placeholder="Enter your email"
          label="Email"
          value={email}
          leftIcon={{ type: "material", name: "alternate-email" }}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          label="Password"
          value={password}
          leftIcon={{ type: "material", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.buttonText}>New User? Sign Up</Text>
        </TouchableOpacity>
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
    color: "#f11212",
    marginTop: height / 10,
    marginBottom: 10,
  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    width: width / 1.3,
    height: height / 20,
    paddingHorizontal: 10,
  },
  loginButton: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    width: width / 2,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "blue",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
  },
});
