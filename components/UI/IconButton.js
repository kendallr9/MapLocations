import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function IconButton({icon, size, color, onPress}) {
    return (
        <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        //this line is a function for the pressable feature, if button is pressed then APPLY the style pressed
        onPress={onPress}>
            <Ionicons name={icon} size={size} color={color}/>
        </Pressable>
    )

};

const styles = StyleSheet.create({
    button: {
        padding: 9,
        margin: 3,
        //this margin will adjust the Icon in the header
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.6
    }
})

export default IconButton;