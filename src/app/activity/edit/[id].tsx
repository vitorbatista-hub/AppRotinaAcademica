import { ActivityForm } from "@/components/ActivityForm";
import { BackHeader } from "@/components/BackHeader";
import { ActivityInput, useActivities } from "@/contexts/ActivitiesContext";
import { styles } from "@/screens/NewActivity/styles";
import { colors } from "@/styles/colors";
import { formatDate, parseIsoDate } from "@/utils/date";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditActivity() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { activities, updateActivity } = useActivities();

    const activity = activities.find((item) => item.id === id);

    async function handleSubmit(values: ActivityInput) {
        await updateActivity(id, values);
        router.back();
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <BackHeader title="Minha Rotina"
                color={colors.primary}
                actionIcon="notifications-outline"
                actionLabel="Notificações"
            />

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustKeyboardInsets
            >
                <Text style={styles.title}>Editar Atividade</Text>

                {activity ? (
                    <ActivityForm submitLabel="Salvar alterações"
                        initialValues={{
                            title: activity.title,
                            discipline: activity.discipline,
                            dueDate: formatDate(parseIsoDate(activity.dueDate)),
                            priority: activity.priority,
                            description: activity.description,
                        }}
                        onSubmit={handleSubmit}
                    />
                ) : (
                    <Text>Atividade não encontrada.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
