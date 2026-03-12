import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import PlacesList from '../components/Places/PlacesList';
import FloatingActionButton from '../components/UI/FloatingActionButton';
import { fetchPlaces } from '../util/database';
import { Colors } from '../constants/colors';

function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    async function loadPlaces() {
      setIsLoading(true);
      try {
        const places = await fetchPlaces();
        setLoadedPlaces(places);
      } catch (error) {
        console.log('Error loading places:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  let content = (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyCard}>
        <Text style={styles.emptyIcon}>✚</Text>
        <Text style={styles.emptyTitle}>No healthcare places saved yet</Text>
        <Text style={styles.emptyText}>
          Add a clinic, hospital, gym, urgent care center, or therapist office to begin building your healthcare location directory.
        </Text>
      </View>
    </View>
  );

  if (isLoading) {
    content = (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary500} />
        <Text style={styles.loadingText}>Loading your saved places...</Text>
      </View>
    );
  }

  if (!isLoading && loadedPlaces.length > 0) {
    content = <PlacesList places={loadedPlaces} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Healthcare Network</Text>
        <Text style={styles.heroTitle}>Professional Care Locations</Text>
        <Text style={styles.heroSubtitle}>
          Save and organize clinics, hospitals, gyms, urgent care centers, and therapist offices.
        </Text>
      </View>

        <View style={styles.listContainer}>{content}</View>

        <FloatingActionButton
          icon="add"
          onPress={() => navigation.navigate('AddPlace')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heroEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary600,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
  },
  listContainer: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    paddingVertical: 30,
    paddingHorizontal: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyIcon: {
    fontSize: 32,
    color: Colors.primary600,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    lineHeight: 22,
    fontSize: 14,
  },
});

export default AllPlaces;