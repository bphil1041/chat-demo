//import components from React Native
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//import useActionSheet
//do not need to install @expo/react-native-action-sheet because it is already installed with react-native-gifted-chat module
import { useActionSheet } from '@expo/react-native-action-sheet';

//import Location
import * as Location from 'expo-location';
//import ImagePicker
import * as ImagePicker from 'expo-image-picker';

//import functions from Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

//create child component
const CustomActions = ({
    wrapperStyle,
    iconTextStyle,
    onSend,
    storage,
    userID,
}) => {
    //use useActionSheet()
    const actionSheet = useActionSheet();

    //create function to display action menu "ActionSheet" that contains options
    const onActionPress = () => {
        //define an array of strings to display in the ActionSheet
        const options = [
            'Choose From Library',
            'Take Picture',
            'Send Location',
            'Cancel',
        ];
        //determine the position of cancel button of ActionSheet, so that ActionSheet can close the view if the user presses "Cancel"
        const cancelButtonIndex = options.length - 1;

        //use showActionSheetWithOptions() function to initialize and show the ActionSheet
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                    default:
                }
            }
        );
    };

    //create async function to get location data
    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                //call onSend()
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            } else Alert.alert('Error occurred while fetching location');
        } else Alert.alert("Permissions haven't been granted.");
    };

    //create function to combine multiple strings to produce a string that can be used as a unique reference for the image to be uploaded
    const generateReference = (uri) => {
        const timeStamp = new Date().getTime();
        const imageName = uri.split('/')[uri.split('/').length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
    };

    //create async function for uploading and sending image as a message
    const uploadAndSendImage = async (imageURI) => {
        //use generateReference()
        const uniqueRefString = generateReference(imageURI);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        //prepare a new reference for img
        const newUploadRef = ref(storage, uniqueRefString);
        //upload img by using uploadBytes
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            console.log('File has been uploaded successfully');
            const imageURL = await getDownloadURL(snapshot.ref);
            //call onSend()
            onSend({ image: imageURL });
        });
    };

    //create async function to get permission to media library
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    };

    //create async function to get permission to camera
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

//create style
const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingTop: 3,
    },
});

export default CustomActions;