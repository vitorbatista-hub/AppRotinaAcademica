import { Discipline } from "@/data/disciplines";
import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";
import { styles } from "./styles";

type DisciplineInfoCardProps = {
    discipline: Discipline;
};

type InfoRowProps = {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
};

function InfoRow({ icon, text }: InfoRowProps) {
    return (
        <View style={styles.row}>
            <Ionicons name={icon} size={16} color={colors.text.secondary} />
            <Text style={styles.rowText} numberOfLines={1}>{text}</Text>
        </View>
    );
}

export function DisciplineInfoCard({ discipline }: DisciplineInfoCardProps) {
    return (
        <View style={[styles.container, { borderLeftColor: discipline.color }]}>
            <View style={styles.header}>
                <Text style={styles.name} numberOfLines={2}>{discipline.name}</Text>
                <Ionicons name={discipline.icon} size={20} color={colors.text.secondary} />
            </View>

            <View style={styles.rows}>
                <InfoRow icon="person-outline" text={discipline.teacher} />
                <InfoRow icon="time-outline" text={discipline.schedule} />
                <InfoRow icon="business-outline" text={discipline.room} />
            </View>
        </View>
    );
}
