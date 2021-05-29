import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import ChatScreen from "./screens/chatScreen";
import LoginScreen from "./screens/loginScreen";
import SignUpScreen from "./screens/signUpScreen";
import { Modal } from "react-native";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen component={ChatScreen} name="Chat" />
        <Stack.Screen
          component={LoginScreen}
          name="Login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignUpScreen}
          name="Singup"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
