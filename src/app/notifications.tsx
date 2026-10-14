import { AlertCard } from "@/components/AlertCard";
import { BackHeader } from "@/components/BackHeader";
import { useDeadlineAlerts } from "@/hooks/useDeadlineAlerts";
import { styles } from "@/screens/Notifications/styles";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
    const alerts = useDeadlineAlerts();

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <BackHeader title="Minha Rotina"
                color={colors.primary}
                actionIcon="settings-outline"
                actionLabel="Configurações"
                onActionPress={() => router.push("/settings")}
            />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Notificações</Text>
                    <Text style={styles.subtitle}>Atividades e provas atrasadas ou para os próximos dias.</Text>
                </View>

                <View style={styles.list}>
                    {alerts.map((alert) => (
                        <AlertCard key={alert.key}
                            alert={alert}
                            onPress={() => router.push(alert.href)}
                        />
                    ))}

                    {alerts.length === 0 && (
                        <Text style={styles.empty}>Nenhum prazo próximo. Tudo em dia!</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
