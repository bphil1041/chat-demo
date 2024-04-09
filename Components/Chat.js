import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route }) => {
    // Extracting the user's name and selected background color from the navigation route
    const { name, backgroundColor } = route.params;

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{name}</Text>
            </View>
            {/* Add chat messages component here */}
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
