import React from 'react';
import Start from './Components/Start';
import Chat from './Components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";



const App = () => {

  const connectionStatus = useNetInfo();

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBl33IU1V73I5WsZoIUKpUv_nOXXTFHi2Q",
    authDomain: "chat-app-14464.firebaseapp.com",
    projectId: "chat-app-14464",
    storageBucket: "chat-app-14464.appspot.com",
    messagingSenderId: "969722933652",
    appId: "1:969722933652:web:b071cf4838ba2aecec9f81"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);


  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;