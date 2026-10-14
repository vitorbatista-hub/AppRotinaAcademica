import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";

export function SearchInput(props: TextInputProps) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={18} color={colors.text.secondary} />
            <TextInput style={styles.input}
                placeholderTextColor={colors.text.secondary}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
                {...props}
            />
        </View>
    );
}
