import { colors } from "@/styles/colors";
import { DeadlineAlert } from "@/utils/deadlineAlerts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type AlertCardProps = {
    alert: DeadlineAlert;
    onPress?: () => void;
};

export function AlertCard({ alert, onPress }: AlertCardProps) {
    const isLate = alert.days < 0;
    const icon = alert.kind === "exam" ? "school-outline" : "document-text-outline";
    const color = isLate ? colors.red : colors.orange;

    return (
        <TouchableOpacity activeOpacity={0.7}
            style={styles.container}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${alert.message}: ${alert.title}`}
        >
            <View style={[styles.icon, isLate && styles.iconLate]}>
                <Ionicons name={icon} size={20} color={color} />
            </View>

            <View style={styles.info}>
                <Text style={[styles.message, { color }]}>{alert.message}</Text>
                <Text style={styles.title} numberOfLines={1}>{alert.title}</Text>
                <Text style={styles.discipline} numberOfLines={1}>{alert.discipline}</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color={colors.text.muted} />
        </TouchableOpacity>
    );
}
