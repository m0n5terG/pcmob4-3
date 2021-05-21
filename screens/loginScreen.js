import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableWithoutFeedback, 
    TextInput 
} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../database/firebaseDB";

const db = firebase.firestore();
const auth = firebase.auth();

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Signed In!");
            navigation.navigate("Chat", { email });
        })
        .catch((error) => {
            console.log("Error!");
        });
    }
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Chat App</Text>
                <Text style={styles.fieldTitle}>Email</Text>
                <TextInput
                  style={styles.imput}
                  placeholder="Enter Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.fieldTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.loginButton} onPress={null}>
                <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    )
}