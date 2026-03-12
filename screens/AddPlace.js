import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';
import { insertPlace } from '../util/database';
import { Colors } from '../constants/colors';

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topCard}>
          <Text style={styles.eyebrow}>Healthcare Directory</Text>
          <Text style={styles.title}>Add a healthcare place</Text>
          <Text style={styles.subtitle}>
            Save trusted professional locations like clinics, hospitals, gyms,
            urgent care centers, and therapists.
          </Text>
        </View>

        <View style={styles.formCard}>
          <PlaceForm onCreatePlace={createPlaceHandler} />
        </View>
      </ScrollView>
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
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 28,
  },
  topCard: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary600,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
  },
  formCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});

export default AddPlace;