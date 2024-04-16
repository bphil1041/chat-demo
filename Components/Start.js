import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const image = require('../assets/Background Image.png'); //background image source
    const [selectedColor, setSelectedColor] = useState('#8A95A5');

    const auth = getAuth();

    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate('Chat', { name: name, backgroundColor: selectedColor, userID: result.user.uid });
                Alert.alert('Signed in successfully');
            }).catch((error) => {
                Alert.alert('Unable to signin, try later');
            });
    };

    const handleEnterChatRoom = () => {
        if (auth.currentUser) {
            navigation.navigate('Chat', { name, backgroundColor: selectedColor, userID: auth.currentUser.uid });
        } else {
            Alert.alert('User not signed in');
        }
    };

    const handleColorSelection = (color) => {
        setSelectedColor(color);
    };

    const handleButtonPress = () => {
        handleEnterChatRoom();
        signInUser();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>Chat App</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Name"
                        onChangeText={setName}
                        value={name}
                    />
                    <Text style={styles.colorSelectionText}>Choose Background Color:</Text>
                    <View style={styles.colorButtonsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.colorButton,
                                { backgroundColor: '#090C08', opacity: selectedColor === '#090C08' ? 1 : 0.4 },
                            ]}
                            onPress={() => handleColorSelection('#090C08')}
                        />
                        <TouchableOpacity
                            style={[
                                styles.colorButton,
                                { backgroundColor: '#474056', opacity: selectedColor === '#474056' ? 1 : 0.4 },
                            ]}
                            onPress={() => handleColorSelection('#474056')}
                        />
                        <TouchableOpacity
                            style={[
                                styles.colorButton,
                                { backgroundColor: '#8A95A5', opacity: selectedColor === '#8A95A5' ? 1 : 0.4 },
                            ]}
                            onPress={() => handleColorSelection('#8A95A5')}
                        />
                        <TouchableOpacity
                            style={[
                                styles.colorButton,
                                { backgroundColor: '#B9C6AE', opacity: selectedColor === '#B9C6AE' ? 1 : 0.4 },
                            ]}
                            onPress={() => handleColorSelection('#B9C6AE')}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                        <Text style={styles.buttonText}>Enter Chat Room</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#8A95A5',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 50,
    },
    text: {
        padding: '15%',
        flex: 1,
        fontSize: 45,
        fontWeight: '600',
        color: 'white',
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 20,
        color: '#757083',
    },
    colorSelectionText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
        marginBottom: 10,
    },
    colorButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    button: {
        width: 300,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#757083',
        borderRadius: 20,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Start;
