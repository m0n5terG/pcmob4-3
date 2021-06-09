import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Keyboard,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input } from "react-native-elements";
import firebase from "../database/firebaseDB";

const { width, height } = Dimensions.get("screen");
const auth = firebase.auth();

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");

  function signUp() {
    Keyboard.dismiss();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User account created & signed in!");
        user
          .updateProfile({
            displayName: name,
            photoURL: imageURL
              ? imageURL
              : "https://www.trackergps.com/canvas/images/icons/avatar.jpg",
          })
          .catch((error) => {
            console.log("Error!");
            setErrorText(error.message);
          });
          navigation.navigate('Chat');

        //...
      });
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
        <ScrollView style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Input
          style={styles.input}
          placeholder="Enter display Name"
          label="Display Name"
          value={name}
          leftIcon={{ type: "material", name: "how-to-reg" }}
          onChangeText={(text) => setName(text)}
        />
        <Input
          style={styles.input}
          autoCapitalize='none'
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
        <Input
          style={styles.input}
          placeholder="Enter your image url"
          label="Profile Picture"
          value={imageURL}
          leftIcon={{ type: "material", name: "camera-alt" }}
          onChangeText={(text) => setImageURL(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Already have account? Log In</Text>
        </TouchableOpacity>

        <Text style={styles.errorText}>{errorText}</Text>
        </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f11212",
    marginTop: height / 10,
    marginBottom: 10,
    alignSelf: 'center'
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
    alignSelf: 'center',
    backgroundColor: "orange",
    borderRadius: 5,
    width: width / 2,
    marginBottom: 20
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
