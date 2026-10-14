import { Discipline } from "@/data/disciplines";
import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type DisciplineCardProps = {
    discipline: Discipline;
    onPress?: () => void;
};

type DetailProps = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
};

function Detail({ icon, label, value }: DetailProps) {
    return (
        <View style={styles.detail}>
            <View style={styles.detailIcon}>
                <Ionicons name={icon} size={16} color={colors.primary} />
            </View>
            <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
            </View>
        </View>
    );
}

function getStatusLabel(pendingCount: number) {
    if (pendingCount === 0) {
        return "Em dia";
    }

    return pendingCount === 1 ? "1 Pendente" : `${pendingCount} Pendentes`;
}

export function DisciplineCard({ discipline, onPress }: DisciplineCardProps) {
    const isUpToDate = discipline.pendingCount === 0;

    return (
        <TouchableOpacity activeOpacity={0.7}
            style={[styles.container, { borderLeftColor: discipline.color }]}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`Ver detalhes de ${discipline.name}`}
        >
            <View style={styles.header}>
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={2}>{discipline.name}</Text>
                    <View style={styles.teacher}>
                        <Ionicons name="person-outline" size={12} color={colors.text.secondary} />
                        <Text style={styles.teacherText} numberOfLines={1}>{discipline.teacher}</Text>
                    </View>
                </View>

                <View style={[styles.badge, isUpToDate && styles.badgeUpToDate]}>
                    <Text style={[styles.badgeText, isUpToDate && styles.badgeTextUpToDate]}>
                        {getStatusLabel(discipline.pendingCount)}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.details}>
                <Detail icon="time-outline" label="Horário" value={discipline.schedule} />
                <Detail icon="business-outline" label="Sala" value={discipline.room} />
            </View>
        </TouchableOpacity>
    );
}
