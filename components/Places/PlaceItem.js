import { StyleSheet, Pressable, View, Image, Text } from "react-native";
import { Colors } from "../../constants/colors";


function PlaceItem({place, onSelect}) {
    //Above the place prop is provided
    return (
    <Pressable 
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    onPress={onSelect.bind(this, place.id)}>
        <Image style={styles.image} source={{ uri: place.imageUri}}/>
        <View style={styles.info}>
            <Text style={styles.title}>{place.title}</Text>
            <Text style={styles.address}>{place.address}</Text>
        </View>

    </Pressable>
    );
}
const styles= StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 3,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.9
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100,
    },
    info: {
        flex: 2,
        padding: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.grey700
    }, 
    addres: {
        fontSize: 12,
        color: Colors.grey700,
    }
});
export default PlaceItem;