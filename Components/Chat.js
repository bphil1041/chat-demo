import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { onSnapshot, addDoc, collection, query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = ({ route, db, isConnected }) => {
    const { userID, name } = route.params;
    const [messages, setMessages] = useState([]);
    let soundObject = null;


    const onSend = (newMessages) => {
        const formattedMessages = newMessages.map(message => ({
            ...message,
            user: {
                _id: message.user._id || userID,
                name: message.user.name,
            },
        }));
        addDoc(collection(db, 'messages'), formattedMessages[0]);
    };


    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'turquoise',
                    },
                    left: {
                        backgroundColor: 'navajowhite',
                    },
                }}
                textStyle={{
                    right: {
                        color: 'black',
                    },
                    left: {
                        color: 'black',
                    },
                }}
            />
        );
    };

    // Prevent rendering of InputToolbar when offline
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    // Messages database
    let unsubMessages;
    useEffect(() => {
        if (isConnected === true) {
            // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (documentSnapshot) => {
                let newMessages = [];
                documentSnapshot.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                });
                cacheMessagesHistory(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        // Clean up code
        return () => {
            if (unsubMessages) unsubMessages();
            if (soundObject) soundObject.unloadAsync();
        }
    }, [isConnected]);

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("chat_messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const cacheMessagesHistory = async (listsToCache) => {
        try {
            await AsyncStorage.setItem('chat_messages', JSON.stringify(listsToCache));
        } catch (error) {
            console.log(error.message);
        }
    }



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{name}</Text>
            </View>
            <GiftedChat
                messages={messages}
                renderInputToolbar={renderInputToolbar}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: userID,
                    name: name,
                }}
                renderBubble={renderBubble}
            />
            {Platform.OS === 'android' ? (
                <KeyboardAvoidingView behavior="height" />
            ) : null}
            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView behavior="padding" />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#757083',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Chat;
