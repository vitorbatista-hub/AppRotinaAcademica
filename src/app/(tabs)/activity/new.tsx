import { ActivityForm } from "@/components/ActivityForm";
import { BackHeader } from "@/components/BackHeader";
import { ActivityInput, useActivities } from "@/contexts/ActivitiesContext";
import { styles } from "@/screens/NewActivity/styles";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewActivity() {
    const { addActivity } = useActivities();

    async function handleSubmit(activity: ActivityInput) {
        await addActivity(activity);
        router.back();
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <BackHeader title="Minha Rotina"
                color={colors.primary}
                actionIcon="notifications-outline"
                actionLabel="Notificações"
                onActionPress={() => router.push("/notifications")}
            />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustKeyboardInsets
            >
                <Text style={styles.title}>Nova Atividade</Text>
                <ActivityForm submitLabel="Salvar atividade" onSubmit={handleSubmit} />
            </ScrollView>
        </SafeAreaView>
    );
}
