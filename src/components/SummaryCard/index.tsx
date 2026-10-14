import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type SummaryCardProps = {
    total: number;
    title: string;
    subtitle: string;
    icon: ReactNode;
    textColor: string;
    accentColor: string;
    accentOpacity?: number;
    onPress?: () => void;
};

export function SummaryCard({
    total,
    title,
    subtitle,
    icon,
    textColor,
    accentColor,
    accentOpacity = 0.2,
    onPress,
}: SummaryCardProps) {
    // Sem onPress o card continua só informativo, sem efeito de toque.
    return (
        <TouchableOpacity activeOpacity={0.7}
            style={styles.container}
            onPress={onPress}
            disabled={!onPress}
            accessibilityRole={onPress ? "button" : undefined}
            accessibilityLabel={`${total} ${title}, ${subtitle}`}
        >
            <View style={[styles.accent, { backgroundColor: accentColor, opacity: accentOpacity }]} />

            <View style={styles.row}>
                {icon}
                <Text style={[styles.textRow, { color: textColor }]}>{total}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.titleContent}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    );
}
