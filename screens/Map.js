import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';
import { Colors } from '../constants/colors';

function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, [pulseAnim]);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78825,
    longitude: initialLocation ? initialLocation.lng : -122.4324,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  function selectLocationHandler(event) {
    if (initialLocation) return;

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location selected',
        'Tap on the map first to choose a location.'
      );
      return;
    }

    navigation.navigate('AddPlace', {
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

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 2.4],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.32, 0],
  });

  return (
    <View style={styles.container}>
      {!initialLocation && (
        <View style={styles.helperOverlay}>
          <Text style={styles.helperTitle}>Select a Place</Text>
          <Text style={styles.helperSubtitle}>
            Tap anywhere on the map to drop a marker and preview the selected
            location.
          </Text>
        </View>
      )}

      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={selectLocationHandler}
        mapType="standard"
        zoomEnabled={true}
        scrollEnabled={true}
        showsScale={true}
        showsCompass={true}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.markerWrap}>
              <Animated.View
                style={[
                  styles.pulseRing,
                  {
                    transform: [{ scale: pulseScale }],
                    opacity: pulseOpacity,
                  },
                ]}
              />
              <View style={styles.markerCoreOuter}>
                <View style={styles.markerCoreInner} />
              </View>
            </View>
          </Marker>
        )}
      </MapView>

      {!initialLocation && selectedLocation && (
        <View style={styles.bottomCard}>
          <Text style={styles.bottomTitle}>Location Selected</Text>
          <Text style={styles.bottomText}>
            Latitude {selectedLocation.lat.toFixed(5)} · Longitude{' '}
            {selectedLocation.lng.toFixed(5)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  helperOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 18 : 14,
    left: 16,
    right: 16,
    zIndex: 20,
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#8ABAC5',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  helperTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  helperSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 22,
    left: 16,
    right: 16,
    zIndex: 20,
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#8ABAC5',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  bottomTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  bottomText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  markerWrap: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary300,
  },
  markerCoreOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary400,
  },
  markerCoreInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary600,
  },
});

export default Map;