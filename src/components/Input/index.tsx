import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";

type InputProps = TextInputProps & {
    icon?: keyof typeof Ionicons.glyphMap;
    hasError?: boolean;
};

export function Input({ icon, hasError = false, multiline, ...rest }: InputProps) {
    return (
        <View style={[styles.container, multiline && styles.containerMultiline, hasError && styles.containerError]}>
            <TextInput style={[styles.input, multiline && styles.inputMultiline]}
                placeholderTextColor={colors.text.placeholder}
                multiline={multiline}
                {...rest}
            />
            {icon && <Ionicons name={icon} size={18} color={colors.text.secondary} />}
        </View>
    );
}
