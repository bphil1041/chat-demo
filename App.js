import React from 'react';
import Start from './Components/Start';
import Chat from './Components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);


const App = () => {


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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat
            db={db}
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;