import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type BackHeaderProps = {
    title: string;
    color?: string;
    actionIcon: keyof typeof Ionicons.glyphMap;
    actionLabel: string;
    onActionPress?: () => void;
};

export function BackHeader({
    title,
    color = colors.text.primary,
    actionIcon,
    actionLabel,
    onActionPress,
}: BackHeaderProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7}
                style={styles.button}
                onPress={() => router.back()}
                accessibilityRole="button"
                accessibilityLabel="Voltar"
            >
                <Ionicons name="arrow-back" size={22} color={colors.text.primary} />
            </TouchableOpacity>

            <Text style={[styles.title, { color }]} numberOfLines={1}>{title}</Text>

            <TouchableOpacity activeOpacity={0.7}
                style={styles.button}
                onPress={onActionPress}
                accessibilityRole="button"
                accessibilityLabel={actionLabel}
            >
                <Ionicons name={actionIcon} size={22} color={color} />
            </TouchableOpacity>
        </View>
    );
}
