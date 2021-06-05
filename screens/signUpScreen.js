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
import { Input } from "react-native-elements";
import firebase from "../database/firebaseDB";


const { width, height } = Dimensions.get("screen");
const auth = firebase.auth();

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

function signUp() {
  Keyboard.dismiss();
  auth
  .createUserWithEmailAndPassword( email, password )
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('User account created & signed in!');
      user.updateProfile({
      displayName: name,
      photoURL: imageUrl ? imageUrl : "https://www.trackergps.com/canvas/images/icons/avatar.jpg"
  })
  .catch((error) => {
    console.log("Error!");
    setErrorText(error.message);
  });
  })
}
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Already have account? Log In</Text>
        </TouchableOpacity>
        <Input
          style={styles.input}
          placeholder='Enter your image url'
          label='Profile Picture'
          leftIcon={{ type: 'material', name: 'face' }}
          onChangeText={text => setImageUrl(text)}
        />
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
    width: width / 1.3,
    height: height / 20,
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

