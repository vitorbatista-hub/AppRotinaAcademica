import { View, Text } from "react-native";
import {Feather, MaterialCommunityIcons} from "@expo/vector-icons"
import { colors } from "@/styles/colors"
import { styles } from "./styles"
import { ReactNode } from "react";

type SummaryCardProps = {
    total: number;
    title: string;
    subtitle: string;
    icon: ReactNode;
    textColor: string;
};

export function SummaryCard({ total, title, subtitle, icon, textColor }: SummaryCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.row}> 
                {icon}
                <Text style={[styles.textRow, {
                    color: textColor
                }]}>{total}</Text>
            </View>
            
            <View style={styles.content}> 
                <Text style={styles.titleContent}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    )
}