import React, { useState, useLayoutEffect, useCallback } from "react";
import { StyleSheet, View, Dimensions, Alert, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params
    ? {
        lat: route.params.initialLat,
        lng: route.params.initialLng,
      }
    : null;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  function selectLocationHandler(event) {
    if (initialLocation) return;

    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ lat: latitude, lng: longitude });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location selected",
        "Tap on the map first to choose a location."
      );
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) return;

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <View style={styles.container}>
      {!initialLocation && (
        <View style={styles.helperCard}>
          <Text style={styles.helperText}>Tap anywhere on the map to pick a place</Text>
        </View>
      )}

      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={selectLocationHandler}
        mapType="standard"
        zoomEnabled
        scrollEnabled
        showsScale
      >
        {selectedLocation && (
          <Marker
            title="Picked Location"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  helperCard: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 12,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  helperText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
});

export default Map;

export default Map;
