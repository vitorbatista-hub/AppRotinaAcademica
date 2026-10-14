import { BackHeader } from "@/components/BackHeader";
import { ExamForm } from "@/components/ExamForm";
import { useDisciplines } from "@/contexts/DisciplinesContext";
import { useExams } from "@/contexts/ExamsContext";
import { ExamInput } from "@/data/exams";
import { styles } from "@/screens/NewActivity/styles";
import { colors } from "@/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewExam() {
    // Vindo da tela de uma disciplina, ela já aparece selecionada.
    const { disciplineId } = useLocalSearchParams<{ disciplineId?: string }>();
    const { disciplines } = useDisciplines();
    const { addExam } = useExams();

    const discipline = disciplines.find((item) => item.id === disciplineId);

    async function handleSubmit(exam: ExamInput) {
        await addExam(exam);
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
                <Text style={styles.title}>Nova Prova</Text>
                <ExamForm submitLabel="Salvar prova"
                    initialValues={{ title: "", discipline: discipline?.name, date: "", notes: "" }}
                    onSubmit={handleSubmit}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
