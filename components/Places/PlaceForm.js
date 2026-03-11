import { View, Text, ScrollView, TextInput, StyleSheet, SafeAreaView } from "react-native";
import {useCallback, useState } from 'react';

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

function PlaceForm({onCreatePlace}) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [takenImage, setTakenImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function takeImageHandler(imageUri) {
        setTakenImage(imageUri)

    }

    const pickLocationHandler = useCallback((location) => { //we created a constant function using useCallBack to prevent rendering loops, this array is empty due no prior set dependencies
        setPickedLocation(location);
    }, []);

    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, takenImage, pickedLocation);
        onCreatePlace(placeData);
        console.log(enteredTitle);
        console.log(takenImage);
        console.log(pickedLocation);

    }
    return (
    <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput 
            style={styles.input}
            onChangeText={changeTitleHandler}
            value={enteredTitle}/>
        </View>
        <ImagePicker onTakeImage={takeImageHandler}/>
        <LocationPicker onPickLocation={pickLocationHandler}/>
        <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 12
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 3,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 9,
        paddingHorizontal: 3,
        paddingVertical: 9,
        fomtSize: 16,
        borderBottomColor: Colors.primary400,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary400,
    },
});

export default PlaceForm;