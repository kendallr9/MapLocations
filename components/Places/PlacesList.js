import { FlatList, StyleSheet, View } from 'react-native';
import PlaceItem from './PlaceItem';

function PlacesList({ places }) {
  function renderPlaceItem(itemData) {
    return <PlaceItem place={itemData.item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlaceItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 110,
  },
});

export default PlacesList;