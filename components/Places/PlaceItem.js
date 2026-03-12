import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';

function formatType(type) {
  switch (type) {
    case 'clinic':
      return 'Clinic';
    case 'hospital':
      return 'Hospital';
    case 'gym':
      return 'Gym';
    case 'urgent-care':
      return 'Urgent Care';
    case 'therapist':
      return 'Therapist';
    default:
      return 'Healthcare Place';
  }
}

function PlaceItem({ place }) {
  const navigation = useNavigation();

  function selectPlaceHandler() {
    navigation.navigate('PlaceDetails', {
      placeId: place.id,
    });
  }

  return (
    <Pressable
      onPress={selectPlaceHandler}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: place.imageUri }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{formatType(place.type)}</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {place.title}
        </Text>

        <Text style={styles.address} numberOfLines={2}>
          {place.address}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.dot} />
          <Text style={styles.footerText}>
            Trusted healthcare location
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#7EB5C0',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  pressed: {
    opacity: 0.96,
    transform: [{ scale: 0.992 }],
  },
  image: {
    width: '100%',
    height: 170,
    backgroundColor: '#EAF3F5',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: Colors.primary50,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: Colors.primary700,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  address: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary400,
    marginRight: 8,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});

export default PlaceItem;