import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";
import { styles } from "./styles";

type InfoCardProps = {
    label: string;
    value: string;
    icon: keyof typeof Ionicons.glyphMap;
    valueColor?: string;
};

export function InfoCard({ label, value, icon, valueColor = colors.text.primary }: InfoCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name={icon} size={18} color={colors.primary} />
                <Text style={styles.label} numberOfLines={1}>{label}</Text>
            </View>

            <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
        </View>
    );
}
