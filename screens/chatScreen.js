import React, { useEffect, useState } from "react";
import firebase from "../database/firebaseDB";
import { GiftedChat } from "react-native-gifted-chat";
import { MaterialIcons } from '@expo/vector-icons'; 

const db = firebase.firestore().collection("messages");
const auth = firebase.auth();

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
   
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Chat");
      } else {
        navigation.navigate("Login");
      }
    });

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={logout}>
                    <MaterialIcons name="logout" size={24} color="grey" />
                </TouchableOpacity>                    
            ),
        });       
        const unsubscribeSnapshot = db
        .orderBy("createdAt", "desc")
        .onSnapshot((collectionSnapshot) => {
          const serverMessages = collectionSnapshot.docs.map((doc) => {
            const data = doc.data();
            console.log(data);
            const returnData = {
              ...doc.data(),
              createdAt: new Date(data.createdAt.seconds * 1000),
            };
            return returnData;
          });
          setMessages(serverMessages);
        });
  
      return () => {
        unsubscribeAuth();
        unsubscribeSnapshot();
      };
    }, []);
  
    function logout() {
      auth.signOut();
    }
  
    function sendMessages(newMessages) {
      console.log(newMessages);
      const newMessage = newMessages[0];
      db.add(newMessage);
    }
  
    return (
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => sendMessages(newMessages)}
        renderUsernameOnMessage={true}
        listViewProps={{
          style: {
            backgroundColor: "#666",
          },
        }}
        user={{
          _id: 1,
        }}
      />
    );
  }