import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function Button({onPress, children}) {
    return (
        <Pressable 
        style={({pressed}) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 9,
        margin: 3,
        backgroundColor: Colors.primary500,
        elevation: 3,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 3,
        borderRadius: 21,
    },
    pressed: {
        opacity: 0.6,
    },
    text: {
        textAlign: "center",
        fontSize: 15,
        color: Colors.primary50
    }

});
export default Button;