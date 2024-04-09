import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

// Chat component receives the 'route' prop from navigation
const Chat = ({ route }) => {
    // State for storing chat messages
    const [messages, setMessages] = useState([]);

    // Extracting the user's name and selected background color from the navigation route params
    const { name, backgroundColor } = route.params;

    // Function to handle sending new messages
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    // Custom rendering for chat bubbles
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "turquoise",
                    },
                    left: {
                        backgroundColor: "navajowhite",
                    },
                }}
                textStyle={{
                    right: {
                        color: "black",
                    },
                    left: {
                        color: "black",
                    },
                }}
            />
        );
    };

    // Setting initial chat messages on component mount
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {/* Header section displaying the user's name */}
            <View style={styles.header}>
                <Text style={styles.headerText}>{name}</Text>
            </View>
            {/* GiftedChat component for rendering the chat interface */}
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
            />
            {/* KeyboardAvoidingView to handle keyboard behavior on different platforms */}
            {Platform.OS === "android" ? (
                <KeyboardAvoidingView behavior="height" />
            ) : null}
            {Platform.OS === "ios" ? (
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
