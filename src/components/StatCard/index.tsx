import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";
import { styles } from "./styles";

type StatCardProps = {
    total: number;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    iconBackground: string;
    totalColor?: string;
    accentColor?: string;
};

export function StatCard({
    total,
    label,
    icon,
    iconColor,
    iconBackground,
    totalColor = colors.text.primary,
    accentColor,
}: StatCardProps) {
    return (
        <View style={styles.container}>
            {accentColor && <View style={[styles.accent, { backgroundColor: accentColor }]} />}

            <View style={[styles.icon, { backgroundColor: iconBackground }]}>
                <Ionicons name={icon} size={18} color={iconColor} />
            </View>

            <View style={styles.info}>
                <Text style={[styles.total, { color: totalColor }]}>{total}</Text>
                <Text style={styles.label}>{label}</Text>
            </View>
        </View>
    );
}
