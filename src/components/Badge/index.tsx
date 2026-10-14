import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";
import { styles } from "./styles";

type BadgeProps = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    backgroundColor: string;
};

export function Badge({ label, icon, color, backgroundColor }: BadgeProps) {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Ionicons name={icon} size={13} color={color} />
            <Text style={[styles.text, { color }]}>{label}</Text>
        </View>
    );
}
