import { colors } from "@/styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type HeaderProps = {
    hasNotifications?: boolean;
    onNotificationsPress?: () => void;
};

export function Header({ hasNotifications = false, onNotificationsPress }: HeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.brand}>
                <Image source={require("@/assets/images/avatar.jpg")}
                    style={styles.avatar}
                    accessibilityLabel="Foto de perfil do estudante"
                />
                <Text style={styles.title}>Minha Rotina</Text>
            </View>

            <TouchableOpacity activeOpacity={0.7}
                style={styles.button}
                onPress={onNotificationsPress}
                accessibilityRole="button"
                accessibilityLabel="Notificações"
            >
                <Ionicons name="notifications-outline" size={22} color={colors.primary} />
                {hasNotifications && <View style={styles.badge} />}
            </TouchableOpacity>
        </View>
    );
}
