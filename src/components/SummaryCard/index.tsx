import { ReactNode } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

type SummaryCardProps = {
    total: number;
    title: string;
    subtitle: string;
    icon: ReactNode;
    textColor: string;
    accentColor: string;
    accentOpacity?: number;
};

export function SummaryCard({
    total,
    title,
    subtitle,
    icon,
    textColor,
    accentColor,
    accentOpacity = 0.2,
}: SummaryCardProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.accent, { backgroundColor: accentColor, opacity: accentOpacity }]} />

            <View style={styles.row}>
                {icon}
                <Text style={[styles.textRow, { color: textColor }]}>{total}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.titleContent}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
}
