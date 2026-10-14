import { Activity } from "@/data/activities";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type UpcomingActivityCardProps = {
    activity: Activity;
    onPress?: () => void;
};

export function UpcomingActivityCard({ activity, onPress }: UpcomingActivityCardProps) {
    const isWarning = activity.tone === "warning";

    return (
        <TouchableOpacity activeOpacity={0.7}
            style={styles.container}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`Ver detalhes de ${activity.title}`}
        >
            <View style={styles.info}>
                <View style={[styles.badge, isWarning && styles.badgeWarning]}>
                    <Text style={[styles.badgeText, isWarning && styles.badgeTextWarning]}>
                        {activity.badge}
                    </Text>
                </View>
                <Text style={styles.title} numberOfLines={1}>{activity.title}</Text>
                <Text style={styles.discipline} numberOfLines={1}>{activity.discipline}</Text>
            </View>

            <Text style={[styles.due, isWarning && styles.dueWarning]}>{activity.dueLabel}</Text>
        </TouchableOpacity>
    );
}
