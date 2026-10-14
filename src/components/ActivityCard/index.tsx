import { ActivityDetail, ActivityStatus } from "@/data/activities";
import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type ActivityCardProps = {
    activity: ActivityDetail;
    onDetailsPress?: () => void;
};

type StatusStyle = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    accentColor: string;
    badgeColor: string;
    textColor: string;
};

const STATUS_STYLES: Record<ActivityStatus, StatusStyle> = {
    urgent: {
        label: "Urgente",
        icon: "warning",
        accentColor: colors.red,
        badgeColor: colors.background.error,
        textColor: colors.text.error,
    },
    upcoming: {
        label: "Próxima",
        icon: "time",
        accentColor: colors.orangeDark,
        badgeColor: colors.orange,
        textColor: colors.text.onOrange,
    },
    inProgress: {
        label: "Em andamento",
        icon: "sync",
        accentColor: colors.primary,
        badgeColor: colors.background.blue,
        textColor: colors.primary,
    },
    done: {
        label: "Concluída",
        icon: "checkmark-circle",
        accentColor: colors.green,
        badgeColor: colors.background.green,
        textColor: colors.text.green,
    },
};

export function ActivityCard({ activity, onDetailsPress }: ActivityCardProps) {
    const status = STATUS_STYLES[activity.status];
    const isDone = activity.status === "done";

    return (
        <View style={[styles.container, { borderLeftColor: status.accentColor }, isDone && styles.containerDone]}>
            <View style={styles.header}>
                <View style={[styles.badge, { backgroundColor: status.badgeColor }]}>
                    <Ionicons name={status.icon} size={12} color={status.textColor} />
                    <Text style={[styles.caption, { color: status.textColor }]}>{status.label}</Text>
                </View>
                <Text style={styles.caption}>{activity.dueLabel}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{activity.title}</Text>
                <Text style={styles.description} numberOfLines={3}>{activity.description}</Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.discipline}>
                    <Ionicons name={activity.icon} size={14} color={colors.text.secondary} />
                    <Text style={[styles.caption, styles.disciplineText]} numberOfLines={1}>
                        {activity.discipline}
                    </Text>
                </View>

                {isDone ? (
                    <Text style={[styles.caption, styles.delivered]}>Entregue</Text>
                ) : (
                    <TouchableOpacity activeOpacity={0.7}
                        hitSlop={12}
                        onPress={onDetailsPress}
                        accessibilityRole="button"
                        accessibilityLabel={`Ver detalhes de ${activity.title}`}
                    >
                        <Text style={[styles.caption, styles.link]}>Ver detalhes</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
