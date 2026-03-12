import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    Pressable,
    Alert,
  } from 'react-native';
  import { useCallback, useState } from 'react';
  
  import { Colors } from '../../constants/colors';
  import ImagePicker from './ImagePicker';
  import LocationPicker from './LocationPicker';
  import Button from '../UI/Button';
  import { Place } from '../../models/place';
  
  const PLACE_TYPES = [
    { label: 'Clinic', value: 'clinic' },
    { label: 'Hospital', value: 'hospital' },
    { label: 'Gym', value: 'gym' },
    { label: 'Urgent Care', value: 'urgent-care' },
    { label: 'Therapist', value: 'therapist' },
  ];
  
  function TypeSelector({ value, onChange }) {
    return (
      <View style={styles.typeWrapper}>
        <Text style={styles.typeLabel}>Place Type</Text>
        <View style={styles.row}>
          {PLACE_TYPES.map((item) => {
            const active = value === item.value;
  
            return (
              <Pressable
                key={item.value}
                onPress={() => onChange(item.value)}
                style={[styles.chip, active && styles.activeChip]}
              >
                <Text style={[styles.chipText, active && styles.activeChipText]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }
  
  function PlaceForm({ onCreatePlace }) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [takenImage, setTakenImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();
    const [selectedType, setSelectedType] = useState('clinic');
  
    function changeTitleHandler(enteredText) {
      setEnteredTitle(enteredText);
    }
  
    function takeImageHandler(imageUri) {
      setTakenImage(imageUri);
    }
  
    const pickLocationHandler = useCallback((location) => {
      setPickedLocation(location);
    }, []);
  
    function savePlaceHandler() {
      if (!enteredTitle.trim()) {
        Alert.alert('Missing title', 'Please enter a title for this place.');
        return;
      }
  
      if (!takenImage) {
        Alert.alert('Missing image', 'Please add an image for this place.');
        return;
      }
  
      if (!pickedLocation) {
        Alert.alert('Missing location', 'Please pick a location for this place.');
        return;
      }
  
      const placeData = new Place(
        enteredTitle,
        takenImage,
        pickedLocation.address,
        pickedLocation
      );
  
      // attach healthcare type
      placeData.type = selectedType;
  
      onCreatePlace(placeData);
    }
  
    return (
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={changeTitleHandler}
            value={enteredTitle}
            placeholder="Enter place name"
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
  
        <TypeSelector value={selectedType} onChange={setSelectedType} />
  
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
  
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    form: {
      flex: 1,
      padding: 12,
    },
    label: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 8,
      color: Colors.textPrimary,
    },
    input: {
      marginVertical: 9,
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Colors.border,
      backgroundColor: Colors.card,
      color: Colors.textPrimary,
    },
    typeWrapper: {
      marginVertical: 12,
    },
    typeLabel: {
      fontSize: 14,
      fontWeight: '700',
      color: Colors.textPrimary,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 999,
      backgroundColor: Colors.primary50,
      borderWidth: 1,
      borderColor: Colors.border,
      marginRight: 8,
      marginBottom: 8,
    },
    activeChip: {
      backgroundColor: Colors.primary500,
      borderColor: Colors.primary500,
    },
    chipText: {
      color: Colors.primary700,
      fontWeight: '600',
      fontSize: 13,
    },
    activeChipText: {
      color: '#fff',
    },
  });
  
  export default PlaceForm;