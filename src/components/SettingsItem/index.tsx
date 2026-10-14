import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type SettingsItemProps = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    // Texto à direita, para itens que só mostram uma informação.
    value?: string;
    color?: string;
    onPress?: () => void;
};

export function SettingsItem({ icon, label, value, color = colors.text.primary, onPress }: SettingsItemProps) {
    return (
        <TouchableOpacity activeOpacity={0.7}
            style={styles.container}
            onPress={onPress}
            disabled={!onPress}
            accessibilityRole={onPress ? "button" : "text"}
            accessibilityLabel={value ? `${label}: ${value}` : label}
        >
            <View style={styles.icon}>
                <Ionicons name={icon} size={20} color={color} />
            </View>

            <Text style={[styles.label, { color }]}>{label}</Text>

            {value && <Text style={styles.value}>{value}</Text>}
            {onPress && <Ionicons name="chevron-forward" size={18} color={colors.text.muted} />}
        </TouchableOpacity>
    );
}
