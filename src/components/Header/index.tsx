import { useProfile } from "@/contexts/ProfileContext";
import { getAvatarSource } from "@/data/profile";
import { useDeadlineAlerts } from "@/hooks/useDeadlineAlerts";
import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function Header() {
    const { profile } = useProfile();
    // A bolinha aparece enquanto houver prazo atrasado ou próximo.
    const hasNotifications = useDeadlineAlerts().length > 0;

    return (
        <View style={styles.container}>
            <View style={styles.brand}>
                <Image source={getAvatarSource(profile, "small")}
                    style={styles.avatar}
                    accessibilityLabel="Foto de perfil do estudante"
                />
                <Text style={styles.title}>Minha Rotina</Text>
            </View>

            <TouchableOpacity activeOpacity={0.7}
                style={styles.button}
                onPress={() => router.push("/notifications")}
                accessibilityRole="button"
                accessibilityLabel={hasNotifications ? "Notificações, há prazos próximos" : "Notificações"}
            >
                <Ionicons name="notifications-outline" size={22} color={colors.primary} />
                {hasNotifications && <View style={styles.badge} />}
            </TouchableOpacity>
        </View>
    );
}
