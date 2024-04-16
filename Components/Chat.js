import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { onSnapshot, addDoc, collection, query, orderBy } from 'firebase/firestore';

const Chat = ({ route, db }) => {
    // Destructure userID and name from route params
    const { userID, name } = route.params;

    // State to store chat messages
    const [messages, setMessages] = useState([]);

    // Log the userID for debugging
    console.log('userID:', userID);

    // Function to handle sending new messages
    const onSend = (newMessages = []) => {
        // Format the message with the correct user ID
        const formattedMessages = newMessages.map(message => ({
            ...message,
            user: {
                _id: message.user._id,
                name: message.user.name,
            },
        }));
        // Add the formatted message to the Firestore collection
        addDoc(collection(db, 'messages'), formattedMessages[0]);
    };

    // Custom rendering for chat bubbles
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

    // Effect to fetch and update chat messages from Firestore
    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let newMessages = [];
            snapshot.forEach((doc) => {
                newMessages.push({ _id: doc.id, ...doc.data() });
            });
            setMessages(newMessages);
        });

        // Cleanup function to unsubscribe from snapshot listener
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{name}</Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: userID,
                    name: name,
                }}
                renderBubble={renderBubble}
            />
            {/* KeyboardAvoidingView to handle keyboard behavior */}
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
