import { useEffect, useState } from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import { Colors } from '../constants/colors';
import { fetchPlacesDetails } from '../util/database';

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  const selectedPlaceId = route.params.placeId;

  function showOnMapHandler() {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  useEffect(() => {
    async function loadPlaceData() {
      try {
        const place = await fetchPlacesDetails(selectedPlaceId);
        setFetchedPlace(place);

        navigation.setOptions({
          title: place.title,
        });
      } catch (error) {
        console.log('Error loading place details:', error);
      }
    }

    loadPlaceData();
  }, [selectedPlaceId, navigation]);

  if (!fetchedPlace) {
    return (
      <SafeAreaView style={styles.fallback}>
        <ActivityIndicator size="large" color={Colors.primary500} />
        <Text style={styles.loadingText}>Loading place details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
        </View>

        <View style={styles.contentWrap}>
          <View style={styles.titleCard}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>
                {fetchedPlace.type ? fetchedPlace.type : 'healthcare'}
            </Text>
            </View>
            <Text style={styles.title}>{fetchedPlace.title}</Text>
            <Text style={styles.subtitle}>Professional healthcare location</Text>
          </View>

          <View style={styles.locationCard}>
            <Text style={styles.sectionLabel}>Address</Text>
            <Text style={styles.address}>{fetchedPlace.address}</Text>

            <View style={styles.buttonWrap}>
              <OutlinedButton icon="map" onPress={showOnMapHandler}>
                View on Map
              </OutlinedButton>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Why this feels premium</Text>
            <Text style={styles.infoText}>
              A full-image hero, elevated content cards, and a clearer hierarchy
              make this saved place feel like a polished product experience
              rather than just raw stored data.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f7fb',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  screen: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  imageWrap: {
    width: '100%',
    height: 320,
    backgroundColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentWrap: {
    marginTop: -28,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  titleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary800,
    marginBottom: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary50,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },
  typeBadgeText: {
    color: Colors.primary700,
    fontWeight: '700',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  locationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary500,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  address: {
    color: Colors.primary800,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonWrap: {
    marginTop: 18,
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary800,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6b7280',
  },
});

export default PlaceDetails;