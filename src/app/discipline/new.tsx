import { BackHeader } from "@/components/BackHeader";
import { DisciplineForm } from "@/components/DisciplineForm";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { DisciplineInput } from "@/data/disciplines";
import { styles } from "@/screens/NewActivity/styles";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewDiscipline() {
    const { addDiscipline } = useDisciplines();

    async function handleSubmit(discipline: DisciplineInput) {
        await addDiscipline(discipline);
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
                <Text style={styles.title}>Nova Disciplina</Text>
                <DisciplineForm submitLabel="Salvar disciplina" onSubmit={handleSubmit} />
            </ScrollView>
        </SafeAreaView>
    );
}
