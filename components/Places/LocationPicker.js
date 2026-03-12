import { useState, useEffect } from 'react';
import { Alert, View, StyleSheet, Image, Text } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
  LocationAccuracy,
} from 'expo-location';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import { getAddress, getMapPreview } from '../../util/location';

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (
      isFocused &&
      route.params &&
      route.params.pickedLat &&
      route.params.pickedLng
    ) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (!pickedLocation) return;

      try {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );

        onPickLocation({
          ...pickedLocation,
          address: address,
        });
      } catch (error) {
        console.log('Reverse geocoding failed:', error);

        onPickLocation({
          ...pickedLocation,
          address: 'Address unavailable',
        });
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (!locationPermissionInformation) {
      Alert.alert('Permission error', 'Location permission is not ready yet.');
      return false;
    }

    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location usage to use this app.'
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    try {
      const hasPermission = await verifyPermissions();

      if (!hasPermission) {
        return;
      }

      const location = await getCurrentPositionAsync({
        accuracy: LocationAccuracy.High,
      });

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      console.log('Locate User failed:', error);
      Alert.alert(
        'Could not locate user',
        'Please check simulator/device location settings or use "Pick On Map".'
      );
    }
  }

  function clickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No Location Picked Yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>

      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>

        <OutlinedButton icon="map" onPress={clickOnMapHandler}>
          Pick On Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary50,
    borderRadius: 6,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default LocationPicker;