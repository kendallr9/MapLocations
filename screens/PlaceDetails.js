import { useEffect, useState } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlacesDetails } from "../util/database";

function PlaceDetails({route, navigation}){
    const [fetchedPlace, setFetchedPlace] = useState();

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng,
        });
    }

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        async function loadPlaceData() {
           const place = await fetchPlacesDetails(selectedPlaceId);
           setFetchedPlace(place);
           navigation.setOptions({
               title: place.title,
           });
        }
        // use selectedPlaceId  to fetch data for a single place
        loadPlaceData();
    }, [selectedPlaceId]);

    if (!fetchedPlace) {
        return(
            <View style={styles.fallback}>
                <Text>Loading place data... </Text>
            </View>
        );
    }
    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: fetchedPlace.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchedPlace.address}</Text>
                </View>
                <OutlinedButton icon="map" onPress={showOnMapHandler}>
                    View on Map
                </OutlinedButton>
            </View>
        </ScrollView>
    )
}

 const styles = StyleSheet.create({
     fallback: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
     },
     screen: {
         alignItems: 'center'
     },
     image: {
         height: '33%',
         minHeight: 300,
         width: '100%'
     },
     locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
     },
     addressContainer: {
         padding: 20
     },
     address: {
        color: Colors.primary800 ,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
     }
 })
export default PlaceDetails;