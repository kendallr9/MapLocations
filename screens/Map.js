import  * as React from 'react';
import { useState, useLayoutEffect, useCallback } from 'react';
import {StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import IconButton from '../components/UI/IconButton';


function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,

};

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

 
//  const initalLocation = route.params ? {
//     lat: route.params.initalLat,
//     lng: route.params.initalLng,

// } : null ;

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    console.log(event)
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  // function savePickedLocationHandler() { - to prevent infinite loops, convert this into a constant with an arrow function
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location has been picked!',
        'You have to pick a location (by tapping on the map) first!'
      );
      return;
    }
    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]); //this is the second argument of usecallback and this is a dependecy array.//

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
        icon="save"
        size={24}
        color={tintColor}
        onPress={savePickedLocationHandler}/>
      )

    });
  }, [navigation, savePickedLocationHandler, initialLocation]);
    console.log(region)
    return (

        <View style={styles.container}>
        <MapView 
        style={styles.map}
         initialRegion={region}
         onPress={selectLocationHandler}>

           {selectedLocation && (<Marker 
           title="Picked Location"
           coordinate={{
             latitude: selectedLocation.lat,
             longitude: selectedLocation.lng,
          }}/> )}
         </MapView>
        </View>
        
    );
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      mapType: "standard",
      zoomEnabled: true,
      scrollEnabled: true,
      showsScale: true
    },
  });

export default Map;