import { Exam } from "@/data/exams";
import { daysUntil, parseIsoDate } from "@/utils/date";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type ExamCardProps = {
    exam: Exam;
    onPress?: () => void;
};

// Quanto falta para a prova; até 3 dias o aviso fica em vermelho.
const WARNING_DAYS = 3;

function getCountdown(days: number) {
    if (days < 0) {
        return "Realizada";
    }
    if (days === 0) {
        return "Hoje";
    }
    return days === 1 ? "Amanhã" : `Em ${days} dias`;
}

export function ExamCard({ exam, onPress }: ExamCardProps) {
    const days = daysUntil(parseIsoDate(exam.date));
    const isPast = days < 0;
    const isWarning = !isPast && days <= WARNING_DAYS;

    return (
        <TouchableOpacity activeOpacity={0.7}
            style={[styles.container, { borderLeftColor: exam.color }, isPast && styles.containerPast]}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${exam.title}, ${exam.discipline}, ${exam.dateLabel}`}
        >
            <View style={styles.icon}>
                <Ionicons name={exam.icon} size={20} color={exam.color} />
            </View>

            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{exam.title}</Text>
                <Text style={styles.discipline} numberOfLines={1}>{exam.discipline}</Text>
                {!!exam.notes && <Text style={styles.notes} numberOfLines={2}>{exam.notes}</Text>}
            </View>

            <View style={styles.when}>
                <View style={[styles.badge, isWarning && styles.badgeWarning]}>
                    <Text style={[styles.badgeText, isWarning && styles.badgeTextWarning]}>
                        {getCountdown(days)}
                    </Text>
                </View>
                <Text style={styles.date}>{exam.dateLabel}</Text>
            </View>
        </TouchableOpacity>
    );
}
