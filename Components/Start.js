import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const image = require('../assets/Background Image.png'); //background image source
    const [selectedColor, setSelectedColor] = useState('#8A95A5');

    const handleEnterChatRoom = () => {
        // Navigate to the chat screen with the entered name and selected color
        navigation.navigate('Chat', { name, backgroundColor: selectedColor });
    };

    const handleColorSelection = (color) => {
        setSelectedColor(color);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>Chat App</Text>
                <View style={styles.formContainer}>
                    {/*<Text style={styles.title}>Enter Your Name</Text>*/}
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
                    <TouchableOpacity style={styles.button} onPress={handleEnterChatRoom}>
                        <Text style={styles.buttonText}>Enter Chat Room</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
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
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#757083',
        marginBottom: 20,
        borderRadius: 20,
    },
    input: {
        width: '700',
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
        width: '700',
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
