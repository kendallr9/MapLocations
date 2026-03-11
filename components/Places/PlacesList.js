import { useNavigation } from "@react-navigation/core";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/colors";

import PlaceItem from './PlaceItem'

function PlacesList({places})  {
    const navigation = useNavigation();
    //places is the props for the "Places"

    function selectPlaceHandler(id) {
        navigation.navigate('PlaceDetails', {
            placeId: id
        });
    }

    if (!places || places.length === 0 ) {
        return (
            <View 
            style={styles.fallbackContainer}>
                <Text
                style={styles.fallbackText}>No Places added yet, Start adding places!</Text>
            </View>
        )
    }
    return <FlatList
    style={styles.list} 
    data={places}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
    />

}

const styles = StyleSheet.create({
    list: {
        margin: 3

    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 15,
        color: Colors.primary700
    }
})

export default PlacesList;