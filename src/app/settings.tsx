import { BackHeader } from "@/components/BackHeader";
import { SettingsItem } from "@/components/SettingsItem";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import { styles } from "@/screens/Settings/styles";
import { colors } from "@/styles/colors";
import Constants from "expo-constants";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
    const { openAvatarMenu } = useAvatarPicker();

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <BackHeader title="Minha Rotina"
                color={colors.primary}
                actionIcon="notifications-outline"
                actionLabel="Notificações"
            />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Configurações</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Perfil</Text>

                    <View style={styles.card}>
                        <SettingsItem icon="person-outline"
                            label="Editar perfil"
                            onPress={() => router.push("/profile/edit")}
                        />
                        <View style={styles.divider} />
                        <SettingsItem icon="camera-outline"
                            label="Foto de perfil"
                            onPress={openAvatarMenu}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sobre</Text>

                    <View style={styles.card}>
                        <SettingsItem icon="information-circle-outline"
                            label="Versão do app"
                            value={Constants.expoConfig?.version}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
