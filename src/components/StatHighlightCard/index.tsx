import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";

type StatHighlightCardProps = TouchableOpacityProps & {
    total: number;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
};

export function StatHighlightCard({ total, label, icon, ...rest }: StatHighlightCardProps) {
    return (
        <TouchableOpacity activeOpacity={0.7}
            style={styles.container}
            accessibilityRole="button"
            accessibilityLabel={`${label}: ${total}`}
            {...rest}
        >
            <View style={styles.accent} />

            <View style={styles.icon}>
                <Ionicons name={icon} size={24} color={colors.text.light} />
            </View>

            <View style={styles.info}>
                <Text style={styles.label} numberOfLines={1}>{label}</Text>
                <Text style={styles.total}>{total}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
        </TouchableOpacity>
    );
}
