import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
   
  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={loginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat" 
            component={ChatScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
   }
   
   const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffc",
      alignItems: "center",
      justifyContent: "center",
    },
   });
   